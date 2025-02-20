import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone } from "../../components/iphone";
import Navbar from '../../components/navBar'
import About from '../About' 
const HomeUi = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/getproduct");
        console.log(response.data.Data);
        
        setProducts(response.data.Data);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
    <Navbar/>
      <div className="min-h-screen  mt-5 font-Embed bg-pink-50">
        {/* Hero Section */}
        <div className="px-4 py-8 md:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                Welcome to The
                <span className="block">
                  <span className="text-pink-500">Classic Ice</span>
                  <span> Cream Parlor</span>
                </span>
              </h1>
              <p className="text-gray-600 mb-6 text-sm md:text-base lg:text-lg">
                Savor the taste of tradition in our house-made with love and
                quality ingredients.
              </p>
              <button className="border-purple-600 border text-purple-600  hover:bg-purple-600 hover:text-white  px-6 py-3 rounded-full text-sm md:text-base">
                Browse Our Flavors Now
              </button>
            </div>

            <div className="heroPhoto w-[40%] max-sm:w-64 py-4">
              <Phone />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Our <span className="text-pink-500">Classic</span> Favorites
          </h2>

          <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
             <div 
             key={index} 
             className="bg-white rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
           >
             <div className="overflow-hidden rounded-lg">
               <img
                        src={`http://localhost:7000/public/${product.img}`}
                        alt={product.name}
                 className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
               />
             </div>
             <h3 className="font-semibold mb-2">{product.name}</h3>
             <div className="flex justify-between items-center mb-4">
               <div>
                 <span className="text-purple-600 font-bold">
                   {product.price}
                 </span>
                 <span className="text-gray-400 line-through text-sm ml-2">
                   {product.originalPrice}
                 </span>
               </div>
               <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-purple-700">
                 Add
               </button>
             </div>
           </div>
            ))}
          </div>
        </div>
      </div>
      <About/>
    </>
  );
};

export default HomeUi;
