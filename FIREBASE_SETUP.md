# Firebase Integration Setup Guide

## What's Been Implemented

Your EcoLens application now has complete Firebase integration with the following features:

### 1. **User Authentication**
   - Sign up with email and password
   - Sign in with email and password
   - User profiles stored in Firestore
   - Authentication state management via React Context

### 2. **Image Gallery & Storage**
   - Upload photos to Firebase Cloud Storage
   - Store image metadata in Firestore
   - View all uploaded images in user gallery
   - Delete images from both storage and database
   - Protected gallery page (requires login)

## Files Created/Modified

### New Files Created:
- `lib/firebase.ts` - Firebase configuration and initialization
- `lib/auth.ts` - Authentication functions (signUp, signIn, signOut)
- `lib/storage.ts` - Image upload and delete functions
- `lib/auth-context.tsx` - React Context for auth state management
- `.env.local` - Environment variables (NEEDS YOUR FIREBASE CONFIG)

### Modified Files:
- `app/layout.tsx` - Added AuthProvider and ThemeProvider
- `app/login/page.tsx` - Integrated Firebase authentication
- `app/signup/page.tsx` - Integrated Firebase registration
- `app/gallery/page.tsx` - Added image upload/delete with Firebase

## Next Steps: Configure Firebase

### 1. Create a Firebase Project
   1. Go to [Firebase Console](https://console.firebase.google.com/)
   2. Create a new project or use an existing one
   3. Enable Authentication:
      - In the left sidebar, go to **Authentication**
      - Click **Get started**
      - Enable **Email/Password** authentication method
   4. Enable Firestore Database:
      - In the left sidebar, go to **Firestore Database**
      - Click **Create Database**
      - Choose **Start in production mode**
   5. Enable Cloud Storage:
      - In the left sidebar, go to **Storage**
      - Click **Get started**
      - Accept the default settings

### 2. Get Your Firebase Config
   1. In Firebase Console, click the **Gear Icon** → **Project Settings**
   2. Scroll down to find your Firebase SDK config
   3. Copy the configuration values

### 3. Update `.env.local`
   Replace the placeholder values in `c:\Users\hp\ecolens\.env.local` with your actual Firebase credentials:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   ```

### 4. Configure Firestore Security Rules
   In Firebase Console, go to **Firestore Database** → **Rules** and update with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth.uid == userId;
       }
     }
   }
   ```

### 5. Configure Cloud Storage Rules
   In Firebase Console, go to **Storage** → **Rules** and update with:

   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /gallery/{userId}/{allPaths=**} {
         allow read, write: if request.auth.uid == userId;
       }
     }
   }
   ```

## How to Use

### For Users:

1. **Sign Up**: Go to `/signup` and create an account
2. **Sign In**: Go to `/login` with your credentials
3. **Upload Photos**: In the gallery page, click "Upload Photo" to select and upload images
4. **View Gallery**: See all your uploaded images in the "Your Uploads" section
5. **Delete Photos**: Click the trash icon on any image to remove it
6. **Logout**: Click the "Logout" button in the top right

### For Developers:

#### Authenticate a user:
```typescript
import { signIn, signUp } from '@/lib/auth'

// Sign up
await signUp(email, password, fullName)

// Sign in
await signIn(email, password)
```

#### Use auth context in components:
```typescript
import { useAuth } from '@/lib/auth-context'

export default function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please sign in</div>
  
  return <div>Welcome, {user?.displayName}</div>
}
```

#### Upload images:
```typescript
import { uploadImage } from '@/lib/storage'

const imageMetadata = await uploadImage(userId, file, { 
  species: 'Tiger',
  location: 'India'
})
```

## Features by Page

### Sign Up (`/signup`)
- Email validation
- Password strength check (min 8 characters)
- Password confirmation
- Terms & conditions acceptance
- User profile created in Firestore

### Sign In (`/login`)
- Email and password validation
- Error messages for failed login attempts
- Redirects to gallery on successful login

### Gallery (`/gallery`)
- Protected route (redirects to login if not authenticated)
- Upload photos via file picker
- Display all user's uploaded images
- Delete images with confirmation
- Browse global species database
- Search and filter species

## Troubleshooting

### "Firebase is not defined"
- Make sure Firebase package is installed: `pnpm add firebase`
- Restart the dev server

### Images not uploading
- Check that Cloud Storage is enabled in Firebase Console
- Verify storage rules allow writes for authenticated users
- Check browser console for specific error messages

### Gallery shows no images
- Make sure you're logged in
- Check that Firestore database is created
- Verify user document exists in Firestore

### "User not authenticated"
- Clear browser cookies and try logging in again
- Check that Authentication is enabled in Firebase Console

## Environment Variables Used

All Firebase config values are set as `NEXT_PUBLIC_*` because they need to be accessible in the browser for client-side Firebase initialization. This is safe because Firebase has security rules to protect data.

## Next Features to Consider

- Email verification before account activation
- Password reset functionality
- Image tagging/species labeling
- Share gallery with other users
- Analytics for identifications
- ML-based species recognition from uploaded images
