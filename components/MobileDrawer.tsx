import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getRecaps } from "@/lib/getRecaps";
import { ChevronDown, ChevronUp } from "lucide-react";

const recapData = getRecaps();

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [showOlderSeasons, setShowOlderSeasons] = useState(false);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  const toggleOlderSeasons = () => setShowOlderSeasons((prev) => !prev);

  // Sort all of the seasons in descending order
  const sortedSeasons = Object.entries(recapData).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  const latestSeasons = sortedSeasons.slice(0, 3);
  const olderSeasons = sortedSeasons.slice(3);

  const renderSeasonLinks = (seasons: [string, number[]][]) =>
    seasons.map(([year, weeks]) => {
      const isExpanded = expandedYear === year;

      return (
        <div key={year} className="mb-2">
          <button
            onClick={() => setExpandedYear(isExpanded ? null : year)}
            className="
              flex justify-between items-center w-full
              rounded-md whitespace-nowrap text-gray-900
              ml-2
            "
          >
            {year} Season
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-5 overflow-hidden flex flex-col gap-1 mt-1"
            >
              {weeks.map((week) => (
                <Link
                  key={week}
                  href={`/recaps/${year}/week-${week}`}
                  onClick={onClose}
                  className="text-sm text-gray-700"
                >
                  Week {week}
                </Link>
              ))}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      );
    });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-12 left-0 right-0 bottom-0 bg-black/50 z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="
              fixed top-12 left-0 w-60 h-[calc(100vh-3rem)]
              bg-gray-50
              pl-4 pr-6 py-2 z-[1001]
              flex flex-col gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="font-bold text-lg text-green-600 mb-2 underline">
                Recaps
              </h2>

              {/* Latest Recaps */}
              {renderSeasonLinks(latestSeasons)}

              {showOlderSeasons && (
                <>
                  <div className="border-t border-gray-300 my-2" />
                  <h2 className="font-bold text-lg text-green-600 mb-2 underline">
                    Older Recaps
                  </h2>
                  {renderSeasonLinks(olderSeasons)}
                </>
              )}

              <div className="border-t border-gray-300 my-2" />

              <button
                onClick={toggleOlderSeasons}
                className="mb-2 text-md text-green-600"
              >
                {showOlderSeasons ? "Hide Older Seasons" : "View Older Seasons"}
              </button>

              <div className="mb-2">
                <Link
                  href="/recaps"
                  onClick={onClose}
                  className="text-md text-blue-600"
                >
                  View All Recaps
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300" />
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/" onClick={onClose} className="text-lg text-gray-800">
                Home
              </Link>
              <Link href="/about" onClick={onClose} className="text-lg text-gray-800">
                About
              </Link>
              <Link href="/contact" onClick={onClose} className="text-lg text-gray-800">
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
