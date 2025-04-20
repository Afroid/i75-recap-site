import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/ResponsiveDrawer.module.css";

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
      <button
        onClick={toggleDrawer}
        className={styles.hamburgerButton}
        aria-label="Toggle Menu"
        data-id="hamburger-button"
      >
        <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`} data-id="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Drawer Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-id="drawer-overlay"
          >
            <motion.div
              ref={drawerRef}
              className={styles.mobileDrawer}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              data-id="mobile-drawer"
            >
              <h2 className={styles.menuTitle} data-id="mobile-menu-title">Menu</h2>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={styles.navLink}
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
      <div className={styles.desktopSidebar} data-id="desktop-sidebar">
        <h2 className={styles.menuTitle} data-id="desktop-menu-title">Menu</h2>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`${styles.navLink} ${
              router.pathname === link.path ? styles.activeLink : ""
            }`}
            data-id={`desktop-nav-${link.name.toLowerCase()}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
