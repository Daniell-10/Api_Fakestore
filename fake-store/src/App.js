import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CategoriesPage from './components/CategoriesPage';
import CartPage from './components/CartPage';
import FavoritesPage from './components/FavoritesPage';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header'; // 👈 Importa el Header
import ThemeContext from './contexts/ThemeContext';
import FavoritesContext from './contexts/FavoritesContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  const [theme, setTheme] = useState({
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f8f9fa',
    text: '#333333'
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const updateFavorite = (productId, updates) => {
    setFavorites(prev => 
      prev.map(item => item.id === productId ? { ...item, ...updates } : item)
    );
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const changeTheme = () => {
    const themes = [
      { primary: '#3498db', secondary: '#2ecc71', background: '#f8f9fa', text: '#333333' },
      { primary: '#e74c3c', secondary: '#f39c12', background: '#ecf0f1', text: '#2c3e50' },
      { primary: '#9b59b6', secondary: '#1abc9c', background: '#f5f5f5', text: '#34495e' },
      { primary: '#34495e', secondary: '#d35400', background: '#ecf0f1', text: '#2c3e50' }
    ];
    
    const currentIndex = themes.findIndex(t => 
      t.primary === theme.primary && 
      t.secondary === theme.secondary
    );
    
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <FavoritesContext.Provider value={{ 
          favorites, 
          addToFavorites, 
          removeFromFavorites, 
          updateFavorite, 
          isFavorite 
        }}>
          <Router>
            <div className="app-container" style={{ 
              backgroundColor: theme.background, 
              color: theme.text 
            }}>
              <Header /> {/* 👈 Aquí agregamos el Header */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <BottomNavigation />
            </div>
          </Router>
        </FavoritesContext.Provider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
