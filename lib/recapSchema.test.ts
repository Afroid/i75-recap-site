import { RecapDataSchema } from "../lib/recapSchema";
import { ZodError } from "zod";

describe("RecapDataSchema", () => {
  // Valid section with valid types
  const minimalValid = {
    year: 2025,
    recaps: [
      {
        week: 1,
        title: "Week One",
        sections: [
          { type: "intro", intro: "Welcome!" },
          {
            type: "gameNotes",
            matchups: [
              {
                team1: "A", score1: 10,
                team2: "B", score2: 7,
                breakdown: "Tight game"
              }
            ]
          }
        ],
      },
    ],
  };

  it("parses a minimal valid recap data object - Smoke Test (happy path)", () => {
    expect(() => RecapDataSchema.parse(minimalValid)).not.toThrow();
  });

  it("throws if there is a wrong type - Smoke Test (failure path)", () => {
    // Making a bad year type
    // Error code: invalid_type
    const missingYear = { ...minimalValid, year: "not-a-number" };

    // This is a little overkill but we want to catch the error thrown
    let thrown: unknown;
    try {
      RecapDataSchema.parse(missingYear);
    } catch (err) {
      thrown = err;
    }

    // We did throw something…
    expect(thrown).toBeInstanceOf(ZodError);

    // …and it’s a ZodError
    const zodErr = thrown as ZodError;

    expect(() => RecapDataSchema.parse(missingYear)).toThrow();

    // Assertions on Zod error specifics
    const issue = zodErr.errors[0];
    expect(issue.code).toBe("invalid_type");
    expect(issue.message).toContain("Expected number, received string");
  });

  it("throws if required fields are missing - Smoke Test (failure path)", () => {
    // Making a bad section with an invalid type
    // Error Code: invalid_union_discriminator
    const badSection: unknown = {
      year: 2025,
      recaps: [{
        week: 1,
        title: "Bad",
        sections: [{ type: "what-ever" }],
      }],
    };

    // This is a little overkill but we want to catch the error thrown
    let thrown: unknown;
    try {
      RecapDataSchema.parse(badSection);
    } catch (err) {
      thrown = err;
    }

    // We did throw something…
    expect(thrown).toBeInstanceOf(ZodError);

    // …and it’s a ZodError
    const zodErr = thrown as ZodError;

    expect(() => RecapDataSchema.parse(badSection)).toThrow();

    // Assertions on Zod error specifics
    const issue = zodErr.errors[0];
    expect(issue.code).toBe("invalid_union_discriminator");
    expect(issue.message).toContain("Invalid discriminator value");
  });
});
