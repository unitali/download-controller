import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';

const App: React.FC = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.ts').then(
        (registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        },
        (error) => {
          console.log('Service Worker registration failed:', error);
        }
      );
    });
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
