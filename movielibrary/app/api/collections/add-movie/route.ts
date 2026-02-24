import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const { collectionId, tmdbId } = await req.json();

  // Path to your db.json
  const filePath = path.join(process.cwd(), "db.json");

  // Read the file and parse JSON
  const fileContents = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);

  // Find the collection by id
  const collectionIndex = data.collections.findIndex(
    (c: any) => c.id === collectionId
  );

  if (collectionIndex === -1) {
    return Response.json(
      { error: "Collection not found" },
      { status: 404 }
    );
  }

  // Update the movieIds array
  const collection = data.collections[collectionIndex];
  collection.movieIds = [...collection.movieIds, tmdbId];

  // Save the updated JSON back to db.json
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return Response.json({ success: true, updatedCollection: collection });
}