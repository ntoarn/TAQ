// pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../apis";
import { Product } from "../interfaces/Product";
import ProductCart from "./ProductCart";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.data);
        const relatedRes = await instance.get(`/products?relatedTo=${id}`);
        setRelatedProducts(relatedRes.data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 py-6 max-w-screen-lg mx-auto">
      <div className="w-full px-4 py-6 border-t border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Product Detail Page
          </h2>
          <ul className="text-right text-sm">
            <li className="inline">
              <a href="/" className="text-blue-600 hover:underline">
                Home &gt;{" "}
              </a>
            </li>
            <li className="inline">Product Detail Page</li>
          </ul>
        </div>
      </div>

      <section className="py-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/3 p-4 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full mx-auto my-4 max-w-xs lg:max-w-sm"
            />
          </div>
          <div className="w-full lg:w-2/3 p-4">
            <h5 className="text-2xl font-semibold text-gray-700 mb-4">
              {product.title}
            </h5>
            <div className="text-xl font-bold text-gray-800 mb-2">
              ${product.price}
              <span className="ml-4 text-green-600 text-lg font-medium">
                -78%
              </span>
            </div>
            <div className="text-gray-500 mb-4">M.R.P. : $2,999.00</div>
            <div className="text-sm text-gray-600 mb-4">
              {product.description}
            </div>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>
                <strong>Color:</strong> {product.colorId?.color}
              </li>
              <li>
                <strong>Sole:</strong> Blue
              </li>
              <li>
                <strong>Width:</strong> Blue
              </li>
            </ul>
            <div className="mb-6">
              <div className="flex space-x-2">
                <span>Color:</span>
                {["Blue", "Black", "Gray", "Yellow"].map((color) => (
                  <span
                    key={color}
                    className="px-2 py-1 border border-gray-300 rounded cursor-pointer"
                  >
                    {color}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex border border-gray-300 rounded">
                  <button className="px-3 py-1 text-lg bg-gray-200">-</button>
                  <input
                    className="w-12 text-center border-none"
                    type="text"
                    value="1"
                    readOnly
                  />
                  <button className="px-3 py-1 text-lg bg-gray-200">+</button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Related Products
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
                  <ProductCart product={relatedProduct} />
                  <div className="mt-4">
                    <a
                      href={`/product-detail/${relatedProduct._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Xem sản phẩm
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
