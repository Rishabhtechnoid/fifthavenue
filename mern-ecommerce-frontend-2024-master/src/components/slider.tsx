import { useState } from "react";
import "./_slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider">
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {data.map((image, index) => (
          <img src={image} alt={`Slide ${index}`} key={index} />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          &#9664; {/* Left arrow */}
        </div>
        <div className="icon" onClick={nextSlide}>
          &#9654; {/* Right arrow */}
        </div>
      </div>
    </div>
  );
};

export default Slider;
