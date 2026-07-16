# Installation Guide

Follow these steps to set up the PacketFlow mobile app on your local development machine.

## Prerequisites
- **Node.js**: v18 or later is recommended.
- **npm**: v9 or later (do not use pnpm or yarn, as the project is standardized on npm).
- **Expo CLI**: Installed globally or executed via `npx`.
- **iOS Simulator**: (macOS only) Requires Xcode installed.
- **Android Emulator**: Requires Android Studio and an AVD configured.

## Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd packetflow-app
   ```

2. **Install Dependencies**
   The project has strict peer dependency resolutions. Ensure you use the `--legacy-peer-deps` flag:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root of the project. Refer to [EnvironmentVariables.md](EnvironmentVariables.md) for the required keys.

4. **Start the Development Server**
   ```bash
   npm start
   ```

5. **Run on a Simulator/Device**
   - Press `i` in the terminal to launch the iOS simulator.
   - Press `a` in the terminal to launch the Android emulator.
   - Or scan the QR code using the Expo Go app on your physical device.

## Troubleshooting Installation
If you encounter caching or resolution issues:
1. Clear the metro cache: `npm start -- -c`
2. Wipe node modules: `rm -rf node_modules && npm install --legacy-peer-deps`
3. Check `npx expo-doctor` for environment health.
