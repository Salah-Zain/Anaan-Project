import React, { useEffect, useState } from "react";
// import Navbar from '../../components/navBar';
// import About from '../About';
import {Hotel, Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7} from '../../assets';

const HomeUi = () => {
  const [loading, setLoading] = useState(true);

  // Static product data instead of fetching from API
  const staticProducts = [
    {
      id: 1,
      img: Hotel
    },
    {
      id: 2,
      img: Menu1
    },
    {
      id: 3,
      img: Menu2
    },
    {
      id: 4,
      img: Menu3
    }
  ];

  const additionalMenus = [
    {
      id: 5,
      img: Menu4
    },
    {
      id: 6,
      img: Menu5
    },
    {
      id: 7,
      img: Menu6
    },
    {
      id: 8,
      img: Menu7
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className="min-h-screen mt-5 font-Embed bg-pink-50">
        {/* Hero Section */}
        <div className="px-4 py-8 md:px-6 lg:px-8 xl:px-12">
  <div className="flex flex-col lg:flex-row items-center justify-between">
    <div className="text-center lg:text-left lg:w-1/2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
        Welcome to
        <span className="block">
          <span className="text-pink-500">Ice Burg</span>
          <span> Café</span>
        </span>
      </h1>
      <p className="text-gray-600 mb-6 text-sm md:text-base lg:text-lg">
        Discover our refreshing selection of ice creams and cold treats, crafted with premium ingredients for a delightful experience.
      </p>
      <button className="border-purple-600 border text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-full text-sm md:text-base">
        Explore Our Menu
      </button>
    </div>
  </div>
</div>
                <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Our <span className="text-pink-500">Featured</span> Menu
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.img}
                    alt={`Menu item ${product.id}`}
                    className="w-full h-auto object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Dishes Section - Full Size Images */}
        <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <span className="text-pink-500">Popular</span> Dishes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalMenus.map((item) => (
              <div
                key={item.id}
                className="bg-pink-50 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={`Popular dish ${item.id}`}
                    className="w-full h-auto object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Full Page Display of Images */}
      

        <div className="px-4 py-16 md:px-6 lg:px-8 xl:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Place an Order?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience our delicious menu items from the comfort of your home or visit us for a memorable dining experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-purple-700">
              Order Online
            </button>
            <button className="border-purple-600 border text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-full text-sm md:text-base">
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUi;