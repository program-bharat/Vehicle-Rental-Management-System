import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "./rtk/store.js"
import App from './App.jsx'

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="colored"
          toastStyle={{
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: "200",
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)