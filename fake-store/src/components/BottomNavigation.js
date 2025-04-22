import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

function BottomNavigation() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav" style={{ backgroundColor: theme.primary }}>
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <span className="material-icons">home</span>
        <span>Inicio</span>
      </Link>
      <Link to="/products" className={`nav-item ${isActive('/products') ? 'active' : ''}`}>
        <span className="material-icons">shopping_bag</span>
        <span>Productos</span>
      </Link>
      <Link to="/categories" className={`nav-item ${isActive('/categories') ? 'active' : ''}`}>
        <span className="material-icons">category</span>
        <span>Categorías</span>
      </Link>
      <Link to="/favorites" className={`nav-item ${isActive('/favorites') ? 'active' : ''}`}>
        <span className="material-icons">favorite</span>
        <span>Favoritos</span>
      </Link>
    </nav>
  );
}

export default BottomNavigation;