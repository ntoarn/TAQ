import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../apis";
import { Product } from "../interfaces/Product";

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = new URLSearchParams(location.search).get("query");
      if (query) {
        const { data } = await instance.get(`/products/search?query=${query}`);
        setProducts(data.data);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">Kết quả tìm kiếm</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg">
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500">{product.price} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
