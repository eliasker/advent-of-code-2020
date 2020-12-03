const fs = require("fs");

// TODO: error handling
export const readLines = (path: string): string[] => {
  const text = fs.readFileSync(`${path}`, "utf-8");
  const lines = text.split(/\r?\n/);
  return lines;
};
