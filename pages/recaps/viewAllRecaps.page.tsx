import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getRecaps } from "@/lib/getRecaps";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { TestIds } from "@/lib/testIds";

interface RecapEntry {
  year: string;
  week: number;
}

export async function getStaticProps() {
  // Load summary mapping of years to weeks
  const summary = getRecaps();              // Record<number,number[]>
  const allRecaps = Object.entries(summary) // [ [year, weeks], … ]
    .flatMap(([year, weeks]) =>
      weeks.map((week) => ({ year, week }))
    );

  return { props: { allRecaps } };
}

// Reusable dropdown component for filters and sorters
function Dropdown({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
      data-testid={`${TestIds.VIEW_ALL_RECAPS_DROPDOWN}-
      ${label.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {/* Toggle button shows current selection or label */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center border px-3 py-2 rounded-md w-full"
        data-testid={`${TestIds.VIEW_ALL_RECAPS_DROPDOWN_BUTTON}-
        ${label.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span>{options.find((opt) => opt.value === value)?.label || label}</span>
        {isOpen ?
          <ChevronUp
            size={16}
            className="text-gray-500"
            data-testid={TestIds.VIEW_ALL_RECAPS_DROPDOWN_ICON_UP}
          /> :
          <ChevronDown
            size={16}
            className="text-gray-500"
            data-testid={TestIds.VIEW_ALL_RECAPS_DROPDOWN_ICON_DOWN}
          />
        }
      </button>

      {/* Options list */}
      {isOpen && (
        <ul
          className={[
            "absolute left-0 mt-1 w-full border bg-white",
            "shadow-lg z-10 rounded-md overflow-hidden"
          ].join(" ")}
          data-testid={`${TestIds.VIEW_ALL_RECAPS_DROPDOWN_LIST}-
          ${label.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={[
                "px-4 py-2 cursor-pointer",
                `hover:bg-green-100 ${value === opt.value ? "bg-green-50" : ""}`
              ].join(" ")}
              data-testid={`${TestIds.VIEW_ALL_RECAPS_DROPDOWN_OPTION}-${opt.value}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ViewAllRecapsPage({ allRecaps }: { allRecaps: RecapEntry[] }) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // Initialize state from URL query params
  useEffect(() => {
    const { sort, search, year } = router.query;
    if (typeof sort === "string") setSortOrder(sort);
    if (typeof search === "string") setSearchTerm(search);
    if (typeof year === "string") setYearFilter(year);
  }, [router.query]);

  // Update URL query without full page reload
  const updateQuery = (updates: Record<string, string>) => {
    const newQuery = {
      ...router.query,
      ...updates,
    };
    Object.keys(newQuery).forEach((key) => {
      if (!newQuery[key]) delete newQuery[key];
    });
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateQuery({ search: value });

    // If user types exactly four digits, clear year filter
    if (/^\d{4}$/.test(value)) {
      setYearFilter("");
      updateQuery({ search: value, year: "" });
    }
  };

  // Filter and sort recaps based on searchTerm, yearFilter, and sortOrder
  const filteredRecaps = allRecaps
    .filter((entry) => {
      const combinedText = `${entry.year} season week ${entry.week}`.toLowerCase();
      const search = searchTerm.trim().toLowerCase();
      const searchRegex = new RegExp(`\\b${search}\\b`);
      const matchesSearch = search ? searchRegex.test(combinedText) : true;
      const matchesYear = yearFilter ? entry.year === yearFilter : true;
      return matchesSearch && matchesYear;
    })
    .sort((a, b) => {
      const aYear = Number(a.year);
      const bYear = Number(b.year);
      const aWeek = a.week;
      const bWeek = b.week;

      if (aYear !== bYear) {
        return sortOrder === "desc" ? bYear - aYear : aYear - bYear;
      }

      return sortOrder === "desc" ? bWeek - aWeek : aWeek - bWeek;
    });

  // Unique years for year filter dropdown
  const uniqueYears = Array.from(new Set(allRecaps.map((r) => r.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div
      data-testid={TestIds.VIEW_ALL_RECAPS_PAGE}
      className="pt-4 max-w-4xl mx-auto px-4"
    >
      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by year or week..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
            data-testid={TestIds.VIEW_ALL_RECAPS_SEARCH_INPUT}
          />
          <Search
            data-testid={TestIds.VIEW_ALL_RECAPS_SEARCH_ICON}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        {/* Year & Sort order dropdowns */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:gap-4 gap-2">
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <div className="w-2/5 sm:w-auto lg:w-28">
              <Dropdown
                label="All Years"
                options={[
                  { label: "All Years", value: "" },
                  ...uniqueYears.map((year) => ({ label: year, value: year }))
                ]}
                value={yearFilter}
                onChange={(val) => {
                  setYearFilter(val);
                  setSearchTerm("");
                  updateQuery({ year: val, search: "" });
                }}
              />
            </div>

            <div className="w-3/5 sm:w-auto lg:w-40">
              <Dropdown
                label="Sort Order"
                options={[
                  { label: "Latest to Oldest", value: "desc" },
                  { label: "Oldest to Latest", value: "asc" },
                ]}
                value={sortOrder}
                onChange={(val) => {
                  setSortOrder(val);
                  updateQuery({ sort: val });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recap list */}
      <ul
        data-testid={TestIds.VIEW_ALL_RECAPS_RECAP_LIST}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {filteredRecaps.map((entry, idx) => (
          <motion.li
            key={`${entry.year}-${entry.week}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.03 }}
            data-testid={`${TestIds.VIEW_ALL_RECAPS_RECAP_ITEM}-${entry.year}-${entry.week}`}
          >
            <Link
              href={`/recaps/${entry.year}/week-${entry.week}`}
              data-testid={`${TestIds.VIEW_ALL_RECAPS_RECAP_LINK}-${entry.year}-${entry.week}`}
              className={[
                "block rounded-lg shadow-md",
                "bg-white hover:bg-green-50",
                "p-6 text-center transition",
                "border border-gray-200 hover:border-green-400",
                "transform transition-transform",
                "hover:shadow-lg hover:scale-105 hover:-translate-y-1",
                "flex flex-col justify-center",
                "min-h-[150px]"
              ].join(" ")}
            >
              <h2
                data-testid={`${TestIds.VIEW_ALL_RECAPS_RECAP_TITLE}-${entry.year}-${entry.week}`}
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                Week {entry.week}
              </h2>
              <p
                data-testid={`${TestIds.VIEW_ALL_RECAPS_RECAP_SEASON}-${entry.year}-${entry.week}`}
                className="text-gray-600"
              >
                Season {entry.year}
              </p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
