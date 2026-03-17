import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../services/storage";

interface NotesState {
  items: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  items: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.items = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.items.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setLoading,
  setError,
} = notesSlice.actions;

export default notesSlice.reducer;
