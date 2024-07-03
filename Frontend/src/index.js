import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './SpringSecurityComponents/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  // <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <UserContextProvider value={{ /* Initial context value */ }}>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
