import { NextRequest,NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{id: string }> }
) {
    
  const { id } = await context.params;
  const filePath = path.join(process.cwd(), "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const movieId = Number(id);

  data.watchlist = data.watchlist.filter(
    (id: number) => id !== movieId
  );

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "Removed from watchlist" });
}