// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// src/main.jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Register Service Worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(reg => console.log('SW registered:', reg.scope))
//       .catch(err => console.error('SW failed:', err));
//   });
// }
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("SW registered"))
      .catch(err => console.error("SW failed", err));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);