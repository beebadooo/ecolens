"use server";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const HUGGINGFACE_MODEL_ID = process.env.HUGGINGFACE_MODEL_ID;
const HUGGINGFACE_API_URL = `https://router.huggingface.co/hf-inference/models/${HUGGINGFACE_MODEL_ID}`;

type SpeciesResult = {
    species_name: string;
    scientific_name: string;
    type: string;
    description: string;
    habitat: string;
    conservation_status: string;
    population_trend: string;
    estimated_population: string;
    threats: string[];
    confidence: number;
};

export async function identifySpeciesWithHuggingFace(
    imageBuffer: Buffer,
    mimeType: string
): Promise<SpeciesResult> {
    if (!HUGGINGFACE_API_KEY) {
        throw new Error(
            "HUGGINGFACE_API_KEY is not set in the environment"
        );
    }

    if (!HUGGINGFACE_MODEL_ID) {
        throw new Error(
            "HUGGINGFACE_MODEL_ID is not set. Please set it in your .env.local to a supported image-classification model (e.g. facebook/deit-base-distilled-patch16-224)."
        );
    }

    // Retry transient server errors with exponential backoff
    const maxAttempts = 3;
    let attempt = 0;
    let lastErr: any = null;
    let data: any = null;

    while (attempt < maxAttempts) {
        try {
            const response = await fetch(HUGGINGFACE_API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    "Content-Type": mimeType || "application/octet-stream",
                },
                // Send raw binary image data as a Uint8Array to satisfy the fetch BodyInit type.
                body: new Uint8Array(imageBuffer),
            });

            if (!response.ok) {
                const errorText = await response.text();
                // Sanitize and truncate long HTML/text error bodies to avoid leaking raw pages
                const sanitized = sanitizeErrorText(errorText);
                console.error("Hugging Face API error:", response.status, sanitized);

                // Special-case deprecated models so the error is actionable.
                if (
                    response.status === 410 &&
                    errorText.includes("deprecated and no longer supported by provider hf-inference")
                ) {
                    throw new Error(
                        "The requested Hugging Face model is deprecated for provider hf-inference. Please set HUGGINGFACE_MODEL_ID in your .env.local to a currently supported image-classification model (for example: facebook/deit-base-distilled-patch16-224)."
                    );
                }

                // Retry on 5xx gateway/server errors
                if (response.status >= 500 && response.status < 600 && attempt < maxAttempts - 1) {
                    lastErr = new Error(`Hugging Face API transient error: ${response.status} ${response.statusText} - ${sanitized}`);
                    attempt++;
                    // exponential backoff
                    await wait((2 ** attempt) * 250);
                    continue;
                }

                // Try to parse JSON error body if available
                try {
                    const parsed = JSON.parse(errorText);
                    if (parsed.error) {
                        throw new Error(`Hugging Face API error: ${parsed.error}`);
                    }
                } catch {
                    // Fallback to sanitized message
                    throw new Error(`Hugging Face API error: ${response.status} ${response.statusText} - ${sanitized}`);
                }
            }

            data = await response.json();
            break;
        } catch (err: any) {
            lastErr = err;
            // If we've exhausted attempts, rethrow
            if (attempt >= maxAttempts - 1) {
                throw lastErr;
            }
            attempt++;
            await wait((2 ** attempt) * 250);
            continue;
        }
    }

    let topPrediction: any = null;

    if (Array.isArray(data) && data.length > 0 && data[0].label) {
        topPrediction = data[0];
    } else if (
        Array.isArray(data) &&
        Array.isArray(data[0]) &&
        data[0].length > 0 &&
        data[0][0].label
    ) {
        // Some models return nested arrays
        topPrediction = data[0][0];
    }

    const rawLabel = topPrediction?.label || "Unknown";
    const label = cleanHuggingFaceLabel(rawLabel);
    const score = typeof topPrediction?.score === "number" ? topPrediction.score : 0;

    const confidence = Math.max(0, Math.min(100, Math.round(score * 100)));

    // Enrich the basic label using Wikipedia.
    const wikipediaInfo = await enrichSpeciesFromWikipedia(label);

    // Infer a simple population summary from conservation status.
    const populationSummary =
        inferPopulationFromStatus(wikipediaInfo.conservationStatus);

    // If Wikipedia didn't give us explicit threats, derive some generic ones
    // based on habitat and conservation status so the UI isn't empty.
    const threats =
        wikipediaInfo.threats && wikipediaInfo.threats.length > 0
            ? wikipediaInfo.threats
            : inferGenericThreats(
                  wikipediaInfo.habitat,
                  wikipediaInfo.conservationStatus
              );

    const result: SpeciesResult = {
        species_name: wikipediaInfo.commonName || label,
        scientific_name: wikipediaInfo.scientificName || "Unknown",
        type: "Unknown",
        description:
            wikipediaInfo.description ||
            (topPrediction
                ? `Top prediction from Hugging Face model "${HUGGINGFACE_MODEL_ID}": ${label}.`
                : "Unable to identify from image"),
        habitat: wikipediaInfo.habitat || "Unknown",
        conservation_status: wikipediaInfo.conservationStatus || "Unknown",
        population_trend: populationSummary || "Unknown",
        // Prefer species-specific population estimate; fall back to trend-based summary.
        estimated_population:
            wikipediaInfo.populationEstimate || populationSummary || "Unknown",
        threats,
        confidence,
    };

    return result;
}

