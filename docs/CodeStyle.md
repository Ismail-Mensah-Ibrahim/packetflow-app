# Code Style & Linting

PacketFlow enforces a strict but pragmatic code style to maintain consistency across the team.

## Tooling
We use **Biome** as our primary linter and formatter, completely replacing ESLint and Prettier for significantly faster execution times.

- **Configuration**: Rules are defined in `biome.json`.
- **Formatting**: We use tabs, double quotes, and standard JSX formatting.

## Commands
- Run Linting: `npm run lint`
- Auto-fix Formatting: `npx biome check --write .`
- Type Checking: `npx tsc --noEmit`

## Specific Exceptions
React Native and Reanimated often have complex typing constraints. We have configured Biome to be slightly more permissive regarding:
- `noExplicitAny`: Disabled. While you should strive to write strict TypeScript interfaces, using `as any` is permitted when dealing with unstable `react-native-reanimated` transform array typings.
- Unused Variables/Imports: Disabled as strict errors to improve developer velocity, but should be cleaned up before merging.

## Best Practices
1. **Interfaces over Types**: Prefer `interface` for object definitions unless a union or intersection is strictly required.
2. **Component Structure**: Keep components small. If a file exceeds 250 lines, consider extracting sub-components into separate files.
3. **Tailwind Classes**: Group related Tailwind classes together logically (e.g., layout, spacing, typography, colors). Use `tailwind-merge` (`cn` utility) when dynamically concatenating classes.
