# Deployment Guide

PacketFlow is built on Expo and is ready to be deployed to the App Store, Google Play, or the Web.

## EAS Build (Expo Application Services)
The recommended way to deploy the application is via EAS.

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login and Configure**
   ```bash
   eas login
   eas build:configure
   ```

3. **Building for Production**
   To generate standard release builds:
   - **Android**: `eas build --platform android --profile production` (Generates an .aab)
   - **iOS**: `eas build --platform ios --profile production` (Requires an Apple Developer account; generates an .ipa)

4. **Web Deployment**
   Expo Router supports static site generation. 
   ```bash
   npx expo export -p web
   ```
   Deploy the `dist/` folder to Vercel, Netlify, or Firebase Hosting.

## Pre-Flight Checklist
Before cutting a release branch:
- Verify that `.env.local` variables have been mapped into your EAS Secrets (`eas secret:create`).
- Run `npm run typecheck` and `npm run lint`.
- Increment the `version` and `buildNumber`/`versionCode` in `app.json`.
- Ensure all placeholder `com.packetflow.app` identifiers are correctly registered in the Apple Developer Portal and Google Play Console.
