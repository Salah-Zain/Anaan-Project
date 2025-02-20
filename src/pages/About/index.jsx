import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Cake, IcePic, Shake } from '../../assets';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const About = [
    { id: 1, img: IcePic, alt: "Cake" },
    { id: 2, img: Shake, alt: "Shake" },
    { id: 3, img: Cake, alt: "Ice" },
  ];

  return (
    <div className="min-h-screen mt-2">
      <div className="px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div data-aos="fade-down">
          <p className="text-blue-300 text-2xl uppercase tracking-wide">About Us</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-aos="fade-up">
            {/* Left column content */}
          </div>
          <div data-aos="fade-down">
            <p className="text-gray-800 text-lg leading-relaxed mb-8">
              Elevate your wristwear with our signature timepiece, designed for
              those who demand more from their accessories. Whether you're
              heading to the office or out on an adventure, this watch combines
              timeless elegance with cutting-edge functionality.
            </p>
          </div>
        </div>

        {/* More Button */}
        <div className="flex justify-end mb-2" data-aos="fade-up">
          <button className="group px-4 py-2 rounded-full border border-gray-300 hover:border-blue-300 transition-colors duration-300">
            More
          </button>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="w-full py-8 overflow-hidden relative bg-gray-50">
      <style>
        {`
          @keyframes carousel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .carousel-animation {
            animation: carousel 20s linear infinite;
          }
          
          .carousel-animation:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div 
        className="flex items-center gap-4 carousel-animation"
        style={{ width: 'fit-content' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Original items */}
        {About.map((item) => (
          <div
            key={item.id}
            className="min-w-[300px] flex-shrink-0 p-4 rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        ))}
        
        {/* Duplicated items for infinite scroll effect */}
        {About.map((item) => (
          <div
            key={`duplicate-${item.id}`}
            className="min-w-[300px] flex-shrink-0 p-4 rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutPage;
