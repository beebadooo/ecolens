const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC_FBgNwwbvSbzbo6EsErky6OKIHkGoJak");

async function listModels() {
  const modelResponse = await genAI.getGenerativeModelFactory().listModels();
  console.log("Available models:");
  modelResponse.models.forEach(model => {
      if (model.supportedGenerationMethods.includes("generateContent")) {
          console.log(model.name);
      }
  });
}
listModels();