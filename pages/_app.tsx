import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";
import "../styles/globals.css"; // This is where the globals live.
import { LogoProvider } from "@/lib/LogoContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>I75 League</title>
        <meta name="description" content="Where everybody knows your name." />
        <link rel="icon" href="/default-logo.png" />
      </Head>
      <LogoProvider>
        <Header />
        <main className="pt-16">
          <div className="mx-auto px-4 max-w-7xl">
            <Component {...pageProps} />
          </div>
        </main>
      </LogoProvider>
    </>
  );
}
