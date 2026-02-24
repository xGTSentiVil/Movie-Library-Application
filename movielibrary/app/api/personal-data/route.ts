import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const { tmdbId, rating, review } = await req.json();

  const filePath = path.join(process.cwd(), "db.json");

  const fileData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileData);

  const newEntry = {
    id: randomUUID(),
    tmdbId,
    rating,
    review,
  };

  if (!Array.isArray(data.personalData)) {
    data.personalData = [];
  }
  data.personalData.push(newEntry);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return Response.json({ success: true, item: newEntry });
}