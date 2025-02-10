// import React from "react";
// import { HiOutlineArrowSmRight } from "react-icons/hi";

// const HeroPage = () => {
//   return (
//     <div className="container w-[100%] flex justify-center items-center flex-col mt-[20px]">
//       <div className="containerWrap w-[100%] max-w-[1300px] flex justify-between items-center">
//         <div className="h-[500px] w-full flex justify-between items-center max-lg:flex-col max-sm:justify-center max-sm:items-center">
//           <div className="heroContent w-[40%] max-sm:w-[85%] max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center">
//             <h3 className="text-3xl py-2 max-sm:text-[16px] font-semibold">
//               Welcome to the
//             </h3>
//             <h1 className="text-7xl font-semibold max-sm:text-[34px]">
//               Classic Ice Cream Parlor
//             </h1>
//             <p className="text-2xl py-2 leading-6 space-x-8 max-sm:text-[14px] max-sm:font-semibold max-sm:leading-4">
//               Savor the taste of traditional ice cream made with love and
//               quality ingredients.
//             </p>
//             <div className="flex justify-center items-center py-4">
//               <button className="w-64 bg-amber-300 py-3 rounded-4xl px-4 flex justify-between items-center">
//                 Browse Our Classic Flavors <HiOutlineArrowSmRight />
//               </button>
//             </div>
//           </div>
//           <div className="heroPhoto w-[40%] max-sm:w-64 py-4">
//             <img
//               className="w-full object-cover"
//               src="https://html.designingmedia.com/icedelight/assets/images/banner-image.png"
//               alt=""
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroPage;

import React from "react";

const HomeUi = () => {
  const products = [
    {
      name: "French Vanilla Ice Cream",
      price: "$4.99",
      originalPrice: "$5.99",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Chocolate Supreme",
      price: "$5.99",
      originalPrice: "$6.99",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Strawberry Delight",
      price: "$4.99",
      originalPrice: "$5.99",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Mint Chocolate",
      price: "$5.99",
      originalPrice: "$6.99",
      image: "/api/placeholder/100/100",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-pink-50">
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
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm md:text-base">
                Browse Our Flavors Now
              </button>
            </div>

            <div className="heroPhoto w-[40%] max-sm:w-64 py-4">
              <img
                className="w-full object-cover"
                src="https://html.designingmedia.com/icedelight/assets/images/banner-image.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Feature Section */}
        {/* <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img 
              src="/api/placeholder/400/400" 
              alt="Person enjoying ice cream" 
              className="rounded-2xl w-full"
            />
          </div>
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Relive the Sweet
              <span className="block">Memories of <span className="text-pink-500">Classic</span></span>
              <span className="block">Ice Creams</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              From the most memorable flavors to today's creative new combinations,
              each scoop tells a story worth sharing.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm md:text-base">
              Explore More
            </button>
          </div>
        </div>
      </div> */}

        {/* Products Section */}
        <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Our <span className="text-pink-500">Classic</span> Favorites
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
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
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* product menu */}
        <div className="px-4 py-12 md:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Explore Our <span className="text-pink-500">Categories</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUi;
