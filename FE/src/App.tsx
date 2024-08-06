import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LayoutAdmin from "./components/Layout/LayoutAdmin/LayoutAdmin";
import LayoutClient from "./components/Layout/LayoutClient/LayoutClient";
import AboutUs from "./pages/AboutUs";
import CategoryForm from "./pages/admin/CategoryForm";
import Dashboard from "./pages/admin/Dashboard";
import ListCategory from "./pages/admin/ListCategory";
import ListProduct from "./pages/admin/ListProduct";
import ListUser from "./pages/admin/ListUser";
import OrderAdmin from "./pages/admin/OrderAdmin";
import ProductForm from "./pages/admin/ProductForm";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import ThankYou from "./pages/ThankYou";
import AuthForm from "./components/AuthForm/AuthForm";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./pages/admin/MyProfile";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/myprofile/:id" element={<MyProfile />} />
          <Route
            path="/product-detail/:id"
            element={<ProductDetail />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthForm isLogin />} />
          <Route path="/register" element={<AuthForm />} />
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
          <Route path="/admin/users" element={<ListUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
