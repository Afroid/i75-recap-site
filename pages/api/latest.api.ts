import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

type Scores = Record<string, number>
type ApiError = { error: string }
type ApiResponse = Scores | ApiError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  try {
    const league = Array.isArray(req.query.league)
      ? req.query.league[0]
      : req.query.league || "mlb"

    const key = `leagues/${league}/latest.json`;

    // Forces the SDK to use the env credentials, not AWS_PROFILE
    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Fetch object from S3
    const output = await client.send(
      new GetObjectCommand({ Bucket: process.env.SCORES_BUCKET!, Key: key })
    )

    const body = output.Body
    if (!(body instanceof Readable)) {
      throw new Error("Unexpected S3 object body")
    }

    // Read stream into buffer array
    const chunks: Buffer[] = []
    for await (const chunk of body) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    }

    // Concatenate and parse JSON
    const jsonText = Buffer.concat(chunks).toString("utf8");

    // Parse & return
    const data = JSON.parse(jsonText) as Scores;

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")

    return res.status(200).json(data)
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Failed to fetch latest scores" });
  }
}
