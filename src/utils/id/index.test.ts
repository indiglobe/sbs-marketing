import { describe, it, expect } from "vitest";
import { generateNumericId } from "./index";

describe("generateNumericId", () => {
  it("returns a string", () => {
    const id = generateNumericId();
    expect(typeof id).toBe("string");
  });

  it("returns exactly 8 characters", () => {
    const id = generateNumericId();
    expect(id).toHaveLength(8);
  });

  it("contains numbers only", () => {
    const id = generateNumericId();
    expect(id).toMatch(/^\d{8}$/);
  });

  it("generates different values on multiple calls", () => {
    const id1 = generateNumericId();
    const id2 = generateNumericId();

    expect(id1).not.toBe(id2);
  });

  it("generates unique IDs across multiple runs", () => {
    const ids = new Set<string>();

    for (let i = 0; i < 1_000; i++) {
      ids.add(generateNumericId());
    }

    expect(ids.size).toBe(1_000);
  });
});
