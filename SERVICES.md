# Services Documentation

This document provides a detailed overview of the services layer in the NerdBug-mobile application.

## Storage Service

The Storage Service is the primary interface for data persistence. It utilizes @react-native-async-storage/async-storage to provide an offline-first experience.

### File Location
- services/storage.ts

### Key Interfaces

```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

### Methods

- saveNotes(notes: Note[]): Promise<void>: Serializes the notes array to JSON and saves it to AsyncStorage.
- getNotes(): Promise<Note[]>: Retrieves the JSON string from AsyncStorage, parses it, and returns an array of Note objects. Returns an empty array if no data exists or an error occurs.
- clearAll(): Promise<void>: Removes the primary notes key from storage.

### Implementation Details

- Key: @nerdbug_notes: The central key used for storing all application notes.
- Error Handling: All storage operations are wrapped in try-catch blocks to prevent application crashes during storage failures.

## Usage in State Management

While the Storage Service handles the physical persistence, it is typically orchestrated through the Redux store.

- Loading: During app initialization, the Redux store calls getNotes() to populate the initial state.
- Persistence: Reducers or screen-level effects call saveNotes() whenever the state is modified to ensure data consistency between memory and disk.

## Security Considerations

- Data Sensitivity: AsyncStorage is not encrypted. Avoid storing sensitive information like passwords or private keys in this layer.
- Local Only: The current implementation is strictly local and does not sync with any cloud services.

## Future Enhancements

- Cloud Sync: Implementation of a sync engine for multi-device support.
- Encryption: Potential integration of react-native-keychain or similar for secure storage.
- Search indexing: Improved local search performance for large datasets.
