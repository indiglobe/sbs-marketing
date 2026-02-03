import { describe, it, expect } from "vitest";
import { generate_SBS_Id } from "./index";

describe("generateNextId", () => {
  it("increments SBS ID correctly", () => {
    expect(generate_SBS_Id("SBS00001")).toBe("SBS00002");
  });

  it("handles rollover from 9 to 10", () => {
    expect(generate_SBS_Id("SBS00009")).toBe("SBS00010");
  });

  it("preserves zero padding", () => {
    expect(generate_SBS_Id("SBS00999")).toBe("SBS01000");
  });

  it("throws error if prefix is not SBS", () => {
    expect(() => generate_SBS_Id("ABC00001")).toThrow(
      "ID must start with 'SBS' followed by a number",
    );
  });

  it("throws error if format is invalid", () => {
    expect(() => generate_SBS_Id("SBS")).toThrow();
    expect(() => generate_SBS_Id("SBS12A34")).toThrow();
    expect(() => generate_SBS_Id("sbs00001")).toThrow();
  });
});
