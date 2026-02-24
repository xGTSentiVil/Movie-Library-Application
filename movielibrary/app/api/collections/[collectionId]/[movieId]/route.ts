import { NextRequest,NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ collectionId: string; movieId: string }> }
) {
  const { movieId, collectionId} = await context.params;
  const filePath = path.join(process.cwd(), "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const movieIds = Number(movieId);

  const collection = data.collections.find(
    (c: any) => String(c.id) === collectionId
  );

  if (!collection) {
    return NextResponse.json(
      { message: "Collection not found" },
      { status: 404 }
    );
  }

  collection.movieIds = collection.movieIds.filter(
    (id: number) => id !== movieIds
  );

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "Removed from collection" });
}