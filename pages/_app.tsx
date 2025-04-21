// pages/_app.tsx
import type { AppProps } from "next/app";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import "../styles/globals.css";
// import "../styles/ResponsiveDrawer.module.css"; // or wherever your globals live

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ResponsiveDrawer />

      {/* On desktop, push content over by 16rem; on mobile just p-4 */}
      {/* <div className="p-4 lg:pl-64"> */}
      <div className="p-4 lg:pl-[250px]">
        <Component {...pageProps} />
      </div>
    </>
  );
}
