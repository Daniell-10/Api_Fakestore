import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

function CategoriesPage() {
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error('Error fetching categories');
        const data = await response.json();
        setCategories(data);
        
        // Check if category is in URL params
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('name');
        
        if (categoryParam && data.includes(categoryParam)) {
          setSelectedCategory(categoryParam);
          fetchCategoryProducts(categoryParam);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [location.search]);

  const fetchCategoryProducts = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) throw new Error('Error fetching category products');
      const data = await response.json();
      setCategoryProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchCategoryProducts(category);
    // Update URL without refreshing page
    const url = new URL(window.location);
    url.searchParams.set('name', category);
    window.history.pushState({}, '', url);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="categories-page">
      <header style={{ backgroundColor: theme.primary }}>
        <h1>Categorías</h1>
      </header>

      <main>
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
              style={{ 
                backgroundColor: selectedCategory === category ? theme.secondary : 'transparent',
                borderColor: theme.secondary 
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="category-products">
            <h2>{selectedCategory}</h2>
            <div className="products-grid">
              {categoryProducts.map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="product-card"
                  style={{ borderColor: theme.primary }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CategoriesPage;