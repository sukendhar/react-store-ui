import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreList from './components/stores/StoreList';
import StoreForm from './components/stores/StoreForm';
import StoreView from "./components/stores/StoreView";
import EditStoreForm from "./components/stores/EditStoreForm";
import ItemForm from "./components/items/ItemForm";
import EditItemForm from "./components/items/EditItemsForm";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<StoreList />} />
            <Route path="/stores/new" element={<StoreForm />} />
            <Route path="/stores/:id" element={<StoreView />} />
            <Route path="/stores/:id/edit" element={<EditStoreForm />} />
            <Route path="/stores/:storeId/items/new" element={<ItemForm />} />
            <Route path="/items/:id/edit" element={<EditItemForm />} />
        </Routes>
      </Router>
  );
}

export default App;
