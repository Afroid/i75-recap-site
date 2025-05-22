import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TestIds } from "@/lib/testIds";

type Summary = Record<string, number[]>;

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileDrawer slides in from the left when `isOpen` is true.
 * It fetches recap summary data and allows expanding seasons to view weeks.
 */
export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [recapData, setRecapData] = useState<Summary>({});
  const [showOlderSeasons, setShowOlderSeasons] = useState(false);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  // Fetch summary data once it's mounted
  useEffect(() => {
    fetch("/api/recapsSummary")
      .then((r) => r.json())
      .then(setRecapData)
      .catch(console.error);
  }, []);

  const toggleOlderSeasons = () => setShowOlderSeasons((prev) => !prev);

  // Sort all of the seasons in descending order
  const sortedSeasons = Object.entries(recapData).sort((a, b) => Number(b[0]) - Number(a[0]));

  const latestSeasons = sortedSeasons.slice(0, 3);
  const olderSeasons = sortedSeasons.slice(3);

  /**
   * Renders a list of season accordions
   * Weeks are beneeath whenever expanded
   */
  const renderSeasonLinks = (seasons: [string, number[]][]) =>
    seasons.map(([year, weeks]) => {
      const isExpanded = expandedYear === year;

      return (
        <div key={year} className="mb-2">
          {/* Season header button */}
          <button
            data-testid={`${TestIds.MOBILE_SEASON_TOGGLE}-${year}`}
            onClick={() => setExpandedYear(isExpanded ? null : year)}
            className={[
              "flex justify-between items-center w-full",
              "rounded-md whitespace-nowrap text-gray-900",
              "ml-2"
            ].join(" ")}
          >
            {year} Season
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              data-testid={`${TestIds.MOBILE_SEASON_WEEKS}-${year}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-5 overflow-hidden flex flex-col gap-1 mt-1"
            >
              {weeks.map((week) => (
                <Link
                  key={week}
                  data-testid={`${TestIds.MOBILE_WEEK_LINK}-${year}-${week}`}
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
        // Semi-transparent backdrop
        <motion.div
          data-testid={TestIds.MOBILE_DRAWER_OVERLAY}
          className="fixed top-12 left-0 right-0 bottom-0 bg-black/50 z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Sliding drawer panel */}
          <motion.div
            data-testid={TestIds.MOBILE_DRAWER}
            className={[
              "fixed top-12 left-0 w-60 h-[calc(100vh-3rem)]",
              "bg-gray-50",
              "pl-4 pr-6 py-2 z-[1001]",
              "flex flex-col gap-6"
            ].join(" ")}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2
                data-testid={TestIds.MOBILE_DRAWER_TITLE}
                className="font-bold text-lg text-green-600 mb-2 underline"
              >
                Recaps
              </h2>

              {/* Latest Recaps - (Latest Seasons List) */}
              {renderSeasonLinks(latestSeasons)}

              {/* Older Seasons Section which is collapsible */}
              {showOlderSeasons && olderSeasons.length > 0 && (
                <>
                  <div className="border-t border-gray-300 my-2" />
                  <h2
                    data-testid={TestIds.MOBILE_OLDER_SEASON_TITLE}
                    className="font-bold text-lg text-green-600 mb-2 underline">
                    Older Recaps
                  </h2>
                  {renderSeasonLinks(olderSeasons)}
                </>
              )}

              {/* Divider before controls */}
              <div className="border-t border-gray-300 my-2" />

              {/* Toggle button only if there are older seasons */}
              {olderSeasons.length > 0 && (
                <button
                  data-testid={TestIds.MOBILE_TOGGLE_OLDER_SEASONS}
                  onClick={toggleOlderSeasons}
                  className="mb-2 text-md text-green-600"
                >
                  {showOlderSeasons ? "Hide Older Seasons" : "View Older Seasons"}
                </button>
              )}

              <div className="mb-2">
                <Link
                  data-testid={TestIds.VIEW_ALL_RECAPS}
                  href="/recaps/viewAllRecaps"
                  onClick={onClose}
                  className="text-md text-blue-600"
                >
                  View All Recaps
                </Link>
              </div>

              {/* Bottom Divider */}
              <div className="border-t border-gray-300" />
            </div>

            {/* Static Navigation Links */}
            <div className="flex flex-col gap-4">
              <Link
                data-testid={TestIds.NAV_LINK_HOME}
                href="/"
                onClick={onClose}
                className="text-lg text-gray-800"
              >
                Home
              </Link>
              <Link
                data-testid={TestIds.NAV_LINK_ABOUT}
                href="/about"
                onClick={onClose}
                className="text-lg text-gray-800"
              >
                About
              </Link>
              <Link
                data-testid={TestIds.NAV_LINK_CONTACT}
                href="/contact"
                onClick={onClose}
                className="text-lg text-gray-800"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
