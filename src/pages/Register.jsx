import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);

      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the email already exists
      const existingUser = users.find((user) => user.email === formData.email);
      if (existingUser) {
        setError('Email already exists');
        return;
      }

      // Save the new user
      users.push({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('users', JSON.stringify(users));

      // Redirect to login
      navigate('/Login');
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <p>
        Already have an account? <a href="/Register/login">Login</a>
      </p>
    </div>
  );
};

export default RegisterForm;