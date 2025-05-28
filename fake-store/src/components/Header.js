import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          FakeStore
        </Link>
        <ul className="nav-links">
          <li><Link to="/products">Productos</Link></li>
          {!user && (
            <>
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
            </>
          )}
          {user && (
            <>
              <li>Hola, {user.email}</li>
              <li><button onClick={logout}>Cerrar sesión</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
