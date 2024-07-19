import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user && user.user && user.user.email ? user.user.email : null;

  const logout = () => {
    if (window.confirm("Đăng xuất?")) {
      localStorage.removeItem("user");
      toast.success("Đăng xuất thành công");
      nav("/");
    }
  };

  return (
    <>
      <header>
        {/* Top Navbar */}
        <nav className="p-4 bg-black hidden lg:block">
          <div className="container mx-auto text-white flex justify-between items-center">
            <div className="flex items-center">
              <FiMail className="mx-2" />
              <Link to="mailto:nqton301004@gmail.com" className="no-underline">
                taqstore@gmail.com
              </Link>
              <FiPhone className="mx-2" />
              <Link to="tel:098-382-7425" className="no-underline">
                098-382-7425
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="https://fb.com/templatemo"
                target="_blank"
                rel="sponsored"
                className="mx-2"
              >
                <FiFacebook />
              </Link>
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                className="mx-2"
              >
                <FiInstagram />
              </Link>
              <Link to="https://twitter.com/" target="_blank" className="mx-2">
                <FiTwitter />
              </Link>
              <Link
                to="https://www.linkedin.com/"
                target="_blank"
                className="mx-2"
              >
                <FiLinkedin />
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Navbar */}
        <nav className="bg-white shadow">
          <div className="container mx-auto flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                TAQ
              </Link>
            </div>
            <div className="flex justify-center items-center text-xl flex-grow">
              <ul className="flex mx-auto">
                <li className="mr-6">
                  <Link to="/" className="text-gray-800 hover:text-gray-900">
                    Trang chủ
                  </Link>
                </li>
                <li className="mr-6">
                  <Link to="/" className="text-gray-800 hover:text-gray-900">
                    Danh mục
                  </Link>
                </li>
                <li className="mr-6">
                  <Link to="/" className="text-gray-800 hover:text-gray-900">
                    Sản phẩm
                  </Link>
                </li>
                <li className="mr-6">
                  <Link to="/">Giới thiệu</Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              {/* Icons */}
              <div className="flex items-center">
                <div className="relative hidden lg:block">
                  <input
                    type="text"
                    className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg py-1 px-3 w-full"
                    placeholder="Tìm kiếm ..."
                  />
                  <div className="absolute right-0 top-0 mt-2 mr-3">
                    <FaSearch className="text-gray-600" />
                  </div>
                </div>
                <Link to="#" className="ml-4 lg:hidden">
                  <FaSearch className="text-gray-800" />
                </Link>
                <Link to="#" className="ml-4 relative">
                  <FaShoppingCart className="text-gray-800" size={30} />
                </Link>
                <div className="ml-4 relative">
                  <div className="relative">
                    <FaUser
                      className="text-gray-800"
                      size={30}
                      onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        {email ? (
                          <ul>
                            <li>
                              <p className="block px-4 py-2 text-gray-700">
                                Xin chào: {email}
                              </p>
                              <Link
                                to="/my-account"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                Tài khoản của tôi
                              </Link>
                              <button
                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                onClick={logout}
                              >
                                Đăng xuất
                              </button>
                            </li>
                          </ul>
                        ) : (
                          <ul>
                            <li>
                              <Link
                                to="/users/login"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                Đăng nhập
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/users/register"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                Đăng ký
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer />
    </>
  );
};

export default Header;
