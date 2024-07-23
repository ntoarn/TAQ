import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { instance } from "./apis";
import "./App.scss";
import Login from "./components/AuthForm/Login";
import Register from "./components/AuthForm/Register";
import LayoutAdmin from "./components/Layout/LayoutAdmin/LayoutAdmin";
import { ICategory } from "./interfaces/Category";
import { Product } from "./interfaces/Product";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ListCategory from "./pages/admin/ListCategory";
import LayoutClient from "./components/Layout/LayoutClient/LayoutClient";
import Order from "./pages/admin/Order";
import User from "./pages/admin/User";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import CategoryForm from "./pages/admin/CategoryForm";
import ListProduct from "./pages/admin/ListProduct";

function App() {
  return (
    <>
      <Routes>
        {/* client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home  />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />

          {/* <Route
            path="/product-detail/:id"
            element={<ProductDetail products={products} />}
          /> */}
          <Route path="/users/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users/login" element={<Login />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route
            index
            element={
              <Dashboard
              />
            }
          />
          <Route path="/admin/product" element={<ListProduct/>}/>
          <Route
            path="/admin/product-add"
            element={<ProductForm />}
          />
          <Route
            path="/admin/product/edit/:id"
            element={<ProductForm/>}
          />
          <Route
            path="/admin/category"
            element={<ListCategory />}
          />
           {/* <Route
            path="/admin/categories-add"
            element={<CategoryForm/>}
          />
          <Route
            path="/admin/categories/edit/:id"
            element={<CategoryForm />}
          /> */}
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
