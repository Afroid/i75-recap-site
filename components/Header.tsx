import { useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow h-16 flex items-center justify-between px-4">
        {/* Mobile hamburger */}
        <button
          onClick={toggleDrawer}
          className="lg:hidden bg-transparent border-none"
          aria-label="Open menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between cursor-pointer">
            <span className="h-[3px] bg-gray-800 rounded" />
            <span className="h-[3px] bg-gray-800 rounded" />
            <span className="h-[3px] bg-gray-800 rounded" />
          </div>
        </button>

        {/* Site title */}
        <h1 className="text-xl font-bold">I75 League</h1>
      </header>

      {/* Drawer outside header so it doesn’t get clipped */}
      <ResponsiveDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
