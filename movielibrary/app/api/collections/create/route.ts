import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const filePath = path.join(process.cwd(), "db.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const newCollection = {
    id: randomUUID(),
    name,
    movieIds: [],
  };

  data.collections.push(newCollection);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(newCollection);
}