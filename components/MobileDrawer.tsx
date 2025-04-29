import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [showOlderSeasons, setShowOlderSeasons] = useState(false);

  const toggleOlderSeasons = () => setShowOlderSeasons((prev) => !prev);

  // Sort all of the seasons in descending order
  const sortedSeasons = Object.entries(recapData).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  // Split seasons from the last three versus the older ones after that.
  const latestSeasons = sortedSeasons.slice(0, 3);
  const olderSeasons = sortedSeasons.slice(3);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-12 left-0 right-0 bottom-0 bg-black/50 z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close drawer when clicking on the mask
        >
          <motion.div
            className="
              fixed top-12 left-0 w-64 h-[calc(100vh-3rem)]
              bg-white
              px-6 py-2 z-[1001]
              flex flex-col gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            // Prevents mask from being clicked when clicking inside the drawer
            onClick={(e) => e.stopPropagation()}
          >

            {/* Recaps Section */}
            <div>
              <h2 className="font-bold text-lg text-green-600 mb-2 text-decoration-line: underline">
                Recaps
              </h2>

              {/* Latest Recaps */}
              {latestSeasons.map(([year, weeks]) => (
                <div key={year}>
                  <div className="font-semibold text-gray-900 ml-2">{year}</div>
                  <div className="ml-5 flex flex-col gap-1 mt-1">
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
                  </div>
                </div>
              ))}

              {/* View Older Seasons */}
              {showOlderSeasons && (
                <>
                  {/* Divider */}
                  <div className="border-t border-gray-300 my-2" />
                  <h2 className="
                        font-bold text-lg text-green-600 text-decoration-line: underline
                        mb-2
                      "
                  >
                    Older Recaps
                  </h2>

                  {olderSeasons.map(([year, weeks]) => (
                    <div key={year} className="mb-2">
                      <div className="font-semibold text-gray-900 ml-2">{year}</div>
                      <div className="ml-5 flex flex-col gap-1 mt-1">
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
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Divider */}
              <div className="border-t border-gray-300 my-2" />

              {/* Toggle Button */}
              <button
                onClick={toggleOlderSeasons}
                className="mb-2 text-md text-green-600"
              >
                {showOlderSeasons ? "Hide Older Seasons" : "View Older Seasons"}
              </button>

              {/* View All Recaps Link */}
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

            {/* Static Nav Links */}
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
