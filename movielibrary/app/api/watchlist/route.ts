import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tmdbId } = body;

    if (!tmdbId) {
      return NextResponse.json(
        { error: "tmdbId required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "db.json");
    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const movieId = Number(tmdbId);

    // Prevent duplicates
    if (!data.watchlist.includes(movieId)) {
      data.watchlist.push(movieId);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Watchlist add error:", error);
    return NextResponse.json(
      { error: "Add failed" },
      { status: 500 }
    );
  }
}