

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

import LoadingSpinner from '../components/LoadingSpinner';

// API function separated for better readability and reuse
const fetchCharacters = async () => {
  const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/characters');
  return response.data;
};

function CharactersPage() {

  
  const { 
    data: characters,      
    isLoading,           
    isError,              
    error,                
  } = useQuery({
        // Unique query key ensures proper caching and refetch control
    queryKey: ['characters'],          
    queryFn: fetchCharacters, // Function responsible for fetching data  
    staleTime: 5 * 60 * 1000,    // Data remains fresh for 5 minutes (no refetch during this period)      
    cacheTime: 10 * 60 * 1000,       // Cache stays in memory for 10 minutes after component unmounts  
    refetchOnWindow: false,       
  });
  
   // Show loading UI while fetching data
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
 
  if (isError) {
    return (
      <div className="error-container">
        <h2> Oops!! Something went wrong...</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <h1 className="page-title">Harry Potter Characters</h1>
      
         {/* Informational note about React Query caching behavior */}
      <p className="cache-info">
        Data is automatically cached for 5 minutes by React Query
      </p>
      
     
      <div className="characters-grid">
        {characters && characters.map((character) => (
          <div key={character.id} className="character-card">
          
            {character.image && (
              <img 
                src={character.image} 
                alt={character.fullName} 
                className="character-image"
              />
            )}
            
         
            <h3>{character.nickname}</h3>
            

          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersPage;