import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import the Provider from react-redux
import store from './redux/store'; // Import the Redux store

// Render the root component with StrictMode, BrowserRouter, and Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap the app with Redux Provider */}
      <BrowserRouter>  {/* Wrap the app with BrowserRouter for routing */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
