# Troubleshooting

Common issues and their resolutions when developing PacketFlow.

## Metro Bundler Cache Issues
**Symptom**: Unexplained errors about missing modules or stale UI after updating NativeWind classes.
**Resolution**: Clear the bundler cache.
```bash
npm start -- -c
```
For deep clears, wipe the `.metro-cache` and `.native-wind-cache` folders.

## Peer Dependency Conflicts
**Symptom**: `npm install` throws `ERESOLVE` errors.
**Resolution**: PacketFlow relies heavily on exact Expo SDK alignments. Always use `--legacy-peer-deps` if upgrading specific React Native community packages manually, or run `npx expo install --fix` to auto-align them with the current SDK.

## Expo Doctor Warnings
**Symptom**: `npx expo-doctor` complains about version mismatches.
**Resolution**: If the mismatches are intentional (e.g., holding back a library version for stability), ignore them. Otherwise, run `npx expo install --fix` to downgrade/upgrade them to the exact Expo supported version.

## iOS Simulator Not Launching
**Symptom**: Pressing `i` in the Expo CLI fails.
**Resolution**: Ensure Xcode is installed, open Xcode -> Preferences -> Locations, and ensure the Command Line Tools are selected.

## Reanimated Crashing on Reload
**Symptom**: Fast Refresh crashes the app when modifying `useSharedValue`.
**Resolution**: This is a known issue with Hermes/Reanimated hot reloading. Fully reload the app (`r` in the terminal) instead of relying on Fast Refresh.
