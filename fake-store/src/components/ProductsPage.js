import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import ProductCard from './ProductCard';
import ThemeContext from '../contexts/ThemeContext';

function ProductsPage() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching all products
        const productResponse = await fetch('https://fakestoreapi.com/products');
        if (!productResponse.ok) throw new Error('Error fetching products');
        const productData = await productResponse.json();
        setProducts(productData);
        setFilteredProducts(productData);
        
        // Fetching categories
        const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoryResponse.ok) throw new Error('Error fetching categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
        
        // Check for search params
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('search');
        if (searchTerm) {
          handleSearch(searchTerm);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location.search]);

  const handleSearch = (term) => {
    if (!term) {
      setFilteredProducts(products);
      return;
    }
    
    const searchResults = products.filter(product => 
      product.title.toLowerCase().includes(term.toLowerCase()) || 
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProducts(searchResults);
  };

  const handleFilter = (filterOptions) => {
    let results = [...products];
    
    // filtro por categoria
    if (filterOptions.category !== 'all') {
      results = results.filter(product => product.category === filterOptions.category);
    }
    
    // Filtro por rango de precio
    results = results.filter(product => 
      product.price >= filterOptions.price.min && 
      product.price <= filterOptions.price.max
    );
    
    // orden de productos
    switch(filterOptions.sort) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // orden predeterminado por id
        results.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(results);
    setShowFilters(false);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-page">
      <header style={{ backgroundColor: theme.primary }}>
        <h1>Productos</h1>
        <SearchBar onSearch={handleSearch} />
        <button 
          className="filter-toggle" 
          onClick={() => setShowFilters(!showFilters)}
          style={{ backgroundColor: theme.secondary }}
        >
          <span className="material-icons">filter_list</span>
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
      </header>

      <main>
        {showFilters && (
          <FilterOptions 
            categories={categories} 
            onFilter={handleFilter} 
          />
        )}

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">No se encontraron productos</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;