import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ProSidebarProvider} from 'react-pro-sidebar'
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProSidebarProvider>
          <App />
      </ProSidebarProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

