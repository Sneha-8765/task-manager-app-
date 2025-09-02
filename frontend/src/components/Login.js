import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import '../styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || 'Invalid credentials'));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;