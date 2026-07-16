# Theme & Styling

PacketFlow is heavily styled using **NativeWind** (Tailwind CSS for React Native), alongside a custom token system for theming.

## NativeWind Setup
- `tailwind.config.js`: Defines our color palettes, border radii, and custom animations.
- `global.css`: Imports the Tailwind directives. In standard NativeWind v4 setups, this file is imported at the root `_layout.tsx`.

## Dark Mode
The application is designed "Dark Mode First" to reduce eye strain for network engineers. 
- Themes are handled via standard Tailwind classes using the `dark:` prefix.
- Example: `className="bg-white dark:bg-slate-900 text-black dark:text-white"`
- The user's preference is stored in `useThemeStore`, which can force the NativeWind `colorScheme` to update dynamically.

## UI Primitives (`@rn-primitives`)
To ensure full accessibility and native-feeling interactive components (dropdowns, accordions, tooltips), we utilize the `@rn-primitives` library. These are Radix-like unstyled primitives that we style heavily using NativeWind classes. 
- Source components are located in `src/components/ui/`.

## Canvas Styling
The interactive Canvas relies on raw SVG (`react-native-svg`) and Reanimated styles. Tailwind classes are NOT used for dynamic canvas positioning due to performance constraints; instead, inline `useAnimatedStyle` is utilized.
