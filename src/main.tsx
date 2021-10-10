import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare global {
  interface Window {
    bodyWidth: number;
    bodyHeight: number;
  }
}

window.bodyWidth = document.body.clientWidth;
window.bodyHeight = document.body.clientHeight;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
