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
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import instance from "../../apis";

const Header = () => {
  const [avatar, setAvatar] = useState<string>("");
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    (async () => {
      if (user?._id) {
        const { data } = await instance.get(`/users/me/${user?._id}`);
        setAvatar(data.avatar);
      } else {
        const { data } = await instance.get(`/users`);
        setAvatar(data.avatar);
      }
    })();

    const handleClickOutside = (e: any) => {
      if (
        !e.target.closest("#user-menu-button") &&
        !e.target.closest("#dropdown-menu")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [user?._id]);

  return (
    <>
      <header>
        {/* Top Navbar */}
        <nav className="p-4 bg-black hidden lg:flex">
          <div className="container mx-auto text-white flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FiMail className="text-lg" />
              <Link to="mailto:nqton301004@gmail.com" className="hover:underline">
                taqstore@gmail.com
              </Link>
              <FiPhone className="text-lg" />
              <Link to="tel:098-382-7425" className="hover:underline">
                098-382-7425
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="https://fb.com/templatemo"
                target="_blank"
                rel="sponsored"
                className="text-xl hover:text-gray-300"
              >
                <FiFacebook />
              </Link>
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                className="text-xl hover:text-gray-300"
              >
                <FiInstagram />
              </Link>
              <Link
                to="https://twitter.com/"
                target="_blank"
                className="text-xl hover:text-gray-300"
              >
                <FiTwitter />
              </Link>
              <Link
                to="https://www.linkedin.com/"
                target="_blank"
                className="text-xl hover:text-gray-300"
              >
                <FiLinkedin />
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Navbar */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center py-4">
            <Link to="/" className="text-xl font-bold text-gray-800">
              TAQ
            </Link>
            <ul className="flex space-x-6 text-gray-800">
              <li>
                <Link to="/" className="hover:text-gray-900">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-900">
                  Cửa hàng
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gray-900">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900">
                  Liên hệ
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              {/* Search and Cart Icons */}
              <div className="relative hidden lg:flex items-center">
                <Link to="/cart" className="mr-4">
                  <FaShoppingCart className="text-gray-800" size={30} />
                </Link>
                <input
                  type="text"
                  className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg py-1 px-3"
                  placeholder="Tìm kiếm ..."
                />
                <FaSearch className="absolute right-2 top-2 text-gray-600" />
              </div>

              <Link to="#" className="lg:hidden">
                <FaSearch className="text-gray-800" size={30} />
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    id="user-menu-button"
                    className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={avatar}
                      alt="User Avatar"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id="dropdown-menu"
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                    >
                      <p className="block px-4 py-2 font-bold text-gray-700 bg-slate-400">
                        {user?.name}
                      </p>
                      <Link
                        to={`/myprofile/${user?._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin cá nhân
                      </Link>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={logout}
                      >
                        Đăng xuất
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                <button className=" border-black shadow-lg shadow-slate-600/50 hover:text-black hover:border-0 bg-black hover:bg-white text-white lg:px-6 lg:py-3 px-2 py-2 lg:rounded-xl rounded-lg text-lg font-medium">
                  Đăng nhập
                </button>
              </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer />
    </>
  );
};

export default Header;
