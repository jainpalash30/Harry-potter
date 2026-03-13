import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiRefreshCw } from "react-icons/fi";

// API function separated for clarity and reuse
const fetchHouses = async () => {
  const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/houses');
  return response.data;
};

function HousesPage() {
 
  // Access React Query client for manual cache control
  const queryClient = useQueryClient();
  
  const { 
    data: houses, 
    isLoading, 
    isError, 
    error,
    dataUpdatedAt,  // Timestamp of last successful fetch
  } = useQuery({
    queryKey: ['houses'],
    queryFn: fetchHouses,
    staleTime: 5 * 60 * 1000,       
    cacheTime: 10 * 60 * 1000,      // Cache persists for 10 minutes in memory
    refetchOnWindow: false,
  });
  

  
  const handleInvalidateCache = () => {
    
    queryClient.invalidateQueries({ queryKey: ['houses'] });
    
    alert(' Cache cleared! Fetching fresh data...');
  };
  
 
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  
  if (isError) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong...</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  
  
  return (
    <div className="page-container">
      <h1 className="page-title">Hogwarts Houses</h1>
      
    
      <div className="cache-control">
        <p className="cache-info">
           Last updated At : {new Date(dataUpdatedAt).toLocaleTimeString()}
        </p>
        
       
        <button 
          onClick={handleInvalidateCache}
          className="invalidate-button"
        >
           Refresh Data (Clear Cache) <FiRefreshCw />
        </button>
      </div>
      
     
      <div className="houses-grid">
        {houses && houses.map((house) => (
          <div 
            key={house.id} 
            className={`house-card house-${house.name?.toLowerCase()}`}
          >
           
           {/* Conditional emoji rendering based on house name */}
            <div className="house-emoji">
              {house.house === 'Gryffindor' && '🦁'}
              {house.house === 'Hufflepuff' && '🦡'}
              {house.house === 'Ravenclaw' && '🦅'}
              {house.house === 'Slytherin' && '🐍'}
            </div>
            
           
            <h2>{house.name}</h2>
            
          
            {house.founder && (
              <p className="house-founder">
                <span className="label">Founded by:</span> {house.founder}
              </p>
            )}
            

            
          
            {house.animal && (
              <p className="house-animal">
                <span className="label">Animal:</span> {house.animal}
              </p>
            )}
            
       

          </div>
        ))}
      </div>
    </div>
  );
}

export default HousesPage;