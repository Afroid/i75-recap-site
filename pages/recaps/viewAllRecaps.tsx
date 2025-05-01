import fs from "fs";
import path from "path";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RecapData } from "@/types/types";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface RecapEntry {
  year: string;
  week: number;
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "data", "recaps");
  const files = fs.readdirSync(dir);
  const allRecaps: RecapEntry[] = [];

  for (const file of files) {
    const year = file.replace(".json", "");
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as RecapData;
    for (const recap of data.recaps) {
      allRecaps.push({ year, week: recap.week });
    }
  }

  return {
    props: {
      allRecaps,
    },
  };
}

function Dropdown({ label, options, value, onChange }: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center border px-3 py-2 rounded-md w-full"
      >
        <span>{options.find((opt) => opt.value === value)?.label || label}</span>
        {isOpen ?
          <ChevronUp size={16} className="text-gray-500" /> :
          <ChevronDown size={16} className="text-gray-500" />
        }
      </button>
      {isOpen && (
        <ul
          className="
            absolute left-0 mt-1 w-full border bg-white
            shadow-lg z-10 rounded-md overflow-hidden
          "
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer
                hover:bg-green-100 ${value === opt.value ? "bg-green-50" : ""}`}
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

  useEffect(() => {
    const { sort, search, year } = router.query;
    if (typeof sort === "string") setSortOrder(sort);
    if (typeof search === "string") setSearchTerm(search);
    if (typeof year === "string") setYearFilter(year);
  }, [router.query]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateQuery({ search: value });

    if (/^\d{4}$/.test(value)) {
      setYearFilter("");
      updateQuery({ search: value, year: "" });
    }
  };

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

  const uniqueYears = Array.from(new Set(allRecaps.map((r) => r.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="pt-4 max-w-4xl mx-auto px-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by year or week..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}
          />
        </div>

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

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredRecaps.map((entry, idx) => (
          <motion.li
            key={`${entry.year}-${entry.week}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.03 }}
          >
            <Link
              href={`/recaps/${entry.year}/week-${entry.week}`}
              className="
                block rounded-lg shadow-md
                bg-white hover:bg-green-50
                p-6 text-center transition
                border border-gray-200 hover:border-green-400
                transform transition-transform
                hover:shadow-lg hover:scale-105 hover:-translate-y-1
                flex flex-col justify-center
                min-h-[150px]
              "
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Week {entry.week}
              </h2>
              <p className="text-gray-600">Season {entry.year}</p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
