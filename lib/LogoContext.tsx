"use client"; // This module is purely client-side: allows useState/useEffect
import { createContext, useContext, useState, useEffect } from "react";

// List of possible logos. One is displayed at random, but
// it always starts with "/default-logo.png" to avoid hydration mismatch.
const logos = [
  "/default-logo.png",
  "/default-logo-alt.png",
  "/default-RWB.png",
];

// Create a context whose default value matches our initial state.
// This ensures SSR output will match the client-side initial render.
const LogoContext = createContext("/default-logo.png");

export function LogoProvider({ children }: { children: React.ReactNode }) {
  // This starts with a fixed default so SSR + initial hydration match
  const [logo, setLogo] = useState<string>("/default-logo.png");

  // Once it's mounted, this will pick a random GIF exactly once
  useEffect(() => {
    const choice = logos[Math.floor(Math.random() * logos.length)];
    setLogo(choice);
  }, []); // empty deps: run only on first mount

  return (
    <LogoContext.Provider value={logo}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  return useContext(LogoContext);
}
