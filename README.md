# NerdBug Mobile - Offline Notes App

A premium, offline-first notes application built with React Native and Expo. Replicating the high-quality modular architecture and standards of the Qashr project.

## Features
- **Offline Storage**: Notes are persisted locally using AsyncStorage.
- **State Management**: Redux Toolkit for efficient state handling.
- **Premium UI**: Responsive design with `hp`/`wp` scaling and polished typography.
- **Search**: Real-time filtering of notes by title and content.
- **Custom Modals**: Sophisticated, reusable modal components.

## Tech Stack
- **Framework**: React Native / Expo (SDK 54)
- **State**: Redux Toolkit & React-Redux
- **Navigation**: React Navigation (Stack)
- **Persistence**: @react-native-async-storage/async-storage
- **Responsiveness**: react-native-responsive-screen
- **Icons**: @expo/vector-icons (Ionicons)

## Project Structure
- `screens/`: Application screens (Home, Note Editor).
- `components/`: Reusable UI components.
- `redux/`: Store configuration and slices.
- `navigation/`: Navigation stack configuration.
- `theme/`: Global styles, colors, and typography.
- `services/`: Data persistence logic.
- `data/`: Centralized UI strings and constants.

## Standards
- **Husky & Lint-staged**: Enforced code quality on every commit.
- **TypeScript**: Strict type safety throughout the codebase.
- **Safe Area**: notch-aware layouts using `react-native-safe-area-context`.
