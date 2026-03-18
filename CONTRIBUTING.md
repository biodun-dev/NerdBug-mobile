# Contributing Guide

Thank you for contributing to NerdBug-mobile! This guide outlines the standards and workflows we use to maintain a high-quality codebase.

## Development Workflow

1. Create a Branch: Always create a new branch for your feature or bugfix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make Changes: Implement your changes following the coding standards.
3. Run Tests: Ensure all tests pass before committing.
   ```bash
   npm test
   ```
4. Commit: Use descriptive commit messages.
5. Push & PR: Push your branch and open a Pull Request for review.

## Coding Standards

### TypeScript
- Use strict typing where possible. Avoid the use of 'any'.
- Define interfaces for all data models and component props.
- Export types and interfaces if they are used across multiple files.

### Component Structure
- Keep components small and focused on a single responsibility.
- Use functional components and hooks.
- Place reusable components in the /components directory.

### Naming Conventions
- Files: Use PascalCase for components (e.g., Button.tsx) and camelCase for utilities/services (e.g., storage.ts).
- Variables/Functions: Use camelCase.
- Constants: Use UPPER_SNAKE_CASE.

### Styling
- Use the central theme for colors and typography.
- Avoid hardcoding values; use wp() and hp() from react-native-responsive-screen for responsive layouts.

## Git Conventions

We use Husky and lint-staged to ensure code quality on every commit.
- Pre-commit Hooks: Type-checking and unit tests are automatically run before commits.
- Commit Messages: Keep them concise and descriptive.

## Testing Guidelines

- Write unit tests for all new logic in services and redux slices.
- Use React Testing Library for component testing.
- Place tests in a __tests__ directory adjacent to the file being tested or as .test.ts files.

## Questions?

If you have any questions or need clarification, feel free to reach out to the project maintainers.
