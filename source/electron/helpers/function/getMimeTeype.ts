import { extname, join, normalize } from "node:path";
import { promises, readFile, readFileSync } from "node:fs";

export function getMimeType(filePath: string) {
  const ext = extname(filePath).toLowerCase();
  return (
    {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
    }[ext] || "application/octet-stream"
  );
}
