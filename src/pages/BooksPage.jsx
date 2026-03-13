import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchBooks} from '../Features/booksSlice'
import LoadingSpinner from '../components/LoadingSpinner';
import { LuBookA } from "react-icons/lu";

function BooksPage() {
  
   const dispatch = useDispatch();
  
   // Select required state from Redux store
  const { booksList, loading, error, cachedTime } = useSelector(
    (state) => state.books
  );
  
  
  useEffect(() => {
    
    // Refetch only if no cached data exists
    // or cache is older than 5 minutes (300000 ms)
    const shouldFetch = !cachedTime || (Date.now() - cachedTime > 300000);
    
    if (shouldFetch) {
      
      dispatch(fetchBooks());
    }

  }, [dispatch, cachedTime]);
 
  
   // Show loading spinner while API request is in progress
  if (loading) {
    return <LoadingSpinner />;
  }
  
   // Display error UI if API request fails
    if (error) {
    return (
      <div className="error-container">
        <h2>oops!! Something went wrong....</h2>
        <p>{error}</p>
      </div>
    );
  }
  
 
  return (
    <div className="page-container">
      <h1 className="page-title">Harry Potter Books</h1>
      

      {cachedTime && (
        <p className="cache-info">
          Data cached at: {new Date(cachedTime).toLocaleTimeString()}
        </p>
      )}
      
   
    <div className="books-grid">
         {/* Render book cards dynamically */}
        {booksList.map((book) => (
       <div key={book.id} className="book-card">

  {/* Render cover only if available */}
        {book.cover && (
           <img 
                src={book.cover} 
                alt={book.title} 
                className="book-cover"
              />
            )}
            
          
            <h3>{book.title}</h3>
           
            <p className="book-author">by {book.author}</p>
           
            <p className="original-title">by {book.originalTitle}</p>
            
           
            <p className="book-release">Released on: {book.releaseDate}</p>
            
          
            <p className="book-pages"> <LuBookA />{book.pages} pages</p>
            
         
            {book.description && (
              <p className="book-summary">{book.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;