import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import{logo} from '../../assets' 
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-red-300 fixed top-0 z-50">
      <div className="w-full max-w-[1300px] mx-auto px-2">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-24 md:w-32" src={logo} alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex gap-5 text-white">
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Ice Cream
              </li>
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Cake
              </li>
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Shakes
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-black transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col gap-4 py-4 text-white">
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Ice Cream
              </li>
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Cake
              </li>
              <li className="hover:text-black font-light cursor-pointer transition-colors">
                Shakes
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;