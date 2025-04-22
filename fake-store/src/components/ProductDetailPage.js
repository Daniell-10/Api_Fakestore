import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import FavoritesContext from '../contexts/FavoritesContext';

function ProductDetailPage() {
  const { theme } = useContext(ThemeContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Error fetching product details');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // In a real app, this would add to cart functionality
    alert(`${quantity} ${product.title}(s) added to cart!`);
  };

  const toggleFavorite = () => {
    if (!product) return;
    
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Producto no encontrado</div>;

  return (
    <div className="product-detail-page">
      <header style={{ backgroundColor: theme.primary }}>
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>Detalle del Producto</h1>
      </header>

      <main>
        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              <span className="material-icons">star</span>
              <span>{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
            <p className="product-category">
              <strong>Categoría:</strong> {product.category}
            </p>
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <span className="material-icons">remove</span>
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <span className="material-icons">add</span>
                </button>
              </div>
              
              <button 
                className="add-to-cart" 
                onClick={handleAddToCart}
                style={{ backgroundColor: theme.secondary }}
              >
                <span className="material-icons">shopping_cart</span>
                Añadir al Carrito
              </button>
              
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;