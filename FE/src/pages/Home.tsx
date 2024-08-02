import { Link } from "react-router-dom";
import { Product } from "./../interfaces/Product";
import Banner from "./Banner";
import "../App.scss";
import { useContext } from "react";
import { ProductContext } from './../contexts/ProductContext';

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";



const Home = () => {
  const { state } = useContext(ProductContext)
  const productsToShow = state.products.slice(0, 4);

  const trendingProducts = state.products;
  return (
    <>
      {/* banner */}
      <Banner />
      {/* san pham */}
      <div className="container mt-4 w-[1440px] mx-auto px-4">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Sản phẩm bán chạy
        </h1>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {productsToShow.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="flex flex-col mb-4">
                <div className="custom-card shadow-sm h-full">
                  <Link to={`/product-detail/${product._id}`}>
                    <div className="card-img-top-container">
                      <img
                        src={product.image}
                        className="custom-img"
                        alt={product.title}
                      />
                    </div>
                  </Link>
                  <div className="card-body p-4">
                    <h5 className="card-title text-lg font-semibold mb-2">
                      {product.title}
                    </h5>
                    <p className="card-text text-gray-600 text-truncate mb-2">
                      {product.description}
                    </p>
                    <p className="card-text text-gray-900 mb-2">
                      <strong>Giá:</strong> {product.price}
                    </p>
                    <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                      <Link to={`/product-detail/${product._id}`}>
                        Xem sản phẩm
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-full h-[440px] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover py-4"
          src="https://bizweb.dktcdn.net/100/082/372/themes/773854/assets/banner_03.jpg?1713421051132"
          alt="Banner 2"
        />
      </div>
      {/* Xu hướng thịnh hành */}
      <div className="container mt-4 w-[1440px] mx-auto px-4">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Xu hướng thịnh hành
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingProducts.map((product) => (
            <div
              className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
              key={product._id}
            >
              <Link to={`/product-detail/${product._id}`}>
                <img
                  src={product.image}
                  className="w-full h-48 object-cover"
                  alt={product.title}
                />
              </Link>
              <div className="p-4">
                <h5 className="text-lg font-semibold mb-2">{product.title}</h5>
                <p className="text-gray-600 text-truncate mb-2">
                  {product.description}
                </p>
                <p className="text-gray-900 mb-2">
                  <strong>Giá:</strong> {product.price}
                </p>
                <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                  <Link to={`/product-detail/${product._id}`}>
                    Xem sản phẩm
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
