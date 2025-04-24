import { GetStaticPaths, GetStaticProps } from "next";
import RecapLayout from "@/components/RecapLayout";
import recap2024 from "@/data/recaps/2024.json";
import { RecapData, RecapWeek } from "@/types/types";

interface Props {
  recap: RecapWeek | null;
}

export default function RecapPage({ recap }: Props) {
  if (!recap) return <div>Recap not found</div>;
  return <RecapLayout recap={recap} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Eventually loop over all files in /data
  const data: RecapData = recap2024; // Just 2024 for now
  const paths = data.recaps.map((recap) => ({
    params: {
      year: String(data.year),
      week: `week-${recap.week}`,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const weekStr = params?.week as string;

  const week = parseInt(weekStr.replace("week-", ""));
  let data: RecapData;

  // Basic example, eventually dynamically import based on year
  if (year === "2024") {
    data = recap2024;
  } else {
    return { notFound: true };
  }

  const recap = data.recaps.find((r) => r.week === week) || null;

  return {
    props: {
      recap,
    },
  };
};
