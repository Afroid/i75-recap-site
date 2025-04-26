import Link from "next/link";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

export default function DesktopNavbar() {
  return (
    <div className="flex items-center space-x-8">
      {/* Static Nav Links */}
      <Link href="/" className="hover:text-green-400 transition-colors duration-300">
        Home
      </Link>
      <Link href="/about" className="hover:text-green-400 transition-colors duration-300">
        About
      </Link>
      <Link href="/contact" className="hover:text-green-400 transition-colors duration-300">
        Contact
      </Link>

      {/* Recaps Flyout (like ESPN's dropdowns) */}
      <div className="relative group">
        <button className="hover:text-green-400 transition-colors duration-300">
          Recaps
        </button>
        <div className="absolute left-0 top-full hidden group-hover:flex flex-col mt-2 bg-white text-black shadow-lg rounded-md p-2 z-50 min-w-[150px]">
          {Object.keys(recapData)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => (
              <Link
                key={year}
                href={`/recaps/${year}`}
                className="px-4 py-2 hover:bg-green-100 rounded-md transition-colors duration-300"
              >
                {year} Season
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
