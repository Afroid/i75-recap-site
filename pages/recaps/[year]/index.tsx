import fs from "fs";
import path from "path";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { RecapData } from "@/types/types";

interface Props {
  year: number;
  weeks: number[];
}

export default function YearPage({ year, weeks }: Props) {
  return (
    <div className="pt-4 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Recaps for {year}</h1>
      <ul className="space-y-2">
        {weeks.map((week) => (
          <li key={week}>
            <Link
              href={`/recaps/${year}/week-${week}`}
              className="text-blue-600 hover:underline text-lg"
            >
              Week {week} Recap
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "data", "recaps");
  const files = fs.readdirSync(dir);

  const paths = files.map((file) => {
    const year = file.replace(".json", "");
    return {
      params: { year },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const filePath = path.join(process.cwd(), "data", "recaps", `${year}.json`);

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: RecapData = JSON.parse(raw);

  return {
    props: {
      year: data.year,
      weeks: data.recaps.map((r) => r.week),
    },
  };
};
