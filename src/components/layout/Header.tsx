import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-dark text-white p-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">My App</h1>
        <nav>
          <Link to="/" className="text-white me-3">Home</Link>
          {user ? (
            <>
              <Link to="/report" className="text-white me-3">Reports</Link>
              <Link to="/profile" className="text-white me-3">Profile</Link>
              <button onClick={logout} className="btn btn-outline-light btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white me-3">Login</Link>
              <Link to="/register" className="text-white">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;