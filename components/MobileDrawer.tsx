import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getRecaps } from "@/lib/getRecaps";

const recapData = getRecaps();

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed top-0 left-0 w-64 bg-white h-full p-6 z-[1001] flex flex-col gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="self-end text-black hover:text-red-500 transition"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Static Nav Links */}
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={onClose} className="text-lg hover:text-green-600">
                Home
              </Link>
              <Link href="/about" onClick={onClose} className="text-lg hover:text-green-600">
                About
              </Link>
              <Link href="/contact" onClick={onClose} className="text-lg hover:text-green-600">
                Contact
              </Link>
            </div>

            {/* Recaps Section */}
            <div>
              <h2 className="font-bold text-gray-700 mb-2">Recaps</h2>
              {Object.entries(recapData)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, weeks]) => (
                  <div key={year}>
                    <div className="font-semibold text-gray-900">{year}</div>
                    <div className="ml-4 flex flex-col gap-1 mt-1">
                      {weeks.map((week) => (
                        <Link
                          key={week}
                          href={`/recaps/${year}/week-${week}`}
                          onClick={onClose}
                          className="text-sm text-gray-700 hover:text-green-600"
                        >
                          Week {week}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