type WikipediaEnrichment = {
    commonName: string;
    scientificName: string;
    description: string;
    habitat: string;
    conservationStatus: string;
    threats: string[];
    populationEstimate: string;
};

async function enrichSpeciesFromWikipedia(
    speciesName: string
): Promise<WikipediaEnrichment> {
    const fallback: WikipediaEnrichment = {
        commonName: "",
        scientificName: "",
        description: "",
        habitat: "",
        conservationStatus: "",
        threats: [],
        populationEstimate: "",
    };

    if (!speciesName || speciesName === "Unknown") {
        return fallback;
    }

    try {
        // First, search Wikipedia to find the best page title for this label.
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
            speciesName
        )}&format=json`;

        const searchRes = await fetch(searchUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
            },
        });

        let chosenTitle = speciesName;

        if (searchRes.ok) {
            const searchData: any = await searchRes.json();
            const firstHit = searchData?.query?.search?.[0];
            if (firstHit?.title) {
                chosenTitle = firstHit.title;
            }
        }

        const summaryTitle = encodeURIComponent(chosenTitle);
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${summaryTitle}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
            },
        });

        if (!res.ok) {
            console.error("Wikipedia API error:", res.status, res.statusText);
            return fallback;
        }

        let data: any = await res.json();

        // If we hit a disambiguation page (e.g. "Loggerhead"), try again with
        // more specific animal-focused queries to get a real species page.
        if (data?.type === "disambiguation") {
            const altTerms = [
                `${speciesName} sea turtle`,
                `${speciesName} animal`,
                `${speciesName} species`,
            ];

            for (const term of altTerms) {
                try {
                    const altSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
                        term
                    )}&format=json`;

                    const altSearchRes = await fetch(altSearchUrl, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "User-Agent":
                                "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
                        },
                    });

                    if (!altSearchRes.ok) continue;

                    const altSearchData: any = await altSearchRes.json();
                    const altHit = altSearchData?.query?.search?.[0];
                    if (!altHit?.title) continue;

                    const altTitle = encodeURIComponent(altHit.title);
                    const altSummaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${altTitle}`;

                    const altRes = await fetch(altSummaryUrl, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "User-Agent":
                                "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
                        },
                    });

                    if (!altRes.ok) continue;

                    const altData: any = await altRes.json();
                    if (
                        altData?.type !== "disambiguation" &&
                        typeof altData?.extract === "string" &&
                        altData.extract.trim().length > 0
                    ) {
                        data = altData;
                        break;
                    }
                } catch {
                    // Ignore alt-term errors and fall back to the best we have.
                }
            }
        }

        const rawText: string =
            typeof data?.extract === "string" && data.extract.trim().length > 0
                ? data.extract
                : "";

        if (!rawText) {
            return fallback;
        }

        const description = rawText;
        const habitat = extractHabitat(rawText);
        let conservationStatus = extractConservationStatus(rawText);
        const threats = extractThreats(rawText);
        const commonName: string =
            typeof data?.title === "string" ? data.title : "";
        const scientificName = extractScientificName(rawText);

        // If the summary text didn't include an explicit conservation status,
        // try to fetch it from Wikidata via the wikibase_item id.
        if (!conservationStatus && typeof data?.wikibase_item === "string") {
            const fromWikidata = await getConservationStatusFromWikidata(
                data.wikibase_item
            );
            if (fromWikidata) {
                conservationStatus = fromWikidata;
            }
        }

        // Derive a rough population *category* string from conservation status.
        const populationEstimate = inferApproxPopulationFromStatus(
            conservationStatus
        );

        return {
            commonName,
            scientificName,
            description,
            habitat,
            conservationStatus,
            threats,
            populationEstimate,
        };
    } catch (err) {
        console.error("Error enriching species from Wikipedia:", err);
        return fallback;
    }
}

function extractHabitat(text: string): string {
    if (!text) return "";

    const sentences = text.split(/(?<=[.!?])\s+/);

    // First, look for explicit habitat-style phrases.
    const primaryMatch =
        sentences.find((s) => /habitat/i.test(s)) ||
        sentences.find((s) => /found in/i.test(s)) ||
        sentences.find((s) => /native to/i.test(s)) ||
        sentences.find((s) => /occurs in/i.test(s)) ||
        sentences.find((s) => /distributed in/i.test(s)) ||
        sentences.find((s) => /lives in/i.test(s)) ||
        sentences.find((s) => /inhabits/i.test(s));

    if (primaryMatch) return primaryMatch.trim();

    // Fallback: pick the first sentence mentioning a common environment keyword.
    const habitatEnvKeywords = [
        /ocean/i,
        /sea/i,
        /marine/i,
        /coastal/i,
        /river/i,
        /lake/i,
        /freshwater/i,
        /wetland/i,
        /forest/i,
        /grassland/i,
        /savanna/i,
        /desert/i,
        /tropical/i,
        /temperate/i,
        /montane/i,
    ];

    const envMatch = sentences.find((s) =>
        habitatEnvKeywords.some((re) => re.test(s))
    );

    return envMatch ? envMatch.trim() : "";
}

function extractConservationStatus(text: string): string {
    if (!text) return "";

    // Look for explicit phrases first.
    const patterns: { status: string; re: RegExp }[] = [
        { status: "Critically Endangered", re: /\bcritically endangered\b/i },
        { status: "Endangered", re: /\bendangered\b/i },
        { status: "Vulnerable", re: /\bvulnerable\b/i },
        { status: "Near Threatened", re: /\bnear threatened\b/i },
        { status: "Least Concern", re: /\bleast concern\b/i },
        { status: "Data Deficient", re: /\bdata deficient\b/i },
    ];

    for (const { status, re } of patterns) {
        if (re.test(text)) return status;
    }

    // IUCN abbreviations like "VU on the IUCN Red List"
    const iucnMatch = text.match(
        /(CR|EN|VU|NT|LC)\s+on the IUCN Red List/i
    );
    if (iucnMatch) {
        const map: Record<string, string> = {
            CR: "Critically Endangered",
            EN: "Endangered",
            VU: "Vulnerable",
            NT: "Near Threatened",
            LC: "Least Concern",
        };
        const code = iucnMatch[1].toUpperCase();
        if (map[code]) return map[code];
    }

    return "";
}

function extractThreats(text: string): string[] {
    const lower = text.toLowerCase();
    const threats: string[] = [];

    if (lower.includes("habitat loss")) threats.push("Habitat loss");
    if (lower.includes("poaching")) threats.push("Poaching");
    if (lower.includes("climate change")) threats.push("Climate change");
    if (lower.includes("deforestation")) threats.push("Deforestation");
    if (lower.includes("illegal hunting")) threats.push("Illegal hunting");

    return Array.from(new Set(threats));
}

function inferPopulationFromStatus(status: string | undefined): string {
    if (!status) return "";
    const s = status.toLowerCase();

    if (s.includes("critically endangered")) return "Severely reduced and rapidly decreasing";
    if (s.includes("endangered")) return "Very small and decreasing";
    if (s.includes("vulnerable")) return "Decreasing";
    if (s.includes("near threatened")) return "Slightly declining or at risk of decline";
    if (s.includes("least concern")) return "Stable or increasing";

    return "";
}

function inferApproxPopulationFromStatus(
    status: string | undefined
): string {
    if (!status) return "";
    const s = status.toLowerCase();

    if (s.includes("critically endangered"))
        return "Likely fewer than 10,000 mature individuals";
    if (s.includes("endangered"))
        return "Likely fewer than 25,000 mature individuals";
    if (s.includes("vulnerable"))
        return "On the order of tens of thousands of individuals";
    if (s.includes("near threatened"))
        return "On the order of tens to hundreds of thousands of individuals";
    if (s.includes("least concern"))
        return "Likely more than 100,000 individuals";

    return "";
}

function inferGenericThreats(
    habitat: string | undefined,
    status: string | undefined
): string[] {
    const threats = new Set<string>();
    const h = (habitat || "").toLowerCase();
    const s = (status || "").toLowerCase();

    // If species is at any level of risk, assume broad pressures.
    if (
        s.includes("critically endangered") ||
        s.includes("endangered") ||
        s.includes("vulnerable") ||
        s.includes("near threatened")
    ) {
        threats.add("Habitat loss and degradation");
        threats.add("Human disturbance and development");
    }

    // Marine / coastal hints
    if (
        /sea|ocean|marine|coastal|beach|shore/i.test(h) ||
        /sea turtle|marine turtle/i.test(habitat || "")
    ) {
        threats.add("Bycatch in fishing gear");
        threats.add("Pollution and marine debris");
        threats.add("Climate change and rising sea levels");
    }

    // Freshwater / riverine
    if (/river|lake|freshwater|wetland/i.test(h)) {
        threats.add("Water pollution");
        threats.add("Habitat fragmentation and dams");
    }

    // Terrestrial forests / grasslands
    if (/forest|grassland|savanna|woodland/i.test(h)) {
        threats.add("Deforestation and land conversion");
    }

    return Array.from(threats);
}

async function getConservationStatusFromWikidata(
    wikidataId: string
): Promise<string> {
    try {
        const entityUrl = `https://www.wikidata.org/wiki/Special:EntityData/${encodeURIComponent(
            wikidataId
        )}.json`;

        const entityRes = await fetch(entityUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
            },
        });

        if (!entityRes.ok) {
            console.error(
                "Wikidata entity fetch error:",
                entityRes.status,
                entityRes.statusText
            );
            return "";
        }

        const entityData: any = await entityRes.json();
        const entities = entityData?.entities;
        const mainEntity = entities?.[wikidataId];
        const claims = mainEntity?.claims;
        const statusClaim = claims?.P141?.[0]?.mainsnak?.datavalue?.value;
        const statusId: string | undefined = statusClaim?.id;

        if (!statusId) return "";

        const statusUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${encodeURIComponent(
            statusId
        )}&languages=en&format=json`;

        const statusRes = await fetch(statusUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "ecolens-species-id/1.0 (https://en.wikipedia.org/wiki/User:Example)",
            },
        });

        if (!statusRes.ok) {
            console.error(
                "Wikidata status fetch error:",
                statusRes.status,
                statusRes.statusText
            );
            return "";
        }

        const statusData: any = await statusRes.json();
        const statusEntity = statusData?.entities?.[statusId];
        const label: string | undefined = statusEntity?.labels?.en?.value;

        return label || "";
    } catch (err) {
        console.error("Error fetching conservation status from Wikidata:", err);
        return "";
    }
}

