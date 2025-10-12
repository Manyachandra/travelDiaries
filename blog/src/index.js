import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/Context';
import { ThemeProvider } from './context/ThemeContext';
import './theme.css';
import axios from 'axios';

// In production, send API requests to REACT_APP_API_BASE_URL
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

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