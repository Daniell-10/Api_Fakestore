import React, { useState, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

function CartPage() {
  const { theme } = useContext(ThemeContext);
  // Mock cart data for demo
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      quantity: 1
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      quantity: 2
    }
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'FAKE25') {
      setDiscountApplied(true);
      alert('¡Código de descuento aplicado correctamente!');
    } else {
      alert('Código de promoción inválido');
    }
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateDiscount = () => {
    return discountApplied ? calculateSubtotal() * 0.25 : 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  return (
    <div className="cart-page">
      <header style={{ backgroundColor: theme.primary }}>
        <h1>Carrito de Compras</h1>
      </header>

      <main>
        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item" style={{ borderColor: theme.primary }}>
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <span className="material-icons">remove</span>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <span className="material-icons">add</span>
                      </button>
                    </div>
                    
                    <button 
                      className="remove-item" 
                      onClick={() => removeItem(item.id)}
                    >
                      <span className="material-icons">delete</span>
                      Eliminar
                    </button>
                  </div>
                  
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary" style={{ borderColor: theme.secondary }}>
              <div className="promo-code">
                <input 
                  type="text" 
                  placeholder="Código Promocional" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button 
                  onClick={applyPromoCode}
                  style={{ backgroundColor: theme.secondary }}
                >
                  Aplicar
                </button>
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                {discountApplied && (
                  <div className="summary-row discount">
                    <span>Descuento (25%):</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                className="checkout-button"
                style={{ backgroundColor: theme.primary }}
              >
                Proceder al Pago
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <span className="material-icons">shopping_cart</span>
            <p>Tu carrito está vacío</p>
            <button 
              onClick={() => window.location.href = '/products'}
              style={{ backgroundColor: theme.secondary }}
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;