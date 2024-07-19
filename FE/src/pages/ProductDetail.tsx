import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../apis";
import { Product } from "../interfaces/Product";

type Props = {
  products: Product[];
};

const ProductDetail = ({}: Props) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    image: "",
    title: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [id]);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Chi tiết sản phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            className="max-w-full h-auto rounded-lg"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-4">Giá: {product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
