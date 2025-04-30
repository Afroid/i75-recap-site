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
        <h1 className="text-4xl text-green-600 font-bold mb-4">Welcome to I75 League</h1>
        <h1 className="text-3xl text-orange-600 font-bold mb-4">
          Links are working with dummy data. Real data will be uploaded soon.
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Some homepage content will go here.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Desktop and mobile pretty solid right now.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Some of the static links, like About and Contact may eventually go away or be updated.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          I still have lots of ideas to implement.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          As always, any suggestions, comments, concerns, or questions are welcomed.
        </p>
      </main>
    </>
  );
}
