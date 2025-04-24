import { GetStaticPaths, GetStaticProps } from "next";
import RecapLayout from "@/components/RecapLayout";
import { RecapData, RecapWeek } from "@/types/types";
import fs from "fs";
import path from "path";

interface Props {
  recap: RecapWeek | null;
}

// Page component: renders the recap layout for the given week.
// If no recap is found, displays a fallback message.
export default function RecapPage({ recap }: Props) {
  if (!recap) return <div>Recap not found</div>;
  return <RecapLayout recap={recap} />;
}

// getStaticPaths: generates all valid routes for [year]/[week] based on JSON files in /data/recaps.
// This ensures Next.js pre-renders all the recap pages at build time.
export const getStaticPaths: GetStaticPaths = async () => {
  // Absolute path to the /data/recaps directory
  const recapDir = path.join(process.cwd(), "data", "recaps");

  // Read all filenames (e.g., 2024.json, 2023.json, etc.)
  const files = fs.readdirSync(recapDir);

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

// getStaticProps: loads recap content for the given [year]/[week] params.
// Dynamically reads the appropriate JSON file and finds the correct week's recap.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const weekStr = params?.week as string;

  const week = parseInt(weekStr.replace("week-", ""));

  try {
    // Build absolute file path to the correct recap JSON file
    const filePath = path.join(process.cwd(), "data", "recaps", `${year}.json`);

    // Read and parse the JSON content
    const raw = fs.readFileSync(filePath, "utf-8");
    const data: RecapData = JSON.parse(raw);

    // Find the specific recap entry for the requested week
    const recap = data.recaps.find((r) => r.week === week) || null;

    // Pass the recap data to the page component as a prop
    return {
      props: {
        recap,
      },
    };
  } catch (err) {
    // If file doesn't exist or something goes wrong, return 404
    return {
      notFound: true,
    };
  }
};
