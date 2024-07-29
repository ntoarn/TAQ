import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import "./assets/js/index.js";
import { CartProvider } from "./contexts/CartContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
