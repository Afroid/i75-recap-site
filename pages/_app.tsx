// pages/_app.tsx
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css"; // This is where your globals live.

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="pt-16 px-4">
        <main>
            <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
