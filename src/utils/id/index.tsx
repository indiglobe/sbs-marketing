export function getNextId(lastId?: string) {
  const PREFIX = "SBS";
  const MAX_LENGTH = 8;
  const NUMBER_LENGTH = MAX_LENGTH - PREFIX.length; // 5 digits

  if (!lastId) {
    return PREFIX + "0".repeat(NUMBER_LENGTH);
  }

  if (!lastId.startsWith(PREFIX)) {
    throw new Error("Invalid ID format");
  }

  const numericPart = lastId.slice(PREFIX.length);
  const nextNumber = parseInt(numericPart, 10) + 1;

  if (nextNumber >= Math.pow(10, NUMBER_LENGTH)) {
    throw new Error("ID limit exceeded (max 5 digits)");
  }

  return PREFIX + String(nextNumber).padStart(NUMBER_LENGTH, "0");
}
