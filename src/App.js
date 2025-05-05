import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreList from './components/stores/StoreList';
import StoreForm from './components/stores/StoreForm';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<StoreList />} />
            <Route path="/stores/new" element={<StoreForm />} />
        </Routes>
      </Router>
  );
}

export default App;
