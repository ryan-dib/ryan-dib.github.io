import React, { useState } from 'react';
import axios from 'axios';  // Import axios

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit handle")

    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    setError('');
    setLoading(true);  // Show loading state

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      // Handle successful login
      const { token, user } = response.data;

      // Save the token to localStorage (or your preferred storage method)
      localStorage.setItem('authToken', token);

      // Optionally, store user data if needed
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect user to the home page (or dashboard)
      window.location.href = '/';  // Redirect to home page or dashboard

    } catch (err) {
      // Handle error
      setError('Invalid email or password');
    } finally {
      setLoading(false);  // Hide loading state after request is done
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-textbox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-textbox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <p className="login-p">
            Don't have an account? <a href="/register">Register here</a>
          </p>
          <a href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
