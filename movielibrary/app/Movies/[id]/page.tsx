import AddMovieCard from "@/app/components/AddMovieCard";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function specMoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  console.log("Movie ID:", id);

  let data = null;
  let trailData = null;

  const apiKey = process.env.TMDB_API_KEY;
  if(!apiKey){
    console.error("API KEY NOT FOUND");
  }
  else{
    console.log(`API IS PRESENT ${apiKey}`)
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/movies/${id}`,
      { cache: "no-store" }
    );

    const trailRes = await fetch(
      `http://localhost:3000/api/movies/${id}/videos`,
      { cache: "no-store" }
    );

    if (!trailRes.ok) {
        const errorText = await trailRes.text();
        console.error("Video API error:", errorText);
        trailData = { results: [] }; // fallback
    } else {
        trailData = await trailRes.json();
    }
    data = await response.json();
    console.log(data)
    console.log(trailData)
  } catch (error) {
    console.error("Something went wrong:", error);
  }
    return (
        <div>
            <p>This is specific Page website</p>
            <AddMovieCard tmdbId = {Number(id)}></AddMovieCard>
        </div>
  );


}
