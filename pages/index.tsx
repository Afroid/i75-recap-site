// pages/index.tsx
import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>I75 League</title>
        <meta name="description" content="Where everybody knows your name." />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        <h1 className="text-4xl text-pink-600 font-bold">Tailwind is working 🎉</h1>
        <p className="text-lg text-gray-700">
          This is a sample content area. Use the menu to navigate between pages.
        </p>
      </main>
    </>
  );
}
