import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreList from './components/stores/StoreList';
import StoreForm from './components/stores/StoreForm';
import StoreView from "./components/stores/StoreView";
import EditStoreForm from "./components/stores/EditStoreForm";
import ItemForm from "./components/items/ItemForm";
import EditItemForm from "./components/items/EditItemsForm";
import ItemView from "./components/items/ItemView";
import EditIngredientForm from "./components/ingredients/EditIngredientForm";
import IngredientForm from "./components/ingredients/IngredientForm";
import IngredientView from "./components/ingredients/IngredientView";
import { AuthProvider } from './AuthContext';
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
      <AuthProvider>
          <Router>
              <Header />
              <Routes>
                  <Route element={<PrivateRoute />}>
                      <Route path="/" element={<StoreList />} />
                      <Route path="/stores/new" element={<StoreForm />} />
                      <Route path="/stores/:id" element={<StoreView />} />
                      <Route path="/stores/:id/edit" element={<EditStoreForm />} />
                      <Route path="/stores/:storeId/items/new" element={<ItemForm />} />
                      <Route path="/items/:id/edit" element={<EditItemForm />} />
                      <Route path="/items/:id" element={<ItemView />} />
                      <Route path="/ingredients/:id/edit" element={<EditIngredientForm />} />
                      <Route path="/items/:itemId/ingredients/new" element={<IngredientForm />} />
                      <Route path="/ingredients/:id" element={<IngredientView />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
              </Routes>
          </Router>
      </AuthProvider>

  );
}

export default App;
