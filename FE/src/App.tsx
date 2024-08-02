import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/AuthForm/Login";
import Register from "./components/AuthForm/Register";
import LayoutAdmin from "./components/Layout/LayoutAdmin/LayoutAdmin";
import LayoutClient from "./components/Layout/LayoutClient/LayoutClient";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/admin/Dashboard";
import ListCategory from "./pages/admin/ListCategory";
import ListProduct from "./pages/admin/ListProduct";
import ProductForm from "./pages/admin/ProductForm";
import User from "./pages/admin/User";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import ThankYou from "./pages/ThankYou";
import CategoryForm from "./pages/admin/CategoryForm";
import OrderAdmin from "./pages/admin/OrderAdmin";

function App() {
  return (
    <>
      <Routes>
        {/* client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/thankyou" element={<ThankYou />} />

          <Route
            path="/product-detail/:id"
            element={<ProductDetail />}
          />
          <Route path="/users/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users/login" element={<Login />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product/edit/:id" element={<ProductForm />} />
          <Route path="/admin/category" element={<ListCategory />} />
          <Route path="/admin/categories-add" element={<CategoryForm />} />
          <Route path="/admin/categories/edit/:id" element={<CategoryForm />} />
  

          <Route path="/admin/order" element={<OrderAdmin />} />
          <Route path="/admin/users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