function cleanHuggingFaceLabel(label: string): string {
    if (!label) return "Unknown";
    // Many HF models return labels like "loggerhead, loggerhead turtle, Caretta caretta"
    // Keep only the first segment and trim.
    const firstSegment = label.split(",")[0]?.trim();
    return firstSegment || label.trim() || "Unknown";
}

function extractScientificName(text: string): string {
    if (!text) return "";
    // Try to find a binomial like "Caretta caretta" in parentheses in the first sentence.
    const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || text;
    const parenMatch = firstSentence.match(/\(([A-Z][a-z]+ [a-z]+)\)/);
    if (parenMatch && parenMatch[1]) {
        return parenMatch[1];
    }

    // Fallback: look anywhere in the text for a capitalized binomial.
    const binomialMatch = text.match(/([A-Z][a-z]+ [a-z]+)/);
    if (binomialMatch && binomialMatch[1]) {
        return binomialMatch[1];
    }

    return "";
}

function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

function sanitizeErrorText(text: string) {
    if (!text) return '';
    // Strip HTML tags
    const noTags = text.replace(/<[^>]*>/g, '');
    // Collapse whitespace and trim
    const collapsed = noTags.replace(/\s+/g, ' ').trim();
    // Truncate to a reasonable length
    if (collapsed.length > 500) return collapsed.slice(0, 500) + '...';
    return collapsed;
}

