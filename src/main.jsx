import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './style/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   {/* <React.StrictMode> */}
    <App />
   {/* </React.StrictMode> */}
  </BrowserRouter>
);
