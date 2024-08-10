import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from './../contexts/ProductContext';
import Banner from "./Banner";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = () => {
  const { state } = useContext(ProductContext);
  const productsToShow = state.products.slice(0, 4);
  const trendingProducts = state.products;

  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Sản phẩm bán chạy */}
      <div className="container mx-auto px-4 mt-4 max-w-7xl">
        <h1 className="text-center text-2xl font-bold mb-4">
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
              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <Link to={`/product-detail/${product._id}`}>
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover"
                    alt={product.title}
                  />
                </Link>
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2">{product.title}</h5>
                  <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
                  <p className="text-gray-900 mb-2">
                  <span className="text-gray-800">{product.price?.toLocaleString()}</span>
                  <span className="text-gray-600 text-base"> VNĐ</span>
                  </p>
                  <Link to={`/product-detail/${product._id}`}>
                    <button className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                      Xem sản phẩm
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Banner 2 */}
      <div className="relative w-full h-96 overflow-hidden mt-4">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://bizweb.dktcdn.net/100/082/372/themes/773854/assets/banner_03.jpg?1713421051132"
          alt="Banner 2"
        />
      </div>

      {/* Xu hướng thịnh hành */}
      <div className="container mx-auto px-4 mt-4 max-w-7xl">
        <h2 className="text-center text-2xl font-bold mb-4">
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
                <p className="text-gray-600 text-sm mb-2 truncate ">{product.description}</p>
                <p className="text-gray-900 mb-2">
                <span className="text-gray-800">{product.price?.toLocaleString()}</span>
                <span className="text-gray-600 text-base"> VNĐ</span> 
                </p>
                <Link to={`/product-detail/${product._id}`}>
                  <button className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                    Xem sản phẩm
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
