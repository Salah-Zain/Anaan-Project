import React from "react";
import { logo } from "../../assets";

const NavBar = () => {
  return (
    <div className="container w-full flex justify-center items-center border-1 border-gray-300 top-0">
      <div className="containerWrap w-full max-w-[1300px] flex justify-between items-center py-4">
        <div className="logo flex items-center">
          <img className="w-10" src={logo} alt="" />
          <h1 className="font-bold text-2xl">
            <span className="text-[rgb(248,61,142)]">Ice</span>
            <span className="text-[rgb(104,50,146)]">Berg</span>
          </h1>
        </div>
        {/* <div>
          <ul className="flex items-center gap-10 list-none">
            <li>Home</li>
            <li>About</li>
            <li>Service</li>
            <li>Contact</li>
          </ul>
          <div className="md:hidden">
            <button>Menu</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
