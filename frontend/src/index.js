import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
axios.defaults.withCredentials = true;
ReactDOM.render(
  <Router>
    <AuthProvider>
      
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

