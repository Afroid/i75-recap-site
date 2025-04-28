import fs from "fs";
import path from "path";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { RecapData } from "@/types/types";
import { motion } from "framer-motion";

interface Props {
  year: number;
  weeks: number[];
}

export default function YearPage({ year, weeks }: Props) {
  return (
    <div className="pt-4 max-w-2xl mx-auto">

      <div className="text-center">
        <div className="inline-block">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
            {year} Season Recaps
          </h1>

          {/* This is the underline with a gradient from light green to darker green*/}
          <div className="
                h-1 w-full
                bg-gradient-to-r from-green-300 to-green-700 rounded-full
                mb-6
              "
          />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {weeks.map((week, idx) => (
          <motion.li
            key={week}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <Link
              href={`/recaps/${year}/week-${week}`}
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
