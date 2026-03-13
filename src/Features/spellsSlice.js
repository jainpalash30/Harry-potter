import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async thunk is used to fetch spells based on page number (pagination support)

// Returns both spells data and page number for state synchronization
export const fetchSpells = createAsyncThunk(
  "spells/fetchSpells",
  async (pageNumber) => {
    const response = await axios.get(
      `https://potterapi-fedeperin.vercel.app/en/spells?page=${pageNumber}`
    );

    return {
      spells: response.data,
      page: pageNumber,
    };
  }
);

const initialState = {
  spellsList: [],         // Stores spells for the current page
  loading: false,
  error: null,         // Stores API error message if request fails
  currentPage: 1,
  cachedPages: {},     // Caches spells data by page number to avoid refetching

};

const spellsSlice = createSlice({
  name: "spells",
  initialState,

  reducers: {
     // If data for that page is already cached, reuse it instead of refetching
    setCurrentPage: (state, action) => {
      const page = action.payload;
      state.currentPage = page;

  
      if (state.cachedPages[page]) {
        state.spellsList = state.cachedPages[page];
      }
    },
  },

  // Handles async thunk lifecycle (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpells.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSpells.fulfilled, (state, action) => {
        state.loading = false;
        state.spellsList = action.payload.spells;
        state.currentPage = action.payload.page;

  
        state.cachedPages[action.payload.page] = action.payload.spells;
      })

      .addCase(fetchSpells.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = spellsSlice.actions;

export default spellsSlice.reducer;
