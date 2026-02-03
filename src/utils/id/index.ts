/**
 * Generates the next sequential SBS ID based on the last ID.
 *
 * The function expects the last ID to follow the format "SBS" followed by digits,
 * e.g., "SBS0001". It increments the numeric part while keeping the same length,
 * padding with leading zeros if necessary.
 *
 * @param {string} lastId - The previous SBS ID (e.g., "SBS0001").
 * @returns {string} The next SBS ID in sequence (e.g., "SBS0002").
 *
 * @throws {Error} Throws an error if `lastId` does not match the expected format.
 *
 * @example
 * generate_SBS_Id("SBS0009"); // returns "SBS0010"
 * generate_SBS_Id("SBS0999"); // returns "SBS1000"
 */
export function generate_SBS_Id(lastId: string): string {
  const match = lastId.match(/^(SBS)(\d+)$/);

  if (!match) {
    throw new Error("ID must start with 'SBS' followed by a number");
  }

  const [, prefix, numberPart] = match;
  const length = numberPart.length;

  const nextNumber = (parseInt(numberPart, 10) + 1)
    .toString()
    .padStart(length, "0");

  return `${prefix}${nextNumber}`;
}
