import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch books data from external API
export const fetchBooks =createAsyncThunk('books/fetchBooks' , 
async ()=> {
    const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/books');

    return response.data;   // Returning only the response data to be stored in Redux state
}
);

// Initial state of the books slice
const initialState ={
  booksList: [],
  loading: false,       
  error: null,          
  cachedTime: null,     
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {}, //  normal Synchronous actions ke liye we are using it 

    // Automatically generates pending, fulfilled, and rejected action types
   extraReducers: (builder) => { // //  async thunk lifecycle ko handle karne ke liye
     builder
       // Triggered when API request starts
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // when API request succeeds
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        
        state.booksList = action.payload; 
        state.cachedTime = Date.now();    
      })

      .addCase(fetchBooks.rejected, (state, action) => {
       
        state.loading = false;
        
        // Capture error message for UI display
        state.error = action.error.message;
      });

   },


});

export default booksSlice.reducer;


