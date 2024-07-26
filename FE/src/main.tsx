import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import "./assets/js/index.js";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
