import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      imgSrc:
        "https://longhoangthanh.vn/wp-content/uploads/2020/03/banner-gong-kinh.jpg",
    },
    {
      imgSrc:
        "https://mms.img.susercontent.com/vn-11134210-7qukw-lgmbtba4h24347@resize_bs700x700",
    },
    {
      imgSrc:
        "https://mms.img.susercontent.com/vn-11134210-7qukw-lglsfxnvnu2f65@resize_ss400x400",
    },
  ];

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 2500);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative h-[80vh] max-h-[600px]">
      <div className="carousel slide overflow-hidden relative h-full">
        <div className="carousel-inner relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item absolute inset-0 flex justify-center items-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                className="w-full h-full object-cover"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
          onClick={handlePrevClick}
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="text-blue-500" size={30} />
        </button>
        <button
          className="carousel-control-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
          onClick={handleNextClick}
        >
          <span className="sr-only">Next</span>
          <FaChevronRight className="text-blue-500" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
