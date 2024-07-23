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
      <section className="pt-[10%]">
        <div className="mx-[-12px]">
          <div className="flex flex-wrap w-[80%] m-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="min-[1200px]:w-[25%] min-[992px]:w-[33.33%] min-[768px]:w-[50%] 
                min-[576px]:w-[50%] max-[420px]:w-full px-[12px] gi-product-box max-[575px]:w-[50%] max-[575px]:mx-auto pro-gl-content"
              >
                <div className="gi-product-content pb-[24px] h-full flex">
                  <div className="gi-product-inner transition-all duration-[0.3s] ease-in-out cursor-pointer flex flex-col overflow-hidden border-[1px] border-solid border-[#eee] rounded-[5px]">
                    <div className="gi-pro-image-outer transition-all duration-[0.3s] ease delay-[0s] z-[11] relative">
                      <div className="gi-pro-image overflow-hidden">
                        <img
                          src={product.image || "https://picsum.photos/536/354"}
                          alt={product.title}
                          className="image relative block overflow-hidden pointer-events-none transition-all duration-[0.3s] ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="gi-pro-content h-full p-[20px] relative z-[10] flex flex-col text-left border-t-[1px] border-solid border-[#eee]">
                      <a className="text-[#4b5966] text-[12px]">
                        {product.categoryId?.name}
                      </a>
                      <h5 className="font-Poppins">{product.title}</h5>
                      <div>
                        <span
                          className="new-price text-[#4b5966] font-bold text-[14px] mr-[7px]
                            tracking-[0.02rem]"
                        >
                          ${product.price}
                        </span>
                        {product.color && (
                          <span className="text-[14px] text-[#777] tracking-[0.02rem]">
                            {product.color}
                          </span>
                        )}
                      </div>
                      <p>{product.description}</p>
                      <button className="px-4 py-2 rounded-[7px] bg-blue-600 hover:bg-white text-white hover:text-black ">
                        <Link to={`/product-detail/${product._id}`}>
                          Xem sản phẩm
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
