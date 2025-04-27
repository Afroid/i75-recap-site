import recap2024 from "@/data/recaps/2024.json";
import recap2023 from "@/data/recaps/2023.json";
import recap2022 from "@/data/recaps/2022.json";
import recap2021 from "@/data/recaps/2021.json";
import recap2020 from "@/data/recaps/2020.json";
import { RecapData } from "@/types/types";

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
