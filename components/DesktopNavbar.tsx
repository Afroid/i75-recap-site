"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TestIds } from "@/lib/testIds";

type Summary = Record<string, number[]>;

/**
 * DesktopNavbar
 * Fetches recap summary and renders a hover-triggered flyout menu
 * showing recent seasons and weeks, plus navigation links.
 */
export default function DesktopNavbar() {
  // Stores recap counts per year
  const [recapData, setRecapData] = useState<Summary>({});
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [showAllSeasons, setShowAllSeasons] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);

  // Fetch summary from our API on mount
  useEffect(() => {
    fetch("/api/recapsSummary")
      .then((r) => r.json())
      .then(setRecapData)
      .catch(console.error);
  }, []);

  // Close flyout when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setIsFlyoutOpen(false); // Clicked outside → close flyout
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Sorts all of the seasons in descending order
  const sortedSeasons = Object.entries(recapData).sort((a, b) => Number(b[0]) - Number(a[0]));

  // Split seasons from the last three versus the older ones after that.
  const latestSeasons = sortedSeasons.slice(0, 3); // Only latest 3 seasons
  const olderSeasons = sortedSeasons.slice(3);

  return (
    <div data-testid={TestIds.DESKTOP_NAVBAR} className="flex items-center justify-between w-full">
      {/* Left side: Recaps */}
      <div
        data-testid={TestIds.DESKTOP_NAV_RECAPS}
        className="relative flex flex-col items-center group w-24"
        onMouseEnter={() => setIsFlyoutOpen(true)}
      >
        <button
          data-testid={TestIds.DESKTOP_RECAPS_BUTTON}
          className={[
            "w-full h-12 flex",
            "items-center justify-center",
            "hover:text-green-400 transition-colors duration-300"
          ].join(" ")}
        >
          Recaps
        </button>

        {/* Pointer under Recaps */}
        <div
          className={[
            "absolute top-[calc(100%-.5rem)] w-4 h-4",
            "bg-white rotate-45 shadow-lg",
            "hidden group-hover:block"
          ].join(" ")}
        />

        {/* Flyout menu */}
        {isFlyoutOpen && (
          <div
            data-testid={TestIds.DESKTOP_RECAPS_FLYOUT}
            ref={flyoutRef}
            className={[
              "absolute top-full",
              "flex-col",
              "bg-gray-50 text-black",
              "shadow-lg rounded-md",
              "z-50 min-w-[180px] py-2",
              "ease-in-out"
            ].join(" ")}
          >
            {/* Latest Seasons */}
            {latestSeasons.map(([year, weeks]) => (
              <div
                key={year}
                data-testid={`${TestIds.DESKTOP_SEASON}-${year}`}
                className="relative group/season w-full"
              >
                <button
                  data-testid={`${TestIds.DESKTOP_SEASON_BUTTON}-${year}`}
                  className={[
                    "w-full flex",
                    "justify-center items-center",
                    "h-10 px-4 py-2",
                    "rounded-md whitespace-nowrap",
                    "hover:bg-gradient-to-r hover:from-green-100 hover:to-green-300"
                  ].join(" ")}
                >
                  {year} Season
                </button>

                {/* Sub-Flyout Pointer */}
                <div
                  className={[
                    "absolute top-1/2 left-full -translate-y-1/2 -ml-2 w-4 h-4",
                    "bg-gray-50 shadow-md",
                    "rotate-45 hidden",
                    "group-hover/season:block"
                  ].join(" ")}
                />

                {/* Sub-Flyout: Weeks */}
                <div
                  className={[
                    "absolute top-0 left-full",
                    "hidden group-hover/season:flex flex-col",
                    "bg-gray-50 text-black",
                    "p-2 min-w-[100px] w-full",
                    "rounded-md"
                  ].join(" ")}
                >
                  {weeks.map((week) => (
                    <Link
                      key={week}
                      href={`/recaps/${year}/week-${week}`}
                      data-testid={`${TestIds.DESKTOP_WEEK}-${year}-${week}`}
                      onClick={() => setIsFlyoutOpen(false)}
                      className={[
                        "px-4 py-2",
                        "rounded-md",
                        "hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100",
                        "transition-colors duration-300 whitespace-nowrap"
                      ].join(" ")}
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
                <h2
                  className={[
                    "font-bold text-lg text-center text-green-600 text-decoration-line: underline",
                    "mb-2"
                  ].join(" ")}
                >
                  Older Recaps
                </h2>
                {olderSeasons.map(([year, weeks]) => (
                  <div
                    key={year}
                    data-testid={`${TestIds.DESKTOP_OLDER_SEASON}-${year}`}
                    className="relative group/season w-full"
                  >
                    <button
                      data-testid={`${TestIds.DESKTOP_OLDER_SEASON_BUTTON}-${year}`}
                      className={[
                        "flex justify-center w-full items-center",
                        "h-10 px-4 py-2",
                        "rounded-md",
                        "hover:bg-gradient-to-r hover:from-green-100 hover:to-green-300",
                        "transition-colors duration-300 whitespace-nowrap"
                      ].join(" ")}
                    >
                      {year} Season
                    </button>

                    {/* Sub-Flyout Pointer */}
                    <div
                      className={[
                        "absolute top-1/2 left-full -translate-y-1/2",
                        "-ml-2 w-4 h-4",
                        "bg-gray-50 rotate-45 hidden group-hover/season:block shadow-md"
                      ].join(" ")}
                    />

                    {/* Sub-Flyout: Weeks */}
                    <div
                      className={[
                        "absolute top-0 left-full",
                        "hidden group-hover/season:flex flex-col",
                        "bg-gray-50 text-black",
                        "rounded-md p-2 min-w-[100px] w-full"
                    ].join(" ")}
                    >
                      {weeks.map((week) => (
                        <Link
                          key={week}
                          href={`/recaps/${year}/week-${week}`}
                          onClick={() => setIsFlyoutOpen(false)}
                          className={[
                            "px-4 py-2",
                            "hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100",
                            "rounded-md transition-colors duration-300",
                            "whitespace-nowrap"
                          ].join(" ")}
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
            {olderSeasons.length > 0 && (
              <button
                data-testid={TestIds.DESKTOP_TOGGLE_OLDER_SEASONS}
                onClick={(e) => {
                  e.stopPropagation(); // This prevents mousedown from reaching document
                  setShowAllSeasons((prev) => !prev);
                }}
                className={[
                  "block text-center w-full",
                  "px-4 py-2",
                  "text-green-600 hover:text-green-800",
                  "font-semibold hover:bg-green-300",
                  "rounded-md transition-colors duration-300"
                ].join(" ")}
              >
                {showAllSeasons ? 'Hide Older Seasons' : 'View Older Seasons'}
              </button>
            )}

            {/* View All Recaps */}
            <Link
              href="/recaps/viewAllRecaps"
              data-testid={TestIds.VIEW_ALL_RECAPS}
              className={[
                "block text-center",
                "px-4 py-2",
                "text-blue-600 hover:text-blue-800 font-semibold hover:bg-blue-300",
                "rounded-md transition-colors duration-300"
              ].join(" ")}
              onClick={() => setIsFlyoutOpen(false)}
            >
              View All Recaps
            </Link>

          </div>
        )}
      </div>

      {/* Right side: Static Navigation Links */}
      <div data-testid="nav-static-links" className="flex items-center space-x-8 ml-auto">
        <Link
          data-testid={TestIds.NAV_LINK_HOME}
          href="/"
          className="hover:text-green-400 transition-colors duration-300">
            Home
        </Link>
        <Link
          data-testid={TestIds.NAV_LINK_ABOUT}
          href="/about"
          className="hover:text-green-400 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          data-testid={TestIds.NAV_LINK_CONTACT}
          href="/contact"
          className="hover:text-green-400 transition-colors duration-300"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
