import type { AppProps } from "next/app";
import Head from "next/head";                     // Next.js <Head> to inject metadata into <head>
import Header from "@/components/Header";         // Site-wide top navigation component
import { LogoProvider } from "@/lib/LogoContext"; // Context provider for logo selection
import "../styles/globals.css";                   // Global CSS (Tailwind, resets, etc.)

/**
 * The top-level App component for Next.js.
 *
 * Wraps every page with global providers and layout elements:
 * - <Head> for page metadata
 * - LogoProvider to supply random/logo context
 * - Header for site navigation
 * - Main content container with consistent styling
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*
        Page metadata: title, description, favicon.
        These values will appear in the HTML <head> for SEO and branding.
      */}
      <Head>
        <title>I75 League</title>
        <meta name="description" content="Where everybody knows your name." />
        <link rel="icon" href="/default-logo.png" />
      </Head>

      {/* Wraps app in LogoProvider so that any component can consume the logo via useLogo(). */}
      <LogoProvider>
        {/* Site header (navigation bar) fixed at the top, rendered on every page. */}
        <Header />

        {/* Main content area. pt-16 leaves space for the fixed Header. */}
        <main className="pt-16">
          <div className="mx-auto px-4 max-w-7xl">
            {/*
              Render the specific page component,
              passing along its pageProps from Next.js.
            */}
            <Component {...pageProps} />
          </div>
        </main>
      </LogoProvider>
    </>
  );
}
