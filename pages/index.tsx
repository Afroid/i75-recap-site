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
        <h1 className="text-3xl text-orange-600 font-bold mb-4">None of the links go to anything, yet.</h1>
        <p className="text-lg text-gray-700 mb-4">
          Content will go here. The menus are in place but again the links won't take you anywhere, yet.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Feel free to click around on mobile or desktop and see if you like the feel of the menu/drawer.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Some of the More section will likely go away and we can put other links there eventually.
        </p>

        <p className="text-lg text-gray-700 mb-4">
         I'm going to <b>change</b> and <b>add</b> a lot of things, such as: Changing color schemes and fonts, as well as changing the I75 League at the top to a logo with a picture of I75 League instead of just plain text. Keep in mind that I made a logo for us a while back.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          As always, any suggestions, comments, concerns, or questions are welcomed.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Just sit tight. It's coming...
        </p>
      </main>
    </>
  );
}
