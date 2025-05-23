import { useState } from "react";
import HeaderLogo from "@/components/HeaderLogo";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileDrawer from "@/components/MobileDrawer";
import { TestIds } from "@/lib/testIds";

/**
 * Site-wide header component.
 *
 * - Shows a logo and hamburger menu on mobile
 * - Shows desktop navigation on larger screens
 * - Manages mobile drawer toggle state
 */
export default function Header() {
  // This is for the mobile drawer, whether it's open or not
  const [isOpen, setIsOpen] = useState(false);

  // Toggle open and close for mobile drawer
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  // Close for mobile drawer
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Main Header */}
      <header
        data-testid={TestIds.HEADER_SITE_HEADER}
        className="fixed top-0 left-0 w-full z-50 bg-global-nav text-white shadow-md h-12"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">

          {/* Mobile Hamburger and Logo*/}
          <div
            data-testid={TestIds.HEADER_MOBILE_HEADER}
            className="flex items-center space-x-4 lg:hidden bg-green-500 h-full pl-4"
          >
            <button
              data-testid={TestIds.HEADER_HAMBURGER_BUTTON}
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

            {/* Mobile Logo (clicking returns home) */}
            <HeaderLogo data-testid={TestIds.HEADER_MOBILE_LOGO} />
          </div>

          {/* Desktop HeaderLogo (hidden on mobile) */}
          <div data-testid={TestIds.HEADER_DESKTOP_LOGO} className="hidden lg:flex">
            <HeaderLogo />
          </div>

          {/* Desktop Nav (hidden on mobile) */}
          <nav
            data-testid={TestIds.HEADER_DESKTOP_NAV}
            className="hidden lg:flex items-center flex-grow ml-8">
            <DesktopNavbar />
          </nav>

        </div>

        {/* Mobile Drawer (slides out) */}
        <MobileDrawer
          data-testid={TestIds.HEADER_MOBILE_DRAWER}
          isOpen={isOpen}
          onClose={closeDrawer}
        />
      </header>

    </>
  );
}
