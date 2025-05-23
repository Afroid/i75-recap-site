import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/recapsSummary.api";
import { getRecaps } from "@/lib/getRecaps";

// Auto-mocks the entire getRecaps module
jest.mock("@/lib/getRecaps");

describe("GET /api/recapsSummary", () => {
  it("calls getRecaps and returns it as JSON with status 200", async () => {
    // Prepares a mock return value
    const mockSummary = [{ year: 2025, weeks: [1,2,3] }];
    (getRecaps as jest.Mock).mockReturnValue(mockSummary);

    // Dummy request
    const req = {} as NextApiRequest;

    // Spies on res.status().json()
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = { status } as unknown as NextApiResponse;

    // Executes the handler
    await handler(req, res);

    // Asertions
    expect(getRecaps).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(mockSummary);
  });
});
