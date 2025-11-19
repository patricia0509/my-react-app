import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        padding: '1rem 2rem',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Dicoding Forum
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <>
              <Link
                to="/create-thread"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                }}
              >
                Create Thread
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;