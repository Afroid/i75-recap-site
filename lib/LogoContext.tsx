"use client";
import { createContext, useContext, useMemo } from "react";

const logos = [
  "/default-logo.png",
  "/default-logo-alt.png",
  "/default-RWB.png",
];

const LogoContext = createContext<string | null>(null);

export function LogoProvider({ children }: { children: React.ReactNode }) {
  // Randomizes only once on initial render
  const logo = useMemo(
    () => logos[Math.floor(Math.random() * logos.length)],
    []
  );
  return (
    <LogoContext.Provider value={logo}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  const logo = useContext(LogoContext);
  if (logo === null) throw new Error("useLogo must be inside LogoProvider");
  return logo;
}
