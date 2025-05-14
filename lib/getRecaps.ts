import fs from "fs";
import path from "path";
import { RecapDataSchema } from "@/lib/recapSchema";
import { RecapData } from "@/types/types";

export function getRecaps(): Record<number, number[]> {
  const recapsDir = path.resolve(process.cwd(), "data/recaps");
  const summary: Record<number, number[]> = {};

  for (const fileName of fs.readdirSync(recapsDir)) {
    if (!fileName.endsWith(".json")) continue;

    const raw = JSON.parse(
      fs.readFileSync(path.join(recapsDir, fileName), "utf-8")
    );

    // Parse & validate — this returns the exact shape of RecapData
    const data: RecapData = RecapDataSchema.parse(raw);

    summary[data.year] = data.recaps.map((r) => r.week);
  }

  return summary;
}
