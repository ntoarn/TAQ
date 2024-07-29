import { useEffect, useState } from "react";
import { instance } from "../apis";
import { Product } from "../interfaces/Product";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <section className="pt-10">
        <div className="flex flex-wrap w-4/5 mx-auto">
          {products.map((product) => (
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
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
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
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;