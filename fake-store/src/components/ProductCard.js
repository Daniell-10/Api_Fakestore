import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import FavoritesContext from '../contexts/FavoritesContext';

function ProductCard({ product }) {
  const { theme } = useContext(ThemeContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  
  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="product-card" style={{ borderColor: theme.primary }}>
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>
      <button 
        className="favorite-button" 
        onClick={toggleFavorite}
        style={{ color: isFavorite(product.id) ? '#e74c3c' : '#ccc' }}
      >
        <span className="material-icons">
          {isFavorite(product.id) ? 'favorite' : 'favorite_border'}
        </span>
      </button>
    </div>
  );
}

export default ProductCard;