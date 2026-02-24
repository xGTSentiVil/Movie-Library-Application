import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key missing" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "TMDB fetch failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}