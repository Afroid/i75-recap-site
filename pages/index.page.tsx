import React from "react";
import Image from "next/image";
import { useLogo } from "@/lib/LogoContext";
import { TestIds } from "@/lib/testIds";

export default function Home() {
  // Random src for logo
  const logoSrc = useLogo();

  return (
    <>
      <main data-testid={TestIds.HOME_MAIN}>
        {/* Hero/logo */}
        <div data-testid={TestIds.HOME_HERO_LOGO_CONTAINER} className="mx-auto w-full max-w-lg">
          <Image
            data-testid={TestIds.HOME_HERO_LOGO}
            src={logoSrc}
            alt="Hero Logo"
            width={600}
            height={400}
            className="w-auto h-auto rounded drop-shadow-heavy"
            priority
          />
        </div>

        {/* Intro */}
        <section
          data-testid={TestIds.HOME_INTRO_SECTION}
          className="max-w-2xl mx-auto text-center"
        >
          <h1
            data-testid={TestIds.HOME_HERO_HEADING}
            className="lg:text-5xl text-3xl font-extrabold text-green-700 mb-4"
          >
            I75 League Recaps
          </h1>
          <p data-testid={TestIds.HOME_INTRO_TEXT} className="text-lg text-gray-600 mb-6">
            Welcome to the official recap hub for the I75 League, where every week’s matchups
            are transformed from email threads into a polished web experience—complete with scores,
            highlights, GIFs, and a dash of humor.
          </p>

          {/* Links */}
          <div data-testid={TestIds.HOME_CTA_CONTAINER} className="flex justify-center gap-4">
            <a
              data-testid={TestIds.HOME_VIEW_ALL_RECAPS_BUTTON}
              href="/recaps/viewAllRecaps"
              className={[
                "px-5 py-3 bg-green-600",
                "text-white font-semibold rounded-lg",
                "hover:bg-green-700 transition",
              ].join(" ")}
            >
              View All Recaps
            </a>
            <a
              data-testid={TestIds.HOME_LEARN_MORE_BUTTON}
              href="/about"
              className={[
                "px-5 py-3 border border-green-600 text-green-600",
                "rounded-lg hover:bg-green-50 transition",
              ].join(" ")}
            >
              Learn More
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
