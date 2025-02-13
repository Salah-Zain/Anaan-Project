import React, { useEffect, useState } from "react";
import Imgbtn from "../../components/button"
import { MoveUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ProductCategories = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/products");
        console.log(response.data.Data);
        
        setProducts(response.data.Data);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      AOS.destroy();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2
          className="text-[60px] font-medium text-gray-900"
          data-aos="fade-up"
        >
          Explore Our Top Categories
        </h2>
        <p
          className="text-[18px] text-gray-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum is simply
        </p>
      </div>

      <div className="w-full mt-10 justify-center flex flex-wrap gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center group transform transition duration-500 hover:scale-105"
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-delay={index * 100}
          >
            <img
              src={"http://localhost:7000/public/"+item.img}
              alt={"image"}
              className="w-[550px] object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:opacity-80"
            />
            <div className="w-full mt-4">
              <Imgbtn
                btnname={item.btnName}
                icon={<MoveUpRight size={20} />}
                className="flex items-center gap-1 justify-center text-black text-[24px] transition-colors duration-300 hover:text-blue-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;