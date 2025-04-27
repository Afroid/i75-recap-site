import Link from "next/link";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

export default function DesktopNavbar() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Recaps on the left side */}
      <div className="relative flex flex-col items-center group w-24">

        <button
          className="
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
            absolute top-[calc(100%-.5rem)] w-4 h-4 bg-white rotate-45 shadow-lg
            hidden group-hover:block
          "
        />

        {/* Flyout: Seasons */}
        <div
          className="
            absolute top-full group-hover:flex flex-col hidden
            bg-white text-black shadow-lg rounded-md
            z-50 min-w-[150px]
            py-2
          "
        >
          {Object.entries(recapData)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, weeks]) => (
              <div
                key={year}
                className="relative group/season w-full"
              >
                {/* Season Button */}
                <button
                  className="
                    flex justify-center w-full items-center h-10
                    px-4 py-2
                    hover:bg-green-100
                    rounded-md transition-colors duration-300
                    whitespace-nowrap
                  "
                >
                  {year} Season
                </button>

                {/* Sub-Flyout Pointer */}
                <div
                  className="
                    absolute top-1/2 left-full
                    -translate-y-1/2 -ml-2
                    w-4 h-4 bg-white rotate-45
                    hidden group-hover/season:block shadow-md
                  "
                />

                {/* Sub-Flyout: Weeks */}
                <div
                  className="
                    absolute top-0 left-full
                    hidden group-hover/season:flex flex-col
                    bg-white text-black rounded-md
                    p-2 min-w-[100px] w-full
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
            {/* Divider line */}
            <div className="border-t border-gray-300 my-2" />

            {/* View All Recaps Link */}
            <Link
              href="/recaps"
              className="
                block text-center px-4 py-2
                text-green-600 hover:text-green-800
                font-semibold hover:bg-green-100 rounded-md
                transition-colors duration-300
              "
            >
              View All Recaps
            </Link>
        </div>
      </div>

      {/* Static Links on the right side */}
      <div className="flex items-center space-x-8 ml-auto">
        <Link href="/" className="hover:text-green-400 transition-colors duration-300">
          Home
        </Link>
        <Link href="/about" className="hover:text-green-400 transition-colors duration-300">
          About
        </Link>
        <Link href="/contact" className="hover:text-green-400 transition-colors duration-300">
          Contact
        </Link>
      </div>
    </div>
  );
}
