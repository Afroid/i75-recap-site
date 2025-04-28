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
      <header className="fixed top-0 left-0 w-full z-50 bg-global-nav text-white shadow-md h-12">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">

          {/* Mobile Hamburger */}
          <div className="flex-shrink-0 lg:hidden">
            <button onClick={toggleDrawer} aria-label="Open menu" className="focus:outline-none">
              {/* Hamburger Menu/Lines */}
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white" />
                <div className="w-6 h-0.5 bg-white" />
                <div className="w-6 h-0.5 bg-white" />
              </div>
            </button>
          </div>

          {/* Logo (always visible) */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav (hidden on mobile) */}
          <nav className="hidden lg:flex items-center flex-grow ml-8">
            <DesktopNavbar />
          </nav>

        </div>

        {/* Mobile Drawer (slides out) */}
        <MobileDrawer isOpen={isOpen} onClose={closeDrawer} />

      </header>


      {/* Mobile Drawer (slides out) */}
      {/* <MobileDrawer isOpen={isOpen} onClose={closeDrawer} /> */}
    </>
  );
}
