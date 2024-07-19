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

function App() {
  const nav = useNavigate();
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [categories, SetCategories] = useState<ICategory[]>([] as ICategory[]);
  const fetchProducts = async () => {
    const { data } = await instance.get("/products");
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchCategories = async () => {
    const { data } = await instance.get("/categories");
    SetCategories(data.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleRemove = async (id: String) => {
    if (window.confirm("Ban chac chua???")) {
      try {
        await instance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSubmitProduct = async (product: Product) => {
    try {
      if (product._id) {
        await instance.patch(`/products/${product._id}`, product);
      } else {
        const res = await instance.post("/products/", product);
        setProducts([...products, res.data.data]);
      }
      fetchProducts();
      nav("/admin");
    } catch (error) {
      console.error("Failed to submit product:", error);
    }
  };
  // order
  // const Order = () => {
  //   const [orders, setOrders] = useState(ordersData);

  //   const handleDelete = (id: string) => {
  //       setOrders(orders.filter(order => order._id !== id));
  //   };

  //   const handleEdit = (id: string) => {
  //       // Logic để chỉnh sửa đơn hàng
  //       console.log('Edit order with id:', id);
  //   };

  return (
    <>
      <Routes>
        {/* client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home products={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/product-detail/:id"
            element={<ProductDetail products={products} />}
          />
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
                onDel={handleRemove}
                categories={categories}
                products={products}
              />
            }
          />
          <Route
            path="/admin/product-add"
            element={<ProductForm onSubmit={handleSubmitProduct} />}
          />
          <Route
            path="/admin/product/edit/:id"
            element={<ProductForm onSubmit={handleSubmitProduct} />}
          />
          <Route
            path="/admin/category"
            element={<ListCategory categories={categories} />}
          />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
