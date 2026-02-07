'use client'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
    AuthError,
} from 'firebase/auth'
import { auth } from './firebase'

export async function signUp(email: string, password: string, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update user profile with display name
        await updateProfile(user, {
            displayName: displayName,
        })

        return user
    } catch (error: any) {
        throw handleAuthError(error)
    }
}

export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error: any) {
        throw handleAuthError(error)
    }
}

export async function signOut() {
    try {
        await firebaseSignOut(auth)
    } catch (error: any) {
        throw handleAuthError(error)
    }
}

function handleAuthError(error: AuthError): Error {
    let message = 'An authentication error occurred'

    switch (error.code) {
        case 'auth/user-not-found':
            message = 'No account found with this email address'
            break
        case 'auth/wrong-password':
            message = 'Incorrect password'
            break
        case 'auth/invalid-email':
            message = 'Invalid email address'
            break
        case 'auth/user-disabled':
            message = 'This account has been disabled'
            break
        case 'auth/email-already-in-use':
            message = 'Email address is already in use'
            break
        case 'auth/weak-password':
            message = 'Password is too weak. Please use at least 6 characters'
            break
        case 'auth/operation-not-allowed':
            message = 'Email/password accounts are not enabled'
            break
        case 'auth/invalid-credential':
            message = 'Invalid email or password'
            break
        default:
            message = error.message || message
    }

    return new Error(message)
}