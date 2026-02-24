import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const { collectionId, tmdbId } = await req.json();

  const filePath = path.join(process.cwd(), "db.json");

  const fileContents = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);

  const collectionIndex = data.collections.findIndex(
    (c: any) => c.id === collectionId
  );

  if (collectionIndex === -1) {
    return Response.json(
      { error: "Collection not found" },
      { status: 404 }
    );
  }

  const collection = data.collections[collectionIndex];

  const movieId = Number(tmdbId);

  // ✅ Prevent duplicates
  if (!collection.movieIds.includes(movieId)) {
    collection.movieIds.push(movieId);
  }

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return Response.json({
    success: true,
    updatedCollection: collection,
  });
}