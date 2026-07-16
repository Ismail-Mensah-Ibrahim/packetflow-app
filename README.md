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
