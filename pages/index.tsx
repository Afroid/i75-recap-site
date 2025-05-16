import React from "react";
import Image from "next/image";
import { useLogo } from "@/lib/LogoContext";

export default function Home() {
  // Random src for logo
  const logoSrc = useLogo();

  return (
    <>
      <main className="">
        {/* Hero/logo */}
        <div className="mx-auto w-full max-w-lg">
          <Image
            src={logoSrc}
            alt={"Hero Logo"}
            width={600}
            height={400}
            className="w-auto h-auto rounded drop-shadow-heavy"
            priority
          />
        </div>

        {/* Intro */}
        <section className="max-w-2xl mx-auto text-center">
          <h1 className="lg:text-5xl text-3xl font-extrabold text-green-700 mb-4">
            I75 League Recaps
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to the official recap hub for the I75 League, where every week’s matchups
            are transformed from email threads into a polished web experience—complete with scores,
            highlights, GIFs, and a dash of humor.
          </p>

          {/* Links */}
          <div className="flex justify-center gap-4">
            <a
              href="/recaps/viewAllRecaps"
              className="
                px-5 py-3 bg-green-600
                text-white font-semibold rounded-lg
                hover:bg-green-700 transition
              ">
              View All Recaps
            </a>
            <a
              href="/about"
              className="
                px-5 py-3 border border-green-600 text-green-600
                rounded-lg hover:bg-green-50 transition
              ">
              Learn More
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
