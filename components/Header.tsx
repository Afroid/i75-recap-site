import { useState } from "react";
import Logo from "./Logo";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md h-16">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleDrawer}
              className="focus:outline-none"
              aria-label="Open menu"
            >
              {/* Hamburger Icon */}
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white" />
                <div className="w-6 h-0.5 bg-white" />
                <div className="w-6 h-0.5 bg-white" />
              </div>
            </button>
          </div>

          {/* Logo (always visible) */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Logo />
          </div>

          {/* Desktop Navbar (hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DesktopNavbar />
          </nav>
        </div>
      </header>

      {/* Mobile Drawer (slides out) */}
      <MobileDrawer isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
}
