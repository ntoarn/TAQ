// pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../apis";
import { Product } from "../interfaces/Product";
import { useCart } from "../contexts/CartContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

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
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Ensure quantity is not less than 1
  };
  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
      setSuccessMessage("Sản phẩm đã được thêm vào giỏ hàng!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/cart");
      }, 2000);
    }
  };

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
            <div className="gi-single-qty flex flex-wrap w-full mt-10 m-[-5px]">
              <div className="qty-plus-minus w-30 h-10 p-2 border border-solid border-gray-200 overflow-hidden m-1 relative flex items-center justify-between rounded-md">
                <button
                  className="dec gi-qtybtn text-xl bg-gray-300 px-3 py-1 rounded-l-md"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  className="qty-input w-12 text-center border-none focus:ring-0"
                  name="ms_qtybtn"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button
                  className="inc gi-qtybtn text-xl bg-gray-300 px-3 py-1 rounded-r-md"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <div className="gi-single-cart">
                <button
                  className="btn btn-primary gi-btn-1 flex h-10 leading-12 text-center text-sm m-1 py-2 px-4 uppercase justify-center bg-gray-700 text-white transition-all duration-300 ease-in-out relative rounded-md items-center min-w-[160px] font-semibold tracking-tight border-0 hover:bg-green-600 hover:text-white"
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
              {successMessage && (
                <div className="text-green-500 mt-4">{successMessage}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
