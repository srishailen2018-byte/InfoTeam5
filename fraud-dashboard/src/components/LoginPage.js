import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
      
      if (isLogin) {
        onLoginSuccess(res.data.email);
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImageUrl = '/fraud-bg.jpg';

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    }}>
      {/* Left Side: Form */}
      <div style={{
        flex: '0 0 50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '2rem',
        zIndex: 50
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '3rem 2.5rem',
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#00f3ff',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#000',
              boxShadow: '0 0 20px rgba(0, 243, 255, 0.5)'
            }}>F</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              {isLogin ? 'Enter your credentials to access FraudShield' : 'Join FraudShield to monitor transactions'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.625rem' }}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.125rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#94a3b8', marginBottom: '0.625rem' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.125rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '0.875rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0.75rem',
                color: '#f87171',
                fontSize: '0.875rem'
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glow-button"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#00f3ff',
                color: '#000',
                border: 'none',
                borderRadius: '1rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                marginTop: '0.5rem',
                boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)'
              }}
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00f3ff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: '0.25rem'
                }}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div style={{
        flex: '0 0 50%',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.2)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '2rem'
      }}>
        {/* Glowing Frame for Image */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          right: '2rem',
          bottom: '2rem',
          border: '2px solid #00f3ff',
          boxShadow: '0 0 20px rgba(0, 243, 255, 0.5), inset 0 0 20px rgba(0, 243, 255, 0.3)',
          borderRadius: '1rem',
          pointerEvents: 'none',
          opacity: 0.6
        }}></div>

        {/* Decorative Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.4) 100%)',
          pointerEvents: 'none'
        }}></div>
      </div>
    </div>
  );
};

export default LoginPage;
