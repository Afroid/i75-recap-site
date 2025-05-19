import { getRecaps } from "./getRecaps";
import fs from "fs";
import path from "path";

// Mock out the entire RecapDataSchema module, registering the mock
jest.mock("@/lib/recapSchema", () => ({
  RecapDataSchema: {
    // This will make .parse just return its input, so I don’t need a real Zod object
    parse: jest.fn((raw: unknown) => raw),
  },
}));

// Now you get the access to use this in the final test.
import { RecapDataSchema } from "@/lib/recapSchema";

// Mock fs and path however you like
jest.mock("fs");
jest.mock("path");

describe("getRecaps", () => {
  const mockDir = "/project/data/recaps";
  // Use the real join so we can still build paths like normal
  const realPathJoin = jest.requireActual("path").join;

  // Raw data for readFileSync's mock
  const raw = { year: 2024, recaps: [{ week: 1 }, { week: 2 }, { week: 3 }],}

  beforeEach(() => {

    // Spies with mock values
    jest
      .spyOn(path, "resolve")
      .mockReturnValue(mockDir);

    jest
      .spyOn(path, "join")
      .mockImplementation(realPathJoin);

    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(
        JSON.stringify(raw)
      );

    // Pretends there is one .json file and one other file that isn't .json
    (fs.readdirSync as jest.Mock).mockReturnValue([
      "ignore.txt",
      "2024.json",
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("reads .json files, validates them, and returns year→weeks map", () => {
    const result = getRecaps();

    // Checks to see if it looked in the right folder
    expect(path.resolve).toHaveBeenCalledWith(process.cwd(), "data/recaps");

    // Makes sure path.join is called with the right dir and fileName
    expect(path.join).toHaveBeenCalledWith(mockDir, '2024.json');

    // Checks to see that it skipped `notes.txt` and only call readFileSync on `2024.json`
    expect(fs.readFileSync).toHaveBeenCalledWith(
      realPathJoin(mockDir, "2024.json"),
      "utf-8"
    );
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);

    // output maps the year to its [week] array
    expect(result).toEqual({ 2024: [1, 2, 3] });
  });

  it("throws if the raw shape is bad", () => {
    // Override our RecapDataSchema.parse mock to throw an error
    // Grab the mocked parse
    const parseMock = RecapDataSchema.parse as jest.Mock;

    // Make it throw an error
    parseMock.mockImplementation(() => {
      throw new Error("bad schema");
    });

    expect(() => getRecaps()).toThrow("bad schema");
    expect(RecapDataSchema.parse).toHaveBeenCalledWith(raw);
  });
});
