# PacketFlow Mobile App

PacketFlow is a React Native mobile application for designing, simulating, and visualizing network topologies. Built with Expo, NativeWind, and Reanimated, it provides an interactive canvas for network engineers and students to map out devices, connections, and traffic flows.

## Core Features
- **Interactive Topology Canvas:** Drag-and-drop interface for network devices using React Native Reanimated.
- **Device Library:** Comprehensive catalog of routers, switches, firewalls, and end devices.
- **Packet Simulation:** Visualize packet flow across connected nodes with a built-in terminal output.
- **Cloud Sync:** Project states are persisted securely via Supabase and Firebase.
- **Dark Mode First:** Modern, sleek interface tailored for extended usage, powered by NativeWind.

## Documentation
Comprehensive developer documentation is available in the `docs/` directory:

- [Architecture](docs/Architecture.md)
- [Folder Structure](docs/FolderStructure.md)
- [Installation](docs/Installation.md)
- [Environment Variables](docs/EnvironmentVariables.md)
- [Backend (Firebase & Supabase)](docs/Backend.md)
- [Authentication](docs/Authentication.md)
- [Navigation](docs/Navigation.md)
- [State Management](docs/StateManagement.md)
- [Theme & Styling](docs/Theme.md)
- [API & Services](docs/API.md)
- [Performance](docs/Performance.md)
- [Deployment](docs/Deployment.md)
- [Troubleshooting](docs/Troubleshooting.md)
- [Code Style](docs/CodeStyle.md)

## Quick Start
1. Clone the repository
2. Install dependencies: `npm install --legacy-peer-deps`
3. Configure your `.env.local` based on `docs/EnvironmentVariables.md`
4. Start the app: `npm start`

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

## 🗺️ Project Roadmap
Our goal is to build the most comprehensive mobile network simulation tool.
- **v0.3.0 Device System**: Full suite of routers, switches, PCs, and servers.
- **v0.4.0 Cable System**: Validation for straight-through, crossover, and fiber cables.
- **v0.5.0 Simulation Engine**: Packet animation, ARP, DHCP, DNS, and STP logic.
- **v0.6.0 Cisco Terminal**: IOS-like CLI parsing, running configs, and routing commands.
- **v0.7.0 AI Assistant**: In-app AI troubleshooting and learning quizzes.
- **v0.8.0 Collaboration**: Multiplayer real-time topology editing.
- **v0.9.0 Beta**: Comprehensive QA and polish.
- **v1.0.0 Production Release**: Stable, accessible, and performant App Store release.

## 🛠️ Development Workflow

### Branch Strategy
We follow a structured branching strategy:
- `main` — Production-ready, stable code.
- `feature/*` — New features (e.g., `feature/device-system`).
- `bugfix/*` — Fixes for existing issues (e.g., `bugfix/canvas-shaking`).
- `hotfix/*` — Urgent production patches.

### Issue Workflow
1. **Backlog**: All newly created issues start in the backlog.
2. **Ready**: Issues groomed and approved for the current sprint/milestone.
3. **In Progress**: Actively being worked on by an assigned developer.
4. **Review**: Pull Request submitted and awaiting code review.
5. **Testing**: Approved code being validated in the staging environment.
6. **Done**: Merged and deployed.

### Pull Request Workflow
1. Fork the repo or create a branch.
2. Ensure your PR addresses a specific Issue.
3. Your code MUST pass the automated `build-validation` workflow (Lint, Typecheck, Expo Doctor).
4. Fill out the Pull Request Template thoroughly.
5. Wait for at least one approving review from a maintainer.

### Release Workflow
Releases are cut from the `main` branch corresponding to completed milestones. Annotated Git tags (e.g., `v0.3.0`) trigger our `release.yml` workflows to build the OTA updates or binary artifacts.
