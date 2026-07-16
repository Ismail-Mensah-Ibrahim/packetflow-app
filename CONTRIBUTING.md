# Contributing to PacketFlow

Thank you for your interest in contributing to PacketFlow! 

## Getting Started
1. Review the [Installation Guide](docs/Installation.md) to set up your local environment.
2. Read our [Code Style](docs/CodeStyle.md) guidelines to ensure your contributions match the existing patterns.
3. Check the [Folder Structure](docs/FolderStructure.md) to understand where your changes should go.

## Development Workflow
1. **Branch Naming**: Use the format `feature/<name>`, `bugfix/<name>`, or `chore/<name>`.
2. **Type Checking**: Before committing, ensure `npm run typecheck` passes with no errors.
3. **Linting**: Run `npm run lint` (which uses Biome under the hood). If formatting is off, you can run `npx biome check --write .` to auto-fix styling.
4. **Testing**: Ensure that your changes do not break the interactive canvas or cloud sync integrations.

## Submitting Pull Requests
- Keep PRs focused on a single feature or bug fix.
- Provide a clear, descriptive title.
- Detail the changes you made, why you made them, and how they can be tested.
- Include screenshots or videos if your changes affect the UI.

We look forward to your contributions!
