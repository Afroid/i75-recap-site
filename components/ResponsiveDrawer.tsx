/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function ResponsiveDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeYear, setActiveYear] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closeDrawer = onClose;

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


  /**
   * Renders the mobile version of the Recaps navigation section.
   *
   * - Displays each year as a collapsible accordion
   * - Uses Framer Motion for smooth expand/collapse animation
   * - Includes a "View All Recaps" link at the bottom
   * - Used in the mobile drawer (hidden on desktop)
   *
   * @returns JSX.Element
   */
  const renderRecapLinks = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Recaps</h2>
      {Object.entries(recapData)
      .sort((a, b) => Number(b[0]) - Number(a[0])) // sort years descending
      .map(([year, weeks]) => {
        const isOpen = activeYear === year;

        return (
          <div key={year} className="mb-2 mx-4">
            <button
              onClick={() => setActiveYear(isOpen ? null : year)}
              className="w-full text-left flex justify-between items-center text-lg font-semibold py-1 text-gray-900 hover:text-blue-600"
            >
              {year}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="ml-4 mt-1 space-y-1"
                >
                  {weeks.map((week) => (
                    <Link
                      key={week}
                      href={`/recaps/${year}/week-${week}`}
                      className="block text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                      Week {week}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="mt-6 mx-4">
        <Link
          href="/recaps"
          className="block text-lg font-semibold text-blue-600 hover:underline"
        >
          View All Recaps
        </Link>
      </div>
    </div>
  );

  /**
   * Renders the desktop version of the Recaps navigation section.
   *
   * - Displays each year with a hoverable flyout submenu of weeks
   * - Flyout appears to the right of the drawer on hover
   * - Used only on desktop (visible on lg: screens)
   *
   * @returns JSX.Element
   */

  const renderRecapFlyouts = () => (
    <div>
      <h2 className="text-xl font-bold mb-4 pl-2">Recaps</h2>
      {Object.entries(recapData)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, weeks]) => (
          <div key={year} className="relative group mb-2">

            {/* Year row with highlighted hover */}
            <div className="w-full px-4 py-2 text-lg font-semibold text-gray-900 cursor-pointer rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300">
              {year}
            </div>

            {/* Pointer (half inside the year row, half outside) */}
            <div className="absolute top-1/2 left-[244px] -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 shadow-md z-50 hidden group-hover:block"/>

            {/* Flyout */}
            <div className="absolute top-0 left-full hidden group-hover:block bg-white shadow-xl rounded-md p-2 z-50 w-40">
              {weeks.map((week) => (
                <Link
                  key={week}
                  href={`/recaps/${year}/week-${week}`}
                  className="block px-2 py-1 text-sm text-gray-800 hover:text-blue-600"
                >
                  Week {week}
                </Link>
              ))}
            </div>
          </div>
        ))}

      <div className="mt-6 pl-4">
        <Link
          href="/recaps"
          className="block text-lg font-semibold text-blue-600 hover:underline"
        >
          View All Recaps
        </Link>
      </div>
    </div>
  );


  const renderStaticLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="mx-4 lg:mx-0 block py-2 text-lg text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out lg:pl-4"
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <>
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

              {renderRecapLinks()}
              <h2 className="text-xl font-bold mt-6 mb-2">More</h2>
              {renderStaticLinks()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[250px] bg-gray-100 py-8 px-0 z-[100]" data-id="desktop-sidebar">
        {renderRecapFlyouts()}
        <h2 className="text-xl font-bold mt-6 mb-2 pl-2">More</h2>
        {renderStaticLinks()}
      </div>
    </>
  );
}
