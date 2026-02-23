import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("movie");
  if (!query) {
    return NextResponse.json(
      { error: "Query is required" },
      { status: 400 }
    );
  }
  
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB API key is missing" },
      { status: 500 }
    );
  }

  try{
    const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );  

  if (!res.ok) {
      return NextResponse.json(
        { error: `TMDB API Error: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }
    const data = await res.json();    
    return NextResponse.json(data);

  }
  catch (err : any) {
    return NextResponse.json(
      { error: "Failed to fetch data from TMDB", details: err.message },
      { status: 500 }
    );
  };


}