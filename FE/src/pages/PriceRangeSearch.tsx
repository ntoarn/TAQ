// src/pages/PriceRangeSearch.tsx
import { useState } from "react";
import instance from "../apis";
import { Product } from "../interfaces/Product";
import { Link } from "react-router-dom";

const PriceRangeSearch: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      if (minPrice === "" || maxPrice === "" || minPrice > maxPrice) {
        setError("Vui lòng nhập phạm vi giá hợp lệ.");
        return;
      }

      const key = `${minPrice}-${maxPrice}`;
      const { data } = await instance.get(`/products/price-range/${key}`);
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError("An error occurred while fetching the products.");
      setProducts([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Tìm kiếm sản phẩm theo phạm vi giá
      </h1>
      <div className="mb-4">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value) || "")}
          placeholder="Giá tối thiểu"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
          placeholder="Giá tối đa"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Tìm kiếm
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-wrap mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6"
            >
              <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "https://picsum.photos/536/354"}
                    alt={product.title}
                    className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-gray-600 mb-1">
                    {product.categoryId?.name}
                  </p>
                  <h5 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h5>
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-gray-800 mr-2">
                      ${product.price}
                    </span>
                    {product.colorId?.color && (
                      <span className="text-sm text-gray-500">
                        {product.colorId?.color}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-grow truncate">
                    {product.description}
                  </p>
                  <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-white hover:text-black border border-blue-600 transition-colors duration-300">
                    <Link to={`/product-detail/${product._id}`}>
                      Xem sản phẩm
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào trong phạm vi giá này.</p>
        )}
      </div>
    </div>
  );
};

export default PriceRangeSearch;
