// pages/ProductDetail.tsx
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { ProductContext } from "../contexts/ProductContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../hooks/useStorage";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import instance from "../apis";
const ProductDetail = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth();
  const userId = user?._id;

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { state } = useContext(ProductContext)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        console.log('Fetched Product:', data.data); // Kiểm tra dữ liệu trả về
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  
  const { mutate } = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
      const { data } = await instance.post(`/cart/add-to-cart`, {
        userId,
        productId,
        quantity
      })
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      })
      toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
    },
    onError: () => {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại!. Vui lòng thử lại.");
    },
  })
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
      <section className="gi-single-product py-10 md:py-8">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-[1600px] md:max-w-[1320px] lg:max-w-[1140px] xl:max-w-[960px]">
          <div className="flex flex-wrap w-full px-3">
            <div className="gi-pro-rightside gi-common-rightside w-full">
              <div className="flex flex-wrap w-full">
                {/* Cột 1/3 */}
                <div className="w-1/3 p-4 border text-center">
                  <img
                    className="text-center mx-auto my-7"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                {/* Cột 2/3 */}
                <div className="single-pro-desc single-pro-desc-no-sidebar w-2/3 max-[991px]:w-full relative pl-3 max-[991px]:pl-0 max-[991px]:mt-8">
                  <h5 className="gi-single-title text-gray-700 text-xl capitalize mb-5 block font-Poppins font-medium leading-9 tracking-tight md:text-lg md:leading-8">
                    {product.title}
                  </h5>
                  <div className="final-price mb-4 text-gray-700 font-semibold text-xl leading-8 font-Poppins tracking-tight md:text-lg">
                    {product.price}
                    <span className="price-des ml-4 text-green-600 font-medium text-lg tracking-tight">
                      -78%
                    </span>
                  </div>
                  <div className="gi-single-desc mb-3 text-gray-500 text-sm tracking-tight break-all leading-6 font-Poppins ">
                    {product.description}
                  </div>
                  {/* <div className="gi-single-desc mb-3 text-gray-500 text-sm tracking-tight break-all leading-6 font-Poppins ">
                    Danh mục: {product.categoryId?.name}
                  </div>
                  <div className="gi-single-desc mb-3 text-gray-500 text-sm tracking-tight break-all leading-6 font-Poppins ">
                    Màu: {product.colorId?.color} 
                  </div>
                  <div className="gi-single-desc mb-3 text-gray-500 text-sm tracking-tight break-all leading-6 font-Poppins ">
                    Kích cỡ: {product.sizeId?.size} 
                  </div> */}
                  <div className="gi-single-list">
                    <ul className="ml-4">
                      {product.colorId && (
                        <li className="list-disc text-gray-500">
                          <strong className="text-gray-500">Màu sắc: {product.colorId.color}</strong>
                        </li>
                      )}
                      {product.sizeId && (
                        <li className="list-disc text-gray-500">
                          <strong className="text-gray-500">Kích cỡ: {product.sizeId.size}</strong>
                        </li>
                      )}
                      {product.categoryId && (
                        <li className="list-disc text-gray-500">
                          <strong className="text-gray-500">Danh mục: {product.categoryId.name}</strong>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="mb-5 m-5">
                    <div className="gi-single-qty flex flex-wrap w-full mt-10 m-[-5px]">

                      <div className="gi-single-cart">
                        <button
                          className="btn btn-primary gi-btn-1 flex h-10 leading-12 text-center text-sm m-1 py-2 px-4 uppercase justify-center bg-blue-500 text-white transition-all duration-300 ease-in-out relative rounded-md items-center min-w-[160px] font-semibold tracking-tight border-0 hover:bg-blue-600 hover:text-white"
                          type="button"
                          onClick={() =>
                            mutate({ productId: product._id!, quantity: 1 })
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sản phẩm tương tự */}
                {/* <div className="my-10 ">
                <div className="flex flex-wrap m-[-15px]">
                  {state.products.map((product) => (
                    <ProductCart key={product._id} product={product} />
                  ))}
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
