import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import ThemeContext from '../contexts/ThemeContext';

function HomePage() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSurprise, setShowSurprise] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching featured products (limit to 4)
        const productResponse = await fetch('https://fakestoreapi.com/products?limit=4');
        if (!productResponse.ok) throw new Error('Error fetching products');
        const productData = await productResponse.json();
        setFeaturedProducts(productData);
        
        // Fetching categories
        const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoryResponse.ok) throw new Error('Error fetching categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSearch = (term) => {
    // Redirect to products page with search term
    window.location.href = `/products?search=${encodeURIComponent(term)}`;
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    setTimeout(() => setShowSurprise(false), 5000);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <header style={{ backgroundColor: theme.primary }}>
        <h1>Fake Store</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="theme-button-container">
          <button 
            className="theme-button" 
            onClick={changeTheme}
            style={{ backgroundColor: theme.secondary }}
          >
            <span className="material-icons">palette</span>
            Cambiar Tema
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" style={{ backgroundColor: theme.secondary }}>
          <h2>Bienvenido a nuestra tienda</h2>
          <p>Descubre los mejores productos a los mejores precios</p>
          <button 
            className="surprise-button"
            onClick={handleSurpriseClick}
          >
            ¡Sorpresa!
          </button>
          
          {showSurprise && (
            <div className="surprise-discount">
              <h3>¡FELICIDADES!</h3>
              <p>Has ganado un 25% de descuento en tu próxima compra</p>
              <p>Código: <strong>FAKE25</strong></p>
            </div>
          )}
        </section>

        <section className="featured-products">
          <h2>Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Link 
            to="/products" 
            className="view-all-button"
            style={{ backgroundColor: theme.primary }}
          >
            Ver todos los productos
          </Link>
        </section>

        <section className="categories-section">
          <h2>Categorías</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category} 
                to={`/categories?name=${encodeURIComponent(category)}`}
                className="category-card"
                style={{ borderColor: theme.secondary }}
              >
                <h3>{category}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;