import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from './App.tsx';

const app = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
