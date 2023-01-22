import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ProSidebarProvider} from 'react-pro-sidebar'
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <ProSidebarProvider>
            <App />
        </ProSidebarProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

