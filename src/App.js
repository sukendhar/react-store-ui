import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreList from './components/stores/StoreList';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<StoreList />} />
        </Routes>
      </Router>
  );
}

export default App;
