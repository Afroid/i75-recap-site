import fs from "fs";
import path from "path";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RecapData } from "@/types/types";

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

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYearFilter(selectedYear);
    setSearchTerm("");
    updateQuery({ year: selectedYear, search: "" });
  };

  const filteredRecaps = allRecaps
    .filter((entry) => {
      const combinedText = `${entry.year} season week ${entry.week}`.toLowerCase();
      const matchesSearch = searchTerm.trim()
        ? combinedText.includes(searchTerm.trim().toLowerCase())
        : true;
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
        <input
          type="text"
          placeholder="Search by year or week..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded-md w-full sm:max-w-xs"
        />

        <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto sm:gap-4 sm:items-center">
          <div className="flex justify-between w-full sm:w-auto sm:gap-4">
            <select
              value={yearFilter}
              onChange={handleYearChange}
              className="border px-3 py-2 rounded-md w-[48%] sm:w-auto"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                updateQuery({ sort: e.target.value });
              }}
              className="border px-3 py-2 rounded-md w-[48%] sm:w-auto"
            >
              <option value="desc">Latest to Oldest</option>
              <option value="asc">Oldest to Latest</option>
            </select>
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
