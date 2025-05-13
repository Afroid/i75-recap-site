import raw2024 from "@/data/recaps/2024.json";
import raw2023 from "@/data/recaps/2023.json";
import raw2022 from "@/data/recaps/2022.json";
import raw2021 from "@/data/recaps/2021.json";
import raw2020 from "@/data/recaps/2020.json";
import { RecapData } from "@/types/types";

// These consts tell TypeScript to treat the JSONs as the RecapData type
const recap2024 = raw2024 as unknown as RecapData;
const recap2023 = raw2023 as unknown as RecapData;
const recap2022 = raw2022 as unknown as RecapData;
const recap2021 = raw2021 as unknown as RecapData;
const recap2020 = raw2020 as unknown as RecapData;

export function getRecaps(): Record<number, number[]> {
  const allData: RecapData[] = [
    recap2024, recap2023, recap2022, recap2021, recap2020
  ]; // Add more years/seasons as needed

  const summary: Record<number, number[]> = {};

  for (const season of allData) {
    summary[season.year] = season.recaps.map((r) => r.week);
  }

  return summary;
}
