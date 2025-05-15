import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-global-nav text-white shadow-md h-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">

          {/* Mobile Hamburger and Logo*/}
          <div className="flex items-center space-x-4 lg:hidden bg-green-500 h-full pl-4">
            <button
              onClick={toggleDrawer}
              aria-label="Toggle menu"
              className="relative w-8 h-8 flex items-center justify-center"
            >
              {/* Top Bar */}
              <div
                className={`
                  absolute w-8 h-0.5 bg-white transform
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "rotate-45" : "-translate-y-2"}
                `}
              />
              {/* Middle Bar */}
              <div
                className={`absolute w-8 h-0.5 bg-white transition-all duration-300 ease-in-out
                  ${isOpen ? "opacity-0" : ""}
                `}
              />
              {/* Bottom Bar */}
              <div
                className={`
                  absolute w-8 h-0.5 bg-white transform
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "-rotate-45" : "translate-y-2"}
                `}
              />
            </button>

            {/* Mobile Logo */}
            <HeaderLogo />
          </div>

          {/* Desktop HeaderLogo (hidden on mobile) */}
          <div className="hidden lg:flex">
            <HeaderLogo />
          </div>

          {/* Desktop Nav (hidden on mobile) */}
          <nav className="hidden lg:flex items-center flex-grow ml-8">
            <DesktopNavbar />
          </nav>

        </div>

        {/* Mobile Drawer (slides out) */}
        <MobileDrawer isOpen={isOpen} onClose={closeDrawer} />

      </header>

    </>
  );
}
