import React from "react";
import { logo } from "../../assets";

const NavBar = () => {
  return (
    <div className=" w-full bg-red-300 flex justify-center items-center border-1 border-gray-300 top-0">
      <div className=" w-full max-w-[1300px] flex justify-between items-center py-4">
        <div className="logo flex items-center">
          <img className="w-10" src={logo} alt="" />
          <h1 className="font-bold text-2xl">
            <span className="text-[rgb(248,61,142)]">Ice</span>
            <span className="text-[rgb(104,50,146)]">Berg</span>
          </h1>
        </div>
      <div>
        <ul className="flex gap-5 pr-4 text-white">
          <li className=" hover:text-black font-[300]">Ice Cream</li>
          <li className=" hover:text-black font-[300]">Cake </li>
          <li className=" hover:text-black font-[300]">Shakes</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default NavBar;
