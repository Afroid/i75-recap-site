// pages/_app.tsx
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css"; // This is where your globals live.

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      {/* <ResponsiveDrawer /> */}
      {/* On desktop, push content over by 16rem; on mobile just p-4 */}
      {/* pt-16 gives vertical spacing for mobile header */}
      <div className="pt-16 px-4">
        <main>
            <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}