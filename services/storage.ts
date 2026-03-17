import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "@nerdbug_notes";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const StorageService = {
  saveNotes: async (notes: Note[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem(NOTES_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving notes", e);
    }
  },

  getNotes: async (): Promise<Note[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error fetching notes", e);
      return [];
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(NOTES_KEY);
    } catch (e) {
      console.error("Error clearing notes", e);
    }
  },
};
