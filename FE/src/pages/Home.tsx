import { Link } from "react-router-dom";
import { Product } from "./../interfaces/Product";
import Banner from "./Banner";
import "../App.scss";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  return (
    <>
      {/* banner */}
      <Banner />
      {/* san pham */}
      <div className="container mt-4 w-[1440px] mx-auto">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Sản phẩm bán chạy
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div className="flex flex-col mb-4" key={product._id}>
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
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-truncate">
                    {product.description}
                  </p>
                  <p className="card-text">
                    <strong>Giá:</strong> {product.price}
                  </p>
                  <button className="px-4 py-2 rounded-[7px] bg-blue-600 hover:bg-white text-white hover:text-black ">
                    <Link to={`/product-detail/${product._id}`}>
                      Xem sản phẩm
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
