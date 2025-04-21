import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
// import styles from "../styles/ResponsiveDrawer.module.css";
// import "../styles/globals.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function ResponsiveDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        closeDrawer();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleRouteChange = () => closeDrawer();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <>
      {/* Hamburger Icon (hidden on desktop) */}
      {!isOpen && (
        <button
          onClick={toggleDrawer}
          className="fixed top-4 left-4 z-[60] bg-transparent border-none block lg:hidden"
          aria-label="Open Menu"
          data-id="hamburger-button"
        >
          <div
            className="w-6 h-4 flex flex-col justify-between cursor-pointer"
            data-id="hamburger-icon"
          >
            <span className="h-[3px] bg-gray-800 rounded transition-all duration-300 ease-in-out" />
            <span className="h-[3px] bg-gray-800 rounded transition-all duration-300 ease-in-out" />
            <span className="h-[3px] bg-gray-800 rounded transition-all duration-300 ease-in-out" />
          </div>
        </button>
      )}


      {/* Drawer Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-id="drawer-overlay"
          >
            <motion.div
              ref={drawerRef}
              className="bg-white w-[250px] h-full p-8 pt-8 relative z-[1003]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              data-id="mobile-drawer"
            >
              {/* Close/X button here */}
              <button
                onClick={closeDrawer}
                aria-label="Close menu"
                className="ml-auto mb-4 text-black hover:text-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <h2 className="text-xl font-bold mb-4" data-id="mobile-menu-title">Menu</h2>
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block py-2 text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  data-id={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div 
        className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[250px] bg-gray-100 p-8 pt-8 z-[100]"
        data-id="desktop-sidebar"
      >
        <h2 className="text-xl font-bold mb-4" data-id="desktop-menu-title">Menu</h2>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`block py-2 text-lg ${
              router.pathname === link.path
                ? "text-blue-600 font-bold"
                : "text-gray-800 hover:text-blue-600"
            } transition-colors duration-200`}
            data-id={`desktop-nav-${link.name.toLowerCase()}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
