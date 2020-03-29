import React from 'react';
import { ToastProvider } from 'react-toast-notifications'

import Routes from './pages/routes'
import './global.css';

function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
