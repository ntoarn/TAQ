import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative">
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide overflow-hidden relative"
      >
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <div className="container mx-auto p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="order-last md:order-first mx-auto">
                  <img
                    className="w-full"
                    src="https://product.hstatic.net/1000391653/product/newk023.2_1f5c8e2fce044b2d869a53024ae82bda.jpg"
                    alt="Iphone 15promax"
                  />
                </div>
                <div className="flex items-center">
                  <div className="text-left">
                    <h1 className="text-3xl text-green-500 font-bold">
                      Eye Plus
                    </h1>
                    <h3 className="text-2xl ">Thiết kế sang trọng</h3>
                    <p className="text-gray-600">
                      Eye Plus màu sắc sang chảnh, cháy túi. Thiết kế khung viền
                      titan nhẹ hơn, bền hơn{" "}
                      <Link
                        to=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500"
                      >
                        TAQ Store
                      </Link>{" "}
                      website. Wi-Fi 6E tốc độ kết nối mạng không dây nhanh gấp
                      2.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item relative float-left w-full">
            <div className="container mx-auto p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="order-last md:order-first mx-auto">
                  <img
                    className="w-full"
                    src="https://www.apple.com/v/macbook-air/s/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png"
                    alt="Macbook Air M2"
                  />
                </div>
                <div className="flex items-center">
                  <div className="text-left">
                    <h1 className="text-3xl">Macbook Air M2</h1>
                    <h3 className="text-2xl">
                      Thiết kế mỏng nhẹ, tinh tế đến từng chi tiết
                    </h3>
                    <p className="text-gray-600">
                      Hiệu năng <strong>cực khủng với chip M2</strong> hàng đầu
                      và bộ nhớ 256GB. Màn hình “tai thỏ” độc đáo, hiển thị hình
                      ảnh sắc nét.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item relative float-left w-full">
            <div className="container mx-auto p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="order-last md:order-first mx-auto">
                  <img
                    className="w-full"
                    src="https://i.ytimg.com/vi/Nvb_Kta7v6U/maxresdefault.jpg"
                    alt="Apple Watch Series 9"
                  />
                </div>
                <div className="flex items-center">
                  <div className="text-left">
                    <h1 className="text-3xl">
                      Đồng hồ thông minh Apple Watch Series 9
                    </h1>
                    <h3 className="text-2xl">Apple Watch Series 9</h3>
                    <p className="text-gray-600">
                      Apple Watch Series 9 có thiết kế góc cạnh hiện đại và đẳng
                      cấp. Apple Watch Series 9 với công nghệ hiển thị cao cấp.
                      Thank you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
          role="button"
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide="prev"
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="text-blue-500" size={30} />
        </button>
        <button
          className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
          role="button"
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide="next"
        >
          <span className="sr-only">Next</span>
          <FaChevronRight className="text-blue-500" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
