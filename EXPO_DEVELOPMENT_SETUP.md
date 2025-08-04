# Expo Development Environment Setup

## Prerequisites
1. Install Node.js (v18 or higher)
2. Install Expo CLI globally:
   ```bash
   npm install -g @expo/cli
   ```

## Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
# Start Expo development server
npm run start
# or
npx expo start

# For specific platforms
npm run android  # Android
npm run ios      # iOS  
npm run web      # Web browser
```

### 3. Mobile Development Options

#### Option A: Expo Go App (Easiest)
1. Install Expo Go on your phone:
   - iOS: App Store
   - Android: Google Play Store
2. Scan QR code from terminal/browser
3. App loads instantly on your device

#### Option B: Development Build
1. Create development build:
   ```bash
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```
2. Install build on device
3. Use `npx expo start --dev-client`

#### Option C: Simulator/Emulator
- iOS Simulator (Mac only): Press `i` in terminal
- Android Emulator: Press `a` in terminal

## Project Structure
- `app/` - Expo Router pages
- `src/` - React components and logic
- `app.json` - Expo configuration
- `eas.json` - EAS Build configuration

## Available Scripts
- `npm run start` - Start Expo development server
- `npm run android` - Open on Android
- `npm run ios` - Open on iOS
- `npm run web` - Open in web browser
- `npm run dev` - Vite development (web only)

## Building for Production
```bash
# Build for app stores
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

Your Expo development environment is ready! 🚀