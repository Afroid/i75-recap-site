import type { NextApiRequest, NextApiResponse } from "next";
import { getRecaps } from "@/lib/getRecaps";

/**
 * API Route: GET /api/recapsSummary
 *
 * Loads and returns the full list of recap summaries.
 *
 * @param _req  – Standard Next.js request object (unused here, hence the underscore)
 * @param res   – Next.js response helper, for status codes & JSON
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Retrieve all recap data via our filesystem and Zod loader
  const summary = getRecaps();

  // Send back a 200 OK with the array of recap summaries as JSON
  res.status(200).json(summary);
}
