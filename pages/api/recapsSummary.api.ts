import type { NextApiRequest, NextApiResponse } from "next";
import { getRecaps } from "@/lib/getRecaps";  // The fs + Zod loader

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const summary = getRecaps();
  res.status(200).json(summary);
}
