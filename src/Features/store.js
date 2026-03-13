
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import spellsReducer from './spellsSlice';

// Combines multiple slice reducers into a single root reducer
const store = configureStore({
  reducer: {
    
    books: booksReducer, // Handles books-related state
    spells: spellsReducer, // Handles spells-related state
  },
});


export default store;