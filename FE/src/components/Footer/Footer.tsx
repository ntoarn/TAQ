import { FaInstagram } from "react-icons/fa"
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
    <footer className="bg-black" id="tempaltemo_footer">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-5">

      <div className="col-md-4 pt-5">
        <h2 className="text-success border-b pb-3 border-white logo">Zay Shop</h2>
        <ul className="text-light">
          <li className="flex items-center my-2">
            <i className="fas fa-map-marker-alt fa-fw"></i>
            <span className="ml-2">123 Consectetur at ligula 10660</span>
          </li>
          <li className="flex items-center my-2">
            <i className="fa fa-phone fa-fw"></i>
            <a href="tel:010-020-0340" className="ml-2 text-white">010-020-0340</a>
          </li>
          <li className="flex items-center my-2">
            <i className="fa fa-envelope fa-fw"></i>
            <a href="mailto:info@company.com" className="ml-2 text-white">info@company.com</a>
          </li>
        </ul>
      </div>

      <div className="col-md-4 pt-5">
        <h2 className="text-light border-b pb-3 border-white">Products</h2>
        <ul className="text-light">
          <li><a href="#" className="text-white">Luxury</a></li>
          <li><a href="#" className="text-white">Sport Wear</a></li>
          <li><a href="#" className="text-white">Men's Shoes</a></li>
          <li><a href="#" className="text-white">Women's Shoes</a></li>
          <li><a href="#" className="text-white">Popular Dress</a></li>
          <li><a href="#" className="text-white">Gym Accessories</a></li>
          <li><a href="#" className="text-white">Sport Shoes</a></li>
        </ul>
      </div>

      <div className="col-md-4 pt-5">
        <h2 className="text-light border-b pb-3 border-white">Further Info</h2>
        <ul className="text-light">
          <li><a href="#" className="text-white">Home</a></li>
          <li><a href="#" className="text-white">About Us</a></li>
          <li><a href="#" className="text-white">Shop Locations</a></li>
          <li><a href="#" className="text-white">FAQs</a></li>
          <li><a href="#" className="text-white">Contact</a></li>
        </ul>
      </div>

    </div>

    <div className="flex items-center justify-between border-t border-white py-4">
      <ul className="list-inline text-left footer-icons">
        <li className="list-inline-item rounded-full border border-white flex items-center justify-center w-10 h-10">
          <Link to="http://facebook.com/" target="_blank" className="text-white"><FiFacebook size={33}/></Link>
        </li>
        <li className="list-inline-item rounded-full border border-white flex items-center justify-center w-10 h-10">
          <Link to="https://www.instagram.com/" target="_blank" className="text-white"><FaInstagram size={33}/></Link>
        </li>
        <li className="list-inline-item rounded-full border border-white flex items-center justify-center w-10 h-10">
          <Link to="https://twitter.com/" target="_blank" className="text-white"><FiTwitter size={33}/></Link>
        </li>
        <li className="list-inline-item rounded-full border border-white flex items-center justify-center w-10 h-10">
          <Link to="https://www.linkedin.com/" target="_blank" className="text-white"><FiLinkedin size={33}/></Link>
        </li>
      </ul>

      <div className="flex items-center">
        <input type="text" className="form-input bg-black border-white px-3 py-1 focus:outline-none" id="subscribeEmail" placeholder="Email address" />
        <div className="btn btn-success ml-2 py-1 px-3 cursor-pointer text-white">Subscribe</div>
      </div>
    </div>
  </div>

  <div className="bg-black py-3">
    <div className="container">
      <div className="text-center text-light">
        <p className="mb-0">
          Copyright &copy; 2021 Company Name | Designed by <Link to="https://templatemo.com" rel="sponsored" target="_blank" className="text-success">TemplateMo</Link>
        </p>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer