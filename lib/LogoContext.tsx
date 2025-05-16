// lib/LogoContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const logos = [
  "/default-logo.png",
  "/default-logo-alt.png",
  "/default-RWB.png",
];

const LogoContext = createContext("/default-logo.png");

export function LogoProvider({ children }: { children: React.ReactNode }) {
  // This starts with a fixed default so SSR + initial hydration match
  const [logo, setLogo] = useState<string>("/default-logo.png");

  // After it's mounted, this will pick a random GIF exactly once
  useEffect(() => {
    const choice = logos[Math.floor(Math.random() * logos.length)];
    setLogo(choice);
  }, []);

  return (
    <LogoContext.Provider value={logo}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  return useContext(LogoContext);
}
