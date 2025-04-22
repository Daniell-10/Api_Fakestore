import React, { useState, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

function FilterOptions({ categories, onFilter }) {
  const { theme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('default');

  const handleApplyFilter = () => {
    onFilter({
      category: selectedCategory,
      price: priceRange,
      sort: sortBy
    });
  };

  return (
    <div className="filter-options" style={{ borderColor: theme.primary }}>
      <h3>Filtros</h3>
      
      <div className="filter-section">
        <label>Categoría:</label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-section">
        <label>Precio:</label>
        <div className="price-range">
          <input 
            type="number" 
            min="0" 
            max="1000"
            value={priceRange.min}
            onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
          />
          <span>a</span>
          <input 
            type="number" 
            min="0" 
            max="1000"
            value={priceRange.max}
            onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
          />
        </div>
      </div>
      
      <div className="filter-section">
        <label>Ordenar por:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Predeterminado</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>
      
      <button 
        className="apply-filter" 
        onClick={handleApplyFilter}
        style={{ backgroundColor: theme.secondary }}
      >
        Aplicar Filtros
      </button>
    </div>
  );
}

export default FilterOptions;
