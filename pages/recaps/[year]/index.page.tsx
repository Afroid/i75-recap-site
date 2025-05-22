import fs from "fs";
import path from "path";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { RecapData } from "@/types/types";
import { motion } from "framer-motion";
import { TestIds } from "@/lib/testIds";

interface Props {
  year: number;
  weeks: number[];
}

/**
 * YearPage
 * Renders a grid of recap links for a given season year.
 */
export default function YearPage({ year, weeks }: Props) {
  return (
    <div data-testid={TestIds.YEAR_PAGE} className="pt-4 max-w-2xl mx-auto">

      {/* Page Title */}
      <div className="text-center">
        <div className="inline-block">
          <h1
            data-testid={TestIds.YEAR_TITLE}
            className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2"
          >
            {year} Season Recaps
          </h1>

          {/* This is the underline with a gradient from light green to darker green*/}
          <div
            className={[
              "h-1 w-full",
              "bg-gradient-to-r from-green-300 to-green-700 rounded-full",
              "mb-6"
            ].join(" ")}
          />
        </div>
      </div>

      {/* Week List Grid */}
      <ul data-testid={TestIds.YEAR_WEEK_LIST} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {weeks.map((week, idx) => (
          <motion.li
            key={week}
            data-testid={`${TestIds.YEAR_WEEK_ITEM}-${week}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <Link
              data-testid={`${TestIds.YEAR_WEEK_LINK}-${week}`}
              href={`/recaps/${year}/week-${week}`}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Week {week}
              </h2>
              <p className="text-gray-600">View Recap</p>
            </Link>
          </motion.li>
        ))}
      </ul>

    </div>
  );
}

/**
 * getStaticPaths:
 * Builds a list of all possible [year] routes by reading the
 * filenames in data/recaps and converting “YYYY.json” into params.year = "YYYY".
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Compute the absolute path to the `data/recaps` folder in your project
  const recapDir = path.join(process.cwd(), "data", "recaps");

  // Read every file in data/recaps folder
  const allFiles = fs.readdirSync(recapDir);

  // Filter to only the JSON files (ignore any README.md, .DS_Store, etc.)
  const jsonFiles = allFiles.filter((filename) => filename.endsWith(".json"));

  // Map each JSON filename to a `params` object `{ params: { year } }`
  // so Next can statically generate /recaps/2023, /recaps/2022, etc.
  const paths = jsonFiles.map((file) => {
    // Strip off the .json extension to get the year string
    const year = file.replace(/\.json$/, "");
    return {
      params: { year },
    };
  });

  return {
    paths,            // e.g. [ { params: { year: "2023" } }, { params: { year: "2022" } } ]
    fallback: false,  // any non-listed route → 404
  };
};

/**
 * getStaticProps:
 * Given a route param { year }, load that year’s JSON file and
 * extract just the week numbers to pass into the page as props.
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Grab the year from the URL params (e.g. "2023")
  const year = params?.year as string;

  // Build the exact path to that year’s JSON file:
  // <project-root>/data/recaps/2023.json
  const filePath = path.join(process.cwd(), "data", "recaps", `${year}.json`);

  // Read the file contents (utf-8 text)
  const raw = fs.readFileSync(filePath, "utf-8");

  // Parse through the JSON into our RecapData type:
  // { year: 2023, recaps: [ { week: 1, … }, { week: 2, … }, … ] }
  const data: RecapData = JSON.parse(raw);

  // Pull out the list of week numbers for easier rendering:
  const weeks = data.recaps.map((recap) => recap.week);

  return {
    props: {
      year: data.year,  // e.g. 2023 (as a number)
      weeks,            // e.g. [1, 2, 3, …]
    },
  };
};

