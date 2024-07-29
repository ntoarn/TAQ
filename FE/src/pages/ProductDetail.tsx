// pages/ProductDetail.tsx
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../apis";
import { Product } from "../interfaces/Product";
import ProductCart from "./ProdcutCart";
import { ProductContext } from "../contexts/ProductContext";
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { state } = useContext(ProductContext)
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
                  <div className="mrp text-gray-500">M.R.P. : $2,999.00</div>
                  <div className="gi-single-desc mb-3 text-gray-500 text-sm tracking-tight break-all leading-6 font-Poppins">
                    {product.description}
                  </div>
                  <div className="gi-single-list">
                    <ul className="ml-4">
                      <li className="list-disc text-gray-500">
                        <strong className="text-gray-500">Color</strong> :{" "}
                        {product.colorId}
                      </li>
                      <li className="list-disc text-gray-500">
                        <strong className="text-gray-500">Sole</strong> : Blue
                      </li>
                      <li className="list-disc text-gray-500">
                        <strong className="text-gray-500">Width</strong> : Blue
                      </li>
                    </ul>
                  </div>
                  <div className="mb-5 m-5">
                    Color
                    <div>
                      <ul className="mt-4">
                        <li className="h-5 font-normal transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer flex items-center justify-center text-xs leading-5 border border-solid border-gray-200 float-left rounded-md">
                          Blue
                        </li>
                        <li className="h-5 font-normal transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer flex items-center justify-center text-xs leading-5 border border-solid border-gray-200 float-left rounded-md">
                          Black
                        </li>
                        <li className="h-5 font-normal transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer flex items-center justify-center text-xs leading-5 border border-solid border-gray-200 float-left rounded-md">
                          Gray
                        </li>
                        <li className="h-5 font-normal transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer flex items-center justify-center text-xs leading-5 border border-solid border-gray-200 float-left rounded-md">
                          Yellow
                        </li>
                      </ul>
                    </div>
                    <div className="gi-single-qty flex flex-wrap w-full mt-10 m-[-5px]">
                      <div className="qty-plus-minus w-30 h-10 p-2 border border-solid border-gray-200 overflow-hidden m-1 relative flex items-center justify-between rounded-md">
                        <button className="dec gi-qtybtn text-xl bg-gray-300 px-3 py-1 rounded-l-md">
                          -
                        </button>
                        <input
                          className="qty-input w-12 text-center border-none focus:ring-0"
                          name="ms_qtybtn"
                          type="text"
                          value="1"
                        />
                        <button className="inc gi-qtybtn text-xl bg-gray-300 px-3 py-1 rounded-r-md">
                          +
                        </button>
                      </div>
                      <div className="gi-single-cart">
                        <button
                          className="btn btn-primary gi-btn-1 flex h-10 leading-12 text-center text-sm m-1 py-2 px-4 uppercase justify-center bg-gray-700 text-white transition-all duration-300 ease-in-out relative rounded-md items-center min-w-[160px] font-semibold tracking-tight border-0 hover:bg-green-600 hover:text-white"
                          type="button"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sản phẩm tương tự */}
                <div className="my-10 ">
                  <div className="flex flex-wrap m-[-15px]">
                    {state.products.map((product) => (
                      <ProductCart key={product._id} product={product} />
                    ))}
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
