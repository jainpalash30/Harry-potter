
import React from 'react';

// Reusable loading spinner component
// Used to display a loading state while fetching API
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      {/* Loading message shown below spinner */}
      <p>Loading magical data Bosss...</p>  
    </div>
  );
}

export default LoadingSpinner;