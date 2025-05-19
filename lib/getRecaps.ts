import fs from "fs";
import path from "path";
import { RecapDataSchema } from "@/lib/recapSchema";
import { RecapData } from "@/types/types";

/**
 * Reads all recap JSON files from `data/recaps/`, validates them,
 * and returns a mapping of year → list of week numbers available.
 */
export function getRecaps(): Record<number, number[]> {
  // Computes the absolute directory path where recap JSONs live
  const recapsDir = path.resolve(process.cwd(), "data/recaps");

  // Initializes the summary object: { [year]: [week, week, …] }
  const summary: Record<number, number[]> = {};

  // Loops over every filename in the recaps directory
  for (const fileName of fs.readdirSync(recapsDir)) {
    // Skips any non-JSON files
    if (!fileName.endsWith(".json")) continue;

    // Reads & parse the raw JSON text
    const raw = JSON.parse(
      fs.readFileSync(path.join(recapsDir, fileName), "utf-8")
    );

    // Validates against our Zod schema and cast to RecapData
    // This ensures we have `year: number` and `recaps: { week: number; … }[]`
    // Ensure we have the correct/exact shape
    const data: RecapData = RecapDataSchema.parse(raw);

    // Populates the summary: uses the year as the key,
    // and collects all the week numbers for that year
    summary[data.year] = data.recaps.map((r) => r.week);
  }

  // Return the complete year→weeks mapping
  return summary;
}
