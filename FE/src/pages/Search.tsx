import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../apis";
import { Product } from "../interfaces/Product";

const ProductSearch: React.FC = () => {
  const { searchKey } = useParams<{ searchKey: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get(`/products/search/${searchKey}`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          throw new Error("Invalid data format");
        }
        setError(null);
      } catch (err: any) {
        setError("An error occurred while fetching the products.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchKey]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h1>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-white hover:text-black border border-blue-600 transition-colors duration-300">
                <Link
                  to={`/product-detail/${product._id}`}
                  className="flex items-center justify-center"
                >
                  Xem sản phẩm
                </Link>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-2 text-center">
            Không tìm thấy sản phẩm.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
