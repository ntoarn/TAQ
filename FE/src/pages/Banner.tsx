import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      imgSrc:
        "https://product.hstatic.net/1000391653/product/newk023.2_1f5c8e2fce044b2d869a53024ae82bda.jpg",
      altText: "Iphone 15promax",
      title: "Eye Plus",
      subtitle: "Luxury design",
      description:
        "Eye Plus has luxurious colors and is pocket-friendly. Titanium frame design is lighter and more durable" +
        '<Link to="" target="_blank" rel="noopener noreferrer" className="text-green-500">TAQ Store</Link> ' +
        "website. Wi-Fi 6E makes wireless network connection speed 2 times faster.",
    },
    {
      imgSrc:
        "https://www.apple.com/v/macbook-air/s/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png",
      altText: "Macbook Air M2",
      title: "Macbook Air M2",
      subtitle: "Slim and light design, delicate to every detail",
      description:
        "Extreme performance with top M2 chip and 256GB memory. Unique rabbit ears screen, displaying sharp images.",
    },
    {
      imgSrc: "https://i.ytimg.com/vi/Nvb_Kta7v6U/maxresdefault.jpg",
      altText: "Apple Watch Series 9",
      title: "Apple Watch Series 9 smartwatch",
      subtitle: "Apple Watch Series 9",
      description:
        "Apple Watch Series 9 has a modern and classy angular design. Apple Watch Series 9 with high-end display technology. Thank you.",
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
    <div className="relative">
      <div className="carousel slide overflow-hidden relative">
        <div className="carousel-inner relative w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item relative float-left w-full ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <div className="container mx-auto p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="order-last md:order-first mx-auto">
                    <img
                      className="w-full max-w-full max-h-60 object-cover"
                      src={slide.imgSrc}
                      alt={slide.altText}
                      style={{ maxWidth: "100%", maxHeight: "400px" }}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="text-left">
                      <h1 className="text-3xl text-green-500 font-bold">
                        {slide.title}
                      </h1>
                      <h3 className="text-2xl">{slide.subtitle}</h3>
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: slide.description }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
          onClick={handlePrevClick}
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="text-blue-500" size={30} />
        </button>
        <button
          className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900"
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
