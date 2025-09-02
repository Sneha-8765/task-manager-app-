import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import '../styles.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/signup', { email, password });
      navigate('/login');
    } catch (err) {
      setError('Signup failed: ' + (err.response?.data?.message || 'Try again'));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
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
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;