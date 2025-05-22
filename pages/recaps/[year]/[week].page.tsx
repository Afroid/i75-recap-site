import { GetStaticPaths, GetStaticProps } from "next";
import RecapLayout from "@/components/RecapLayout";
import { RecapData, RecapWeek } from "@/types/types";
import fs from "fs";
import path from "path";
import { TestIds } from "@/lib/testIds";

interface Props {
  recap: RecapWeek | null;
  year: string;
}

/**
 * RecapPage:
 * Renders a specific week recap via RecapLayout or shows a fallback.
 */
export default function RecapPage({ recap, year }: Props) {
  if (!recap) return <div data-testid={TestIds.RECAP_NOT_FOUND}>Recap not found</div>;
  return (
    <div data-testid={TestIds.RECAP_PAGE}>
      <RecapLayout recap={recap} year={year} />
    </div>
  );
}

/**
 * getStaticPaths:
 * Build all /recaps/[year]/[week] routes from JSON files in data/recaps.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Absolute path to the /data/recaps directory
  const recapDir = path.join(process.cwd(), "data", "recaps");

  // Read all filenames but filter to only JSON files (e.g., 2024.json, 2023.json, etc.)
  const files = fs
    .readdirSync(recapDir)
    .filter((f) => f.endsWith(".json"));

  const paths: { params: { year: string; week: string } }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(recapDir, file), "utf-8");
    const data: RecapData = JSON.parse(raw);

    data.recaps.forEach((recap) => {
      paths.push({
        params: {
          year: String(data.year),
          week: `week-${recap.week}`,
        },
      });
    });
  }

  return {
    paths,
    fallback: false, // fallback: false ensures only defined paths will render; all others 404
  };
};

/**
 * getStaticProps:
 * Fetch the JSON for the given year
 * Dynamically reads the JSON and returns the correct week's recap
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Grab the year from the URL params (e.g. "2023")
  const year = params?.year as string;
  const weekStr = params?.week as string;

  const week = parseInt(weekStr.replace("week-", ""));

  try {
    // Build the exact path to that year’s JSON file:
    // <project-root>/data/recaps/2023.json
    const filePath = path.join(process.cwd(), "data", "recaps", `${year}.json`);

    // Read the file contents (utf-8 text)
    const raw = fs.readFileSync(filePath, "utf-8");

    // Parse through the JSON into our RecapData type:
    // { year: 2023, recaps: [ { week: 1, … }, { week: 2, … }, … ] }
    const data: RecapData = JSON.parse(raw);

    // Find the specific recap entry for the requested week
    const recap = data.recaps.find((r) => r.week === week) || null;

    // Pass the recap data to the page component as a prop
    return {
      props: {
        recap,
        year,
      },
    };
  } catch {
    // If the file doesn't exist or something goes wrong, return 404.tsx page.
    return {
      notFound: true,
    };
  }
};
