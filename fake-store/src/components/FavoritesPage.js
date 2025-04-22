import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import FavoritesContext from '../contexts/FavoritesContext';

function FavoritesPage() {
  const { theme } = useContext(ThemeContext);
  const { favorites, removeFromFavorites, updateFavorite } = useContext(FavoritesContext);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    notes: ''
  });
  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      title: product.title,
      notes: product.notes || ''
    });
    setEditMode(true);
  };
  
  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    updateFavorite(editingProduct.id, {
      title: editFormData.title,
      notes: editFormData.notes
    });
    
    setEditMode(false);
    setEditingProduct(null);
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingProduct(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  return (
    <div className="favorites-page">
      <header style={{ backgroundColor: theme.primary }}>
        <h1>Mis Favoritos</h1>
      </header>

      <main>
        {favorites.length > 0 ? (
          <>
            {editMode ? (
              <div className="edit-form" style={{ borderColor: theme.primary }}>
                <h2>Editar Favorito</h2>
                <div className="form-group">
                  <label>Título:</label>
                  <input 
                    type="text" 
                    name="title"
                    value={editFormData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Notas personales:</label>
                  <textarea 
                    name="notes"
                    value={editFormData.notes}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    onClick={handleSaveEdit}
                    style={{ backgroundColor: theme.secondary }}
                  >
                    Guardar
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="favorites-list">
                {favorites.map(product => (
                  <div key={product.id} className="favorite-item" style={{ borderColor: theme.primary }}>
                    <Link to={`/products/${product.id}`} className="favorite-image">
                      <img src={product.image} alt={product.title} />
                    </Link>
                    
                    <div className="favorite-details">
                      <Link to={`/products/${product.id}`}>
                        <h3>{product.title}</h3>
                      </Link>
                      <p className="favorite-price">${product.price.toFixed(2)}</p>
                      
                      {product.notes && (
                        <div className="favorite-notes">
                          <p><strong>Notas:</strong> {product.notes}</p>
                        </div>
                      )}
                      
                      <div className="favorite-actions">
                        <button 
                          className="edit-button" 
                          onClick={() => handleEdit(product)}
                        >
                          <span className="material-icons">edit</span>
                          Editar
                        </button>
                        
                        <button 
                          className="remove-button" 
                          onClick={() => removeFromFavorites(product.id)}
                        >
                          <span className="material-icons">delete</span>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="empty-favorites">
            <span className="material-icons">favorite_border</span>
            <p>No tienes productos favoritos</p>
            <button 
              onClick={() => window.location.href = '/products'}
              style={{ backgroundColor: theme.secondary }}
            >
              Explorar Productos
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default FavoritesPage;