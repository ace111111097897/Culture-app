# EAS CLI Setup Guide for Cubbles App

## Project Configuration Complete ✅

Your Cubbles app has been configured for EAS (Expo Application Services) with the project ID: `051a0660-bbe1-424d-bf33-b707edb566f6`

## Next Steps

### 1. Install EAS CLI (if not already installed)
```bash
npm install --global eas-cli
```

### 2. Login to your Expo account
```bash
eas login
```

### 3. Initialize EAS (already configured)
The project is already initialized with your provided ID. The command you mentioned:
```bash
eas init --id 051a0660-bbe1-424d-bf33-b707edb566f6
```
Should recognize the existing configuration.

### 4. Build your app
```bash
# For development build
eas build --platform ios --profile development

# For production build
eas build --platform ios --profile production
eas build --platform android --profile production
```

### 5. Submit to app stores
```bash
# iOS App Store
eas submit --platform ios

# Google Play Store  
eas submit --platform android
```

## Configuration Files Created

- ✅ `eas.json` - EAS build and submit configuration
- ✅ `app.json` - Expo app configuration with your project ID
- ✅ `expo-env.d.ts` - TypeScript environment declarations
- ✅ Updated `package.json` with proper app name

## Important Notes

1. **Apple Developer Account**: You'll need an active Apple Developer account ($99/year) for iOS builds
2. **Team ID**: Update the `appleTeamId` in `eas.json` with your actual Apple Team ID
3. **Service Account**: For Android, you'll need a Google Play Console service account key
4. **Bundle Identifier**: The app uses `com.cubbles.app` - make sure this is available

## Build Profiles

- **Development**: For testing on devices during development
- **Preview**: For internal testing and TestFlight
- **Production**: For app store submission

Your app is now ready for EAS builds and deployment! 🚀