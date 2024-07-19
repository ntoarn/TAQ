import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-black" id="tempaltemo_footer">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="pt-5">
              <h2 className="text-green-500 border-b pb-3 border-white logo">
                TAQ Store
              </h2>
              <ul className="text-white mt-4">
                <li className="flex items-center my-2">
                  <i className="fas fa-map-marker-alt fa-fw"></i>
                  <span className="ml-2">123 Consectetur at ligula 10660</span>
                </li>
                <li className="flex items-center my-2">
                  <i className="fa fa-phone fa-fw"></i>
                  <a href="tel:010-020-0340" className="ml-2 text-white">
                    010-020-0340
                  </a>
                </li>
                <li className="flex items-center my-2">
                  <i className="fa fa-envelope fa-fw"></i>
                  <a href="mailto:info@company.com" className="ml-2 text-white">
                    info@taqstore.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <h2 className="text-white border-b pb-3 border-white">
                Sản phẩm
              </h2>
              <ul className="text-white mt-4">
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Cao cấp
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Kính chống tia UV
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Kính cận
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Kính thời trang
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Popular Dress
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Gym Accessories
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Sport Shoes
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <h2 className="text-white border-b pb-3 border-white">
                Thông tin thêm
              </h2>
              <ul className="text-white mt-4">
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Trang chủ
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Giới thiệu
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Địa chỉ cửa hàng
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    FAQs
                  </a>
                </li>
                <li className="my-2">
                  <a href="#" className="text-white hover:text-gray-400">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white py-4 mt-4">
            <ul className="flex space-x-4 mb-4 md:mb-0">
              <li className="rounded-full border border-white flex items-center justify-center w-10 h-10">
                <Link
                  to="http://facebook.com/"
                  target="_blank"
                  className="text-white"
                >
                  <FiFacebook size={33} />
                </Link>
              </li>
              <li className="rounded-full border border-white flex items-center justify-center w-10 h-10">
                <Link
                  to="https://www.instagram.com/"
                  target="_blank"
                  className="text-white"
                >
                  <FaInstagram size={33} />
                </Link>
              </li>
              <li className="rounded-full border border-white flex items-center justify-center w-10 h-10">
                <Link
                  to="https://twitter.com/"
                  target="_blank"
                  className="text-white"
                >
                  <FiTwitter size={33} />
                </Link>
              </li>
              <li className="rounded-full border border-white flex items-center justify-center w-10 h-10">
                <Link
                  to="https://www.linkedin.com/"
                  target="_blank"
                  className="text-white"
                >
                  <FiLinkedin size={33} />
                </Link>
              </li>
            </ul>

            <div className="flex items-center">
              <input
                type="text"
                className="bg-black border border-white px-3 py-1 text-white focus:outline-none"
                id="subscribeEmail"
                placeholder="Email address"
              />
              <button className="bg-green-500 ml-2 py-1 px-3 text-white">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="bg-black py-3">
          <div className="container mx-auto text-center text-white">
            <p className="mb-0">
              Copyright &copy; 2024 TAQ Store | Designed by{" "}
              <Link
                to=""
                rel="sponsored"
                target="_blank"
                className="text-green-500"
              >
                TAQ
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
