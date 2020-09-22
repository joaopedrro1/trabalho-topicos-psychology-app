import React from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer autoClose={5000} />
      </AuthProvider>
    </BrowserRouter>
  );
};


export default App;
