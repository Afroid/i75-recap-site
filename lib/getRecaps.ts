import recap2024 from "@/data/recaps/2024.json";
import recap2023 from "@/data/recaps/2023.json";
import { RecapData } from "@/types/types";

export function getRecaps(): Record<number, number[]> {
  const allData: RecapData[] = [recap2024, recap2023]; // Add more as needed
  const summary: Record<number, number[]> = {};

  for (const season of allData) {
    summary[season.year] = season.recaps.map((r) => r.week);
  }

  return summary;
}
