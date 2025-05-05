import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreList from './components/stores/StoreList';
import StoreForm from './components/stores/StoreForm';
import StoreView from "./components/stores/StoreView";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<StoreList />} />
            <Route path="/stores/new" element={<StoreForm />} />
            <Route path="/stores/:id" element={<StoreView />} />
        </Routes>
      </Router>
  );
}

export default App;
