import fs from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "db.json");
  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  return Response.json(data);
}