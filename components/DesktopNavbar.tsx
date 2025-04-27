"use client"; // <--- Only if needed in your project (Next 13+/App Router projects)

import Link from "next/link";
import { useState } from "react";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

export default function DesktopNavbar() {
  const [showAllSeasons, setShowAllSeasons] = useState(false);

  // Sorts all of the seasons in descending order
  const sortedSeasons = Object.entries(recapData).sort((a, b) => Number(b[0]) - Number(a[0]));

  // Split seasons from the last three versus the older ones after that.
  const latestSeasons = sortedSeasons.slice(0, 3); // Only latest 3 seasons
  const olderSeasons = sortedSeasons.slice(3);

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left side: Recaps */}
      <div className="relative flex flex-col items-center group w-24">
        <button className="
            w-full h-12 flex
            items-center justify-center
            hover:text-green-400 transition-colors duration-300
          "
        >
          Recaps
        </button>

        {/* Recaps Pointer */}
        <div
          className="
            absolute top-[calc(100%-.5rem)] w-4 h-4
            bg-white rotate-45 shadow-lg
            hidden group-hover:block
          "
        />


        {/* Flyout */}
        <div className="
            absolute top-full
            group-hover:flex flex-col hidden
            bg-gray-50 border border-gray-200 text-black
            shadow-lg rounded-md
            z-50 min-w-[180px] py-2
            ease-in-out
          "
        >

          {/* Latest Seasons */}
          {latestSeasons.map(([year, weeks]) => (
            <div key={year} className="relative group/season w-full">

              {/* hover:bg-green-100 transition-colors duration-300 */}
              <button className="
                  w-full flex
                  justify-center items-center
                  h-10 px-4 py-2
                  rounded-md whitespace-nowrap
                  hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200
                "
              >
                {year} Season
              </button>

              {/* Sub-Flyout Pointer */}
              <div className="
                  absolute top-1/2 left-full -translate-y-1/2 -ml-2 w-4 h-4
                  bg-white shadow-md
                  rotate-45 hidden
                  group-hover/season:block" />

              {/* Sub-Flyout: Weeks */}
              <div className="

                  absolute top-0 left-full
                  hidden group-hover/season:flex flex-col
                  bg-white text-black
                  p-2 min-w-[100px] w-full
                  rounded-md
                "
              >
                {weeks.map((week) => (
                  <Link
                    key={week}
                    href={`/recaps/${year}/week-${week}`}
                    className="
                      px-4 py-2
                      rounded-md
                      hover:bg-green-100 transition-colors duration-300 whitespace-nowrap
                    "
                  >
                    Week {week}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Older Seasons - Initially, these are hidden. */}
          {showAllSeasons && olderSeasons.length > 0 && (
            <>
              <div className="border-t border-gray-300 my-2" />
              {olderSeasons.map(([year, weeks]) => (
                <div key={year} className="relative group/season w-full">
                  <button className="
                      flex justify-center w-full items-center
                      h-10 px-4 py-2
                      rounded-md
                      hover:bg-green-100 transition-colors duration-300 whitespace-nowrap
                    "
                  >
                    {year} Season
                  </button>

                  {/* Sub-Flyout Pointer */}
                  <div className="
                      absolute top-1/2 left-full -translate-y-1/2
                      -ml-2 w-4 h-4
                      bg-white rotate-45 hidden group-hover/season:block shadow-md
                    "
                  />

                  {/* Sub-Flyout: Weeks */}
                  <div className="
                      absolute top-0 left-full
                      hidden group-hover/season:flex flex-col
                      bg-white text-black
                      rounded-md p-2 min-w-[100px] w-full
                    "
                  >
                    {weeks.map((week) => (
                      <Link
                        key={week}
                        href={`/recaps/${year}/week-${week}`}
                        className="
                          px-4 py-2
                          hover:bg-green-100 rounded-md transition-colors duration-300
                          whitespace-nowrap
                        "
                      >
                        Week {week}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 my-2" />

          {/* View Older Seasons */}
          {!showAllSeasons && olderSeasons.length > 0 && (
            <button
              onClick={() => setShowAllSeasons(true)}
              className="block text-center
                px-4 py-2
                text-green-600 hover:text-green-800 font-semibold hover:bg-green-100
                rounded-md transition-colors duration-300
              "
            >
              View Older Seasons
            </button>
          )}

          {/* View All Recaps */}
          <Link
            href="/recaps"
            className="
              block text-center
              px-4 py-2
              text-blue-600 hover:text-blue-800 font-semibold hover:bg-blue-100
              rounded-md transition-colors duration-300
            "
          >
            View All Recaps
          </Link>

        </div>
      </div>

      {/* Right side: Static Links */}
      <div className="flex items-center space-x-8 ml-auto">
        <Link href="/" className="hover:text-green-400 transition-colors duration-300">Home</Link>
        <Link
          href="/about"
          className="hover:text-green-400 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-green-400 transition-colors duration-300"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
