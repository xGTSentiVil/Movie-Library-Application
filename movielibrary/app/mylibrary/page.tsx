import MovieCard from "@/app/components/MovieCard";

type PersonalData = {
  tmdbId: number;
  rating: number;
  review: string;
};

type Collection = {
  id: string;
  name: string;
  movieIds: number[];
};

type LibraryData = {
  watchlist: number[];
  collections: Collection[];
  personalData: PersonalData[];
};

async function getLibraryData(): Promise<LibraryData> {
  const res = await fetch("http://localhost:3000/api/mylibrary", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch library data");
  }

  return res.json();
}

async function getMovie(id: number) {
  const res = await fetch(
    `http://localhost:3000/api/movies/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function MyLibrary() {
  const data = await getLibraryData();

  const { watchlist, collections, personalData } = data;

  // -----------------------
  // WATCHLIST
  // -----------------------

  const watchlistMovies = await Promise.all(
    watchlist.map((id) => getMovie(id))
  );

  const validWatchlist = watchlistMovies.filter(Boolean);

  // -----------------------
  // COLLECTIONS
  // -----------------------

  const collectionData = await Promise.all(
    collections.map(async (collection) => {
      const movies = await Promise.all(
        collection.movieIds.map((id) => getMovie(id))
      );

      const validMovies = movies
        .filter(Boolean)
        .map((movie) => {
          const personal = personalData.find(
            (p) => p.tmdbId === movie.id
          );

          return {
            ...movie,
            personalRating: personal?.rating ?? null,
            personalReview: personal?.review ?? null,
          };
        });

      return {
        ...collection,
        movies: validMovies,
      };
    })
  );

  const validCollections = collectionData.filter(
    (c) => c.movies.length > 0
  );

  // -----------------------
  // RENDER
  // -----------------------

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Library</h1>

      {/* WATCHLIST */}
      {validWatchlist.length > 0 && (
        <>
          <h2>Watchlist</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {validWatchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                id={String(movie.id)}
                title={movie.title}
                rating={movie.vote_average}
                voters={movie.vote_count}
                desc={movie.overview}
                imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                imageAlt={movie.title}
              />
            ))}
          </div>
        </>
      )}

      {/* COLLECTIONS */}
      {validCollections.map((collection) => (
        <div key={collection.id} style={{ marginTop: "3rem" }}>
            <h2>{collection.name}</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {collection.movies.map((movie) => (
                <div key={`${collection.id}-${movie.id}`}>
                <MovieCard
                    id={String(movie.id)}
                    title={movie.title}
                    rating={movie.vote_average}
                    voters={movie.vote_count}
                    desc={movie.overview}
                    imageSrc={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-image.png"
                    }
                    imageAlt={movie.title}
                />

                {movie.personalRating && (
                    <div style={{ marginTop: "0.5rem" }}>
                    ⭐ Your Rating: {movie.personalRating}
                    <br />
                    📝 {movie.personalReview}
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        ))}

      {validWatchlist.length === 0 &&
        validCollections.length === 0 && (
          <p>No movies added yet.</p>
        )}
    </div>
  );
}


// export default async function MyLibrary() {

//   return (
//     <div>
//       <h1>My Library</h1>
//     </div>
//     );
// }








// export default async function myLibrary(){
//     let data = null
//         const res = await fetch("http://localhost:3000/api/mylibrary", {
//             cache: "no-store",
//         });
//         data = await res.json()
//         console.log(data)
//     return(        
//         <h1>My Library</h1>
//     );
// }





