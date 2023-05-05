import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from './App.tsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() =>
      navigator.serviceWorker.ready.then(worker => {
        console.log(worker);

        // worker.sync.register('syncdata');
      }),
    )
    .catch(err => console.log(err));
}

const app = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
