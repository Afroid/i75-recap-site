// pages/_app.tsx
import type { AppProps } from "next/app";
import Header from "../components/Header";
// import ResponsiveDrawer from "../components/ResponsiveDrawer";
import "../styles/globals.css"; // This is where your globals live.

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      {/* <ResponsiveDrawer /> */}
      {/* On desktop, push content over by 16rem; on mobile just p-4 */}
      {/* pt-16 gives vertical spacing for mobile header */}
      {/* lg:pl-[250px] offsets desktop layout for the sidebar */}
      <div className="pt-16 lg:pl-[250px] px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}