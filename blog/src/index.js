import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/Context';
import { ThemeProvider } from './context/ThemeContext';
import './theme.css';
import axios from 'axios';

// Use proxy in development; only set baseURL for production builds
if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

// Add JWT token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401/403 responses (token expired or invalid)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired, clear it and redirect to login
      const message = error.response?.data?.message;
      if (message && (message.includes('token') || message.includes('Token'))) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);