# NerdBug Mobile - Offline Notes App

A premium, offline-first notes application built with React Native and Expo. Replicating the high-quality modular architecture and standards of the Qashr project.

## Quick Start

### Prerequisites
- Node.js (LTS)
- npm or yarn
- Expo Go app on your device or an emulator (iOS/Android)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NerdBug-mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features
- Offline Storage: Notes are persisted locally using @react-native-async-storage/async-storage.
- State Management: Redux Toolkit for efficient and predictable state handling.
- Premium UI: Responsive design using react-native-responsive-screen for perfect scaling across devices.
- Navigation: Type-safe navigation using @react-navigation/native.
- Note Management: Create, edit, search, and delete notes with real-time updates.

## Tech Stack
- Framework: React Native / Expo (SDK 54)
- State: Redux Toolkit & React-Redux
- Navigation: React Navigation
- Persistence: AsyncStorage
- Styling: Vanilla Stylesheets with responsive utilities
- Quality Assurance: Husky, Lint-staged, TypeScript

## Project Structure
For a detailed breakdown of the codebase architecture, please refer to [ARCHITECTURE.md](file:///home/biodun/NerdBug-mobile/ARCHITECTURE.md).

- screens/: Application screens (Home, Note Editor).
- components/: Reusable UI components.
- redux/: Store configuration and slices.
- services/: Data persistence and external logic.
- theme/: Global styles, colors, and typography.

## Available Scripts
- npm start: Starts the Expo development server.
- npm run android: Runs the app on an Android emulator/device.
- npm run ios: Runs the app on an iOS simulator.
- npm run type-check: Validates TypeScript types across the project.
- npm test: Runs Jest unit tests.

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](/NerdBug-mobile/CONTRIBUTING.md) for our development standards and workflow.

---
