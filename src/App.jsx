
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import SpellsPage from './pages/SpellsPage';
import CharactersPage from './pages/Characters';
import HousesPage from './pages/HousesPage';
import './App.css';

function App() {
  return (
    
     // BrowserRouter enables client-side routing
    <BrowserRouter>
      <div className="app">
     
       {/* Persistent navigation across all routes */}
        <Navbar />
        
     
        <main className="main-content">
         
          <Routes>
            {/* Default route redirects to.... */}
            <Route path="/" element={<Navigate to="/books" replace />} />
            
            
            <Route path="/books" element={<BooksPage />} />

            <Route path="/spells" element={<SpellsPage />} />

            <Route path="/characters" element={<CharactersPage />} />

            <Route path="/houses" element={<HousesPage />} />
            
              {/* Fallback route for undefined paths */}
            <Route path="*" element={
              <div className="error-container">
                <h1>404 - Page Not Found</h1>
                <p>This page doesn't exist in the magical world!</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;