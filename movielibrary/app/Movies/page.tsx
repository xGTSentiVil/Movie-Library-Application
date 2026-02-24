import MovieCard from "../components/MovieCard";
import MobiePageStyle from "./MoviesPage.module.css";

type MoviesPageProps = {
  searchParams: Promise<{ movie?: string }>
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const searchMovie = params.movie;

  let data = null;

  if (searchMovie) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies?movie=${searchMovie}`,
        { cache: "no-store" }
      );
      data = await response.json();
      console.log("Data received from backend:", data);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  }

    return (
    <main className={MobiePageStyle.movieCardsPage}>
      {data?.results?.map((movie: any) => (
        <MovieCard
          key={movie.id}
          id = {String(movie.id)}
          title={movie.title}
          rating={movie.vote_average}
          voters={movie.vote_count}
          desc={movie.overview}
          imageSrc={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/Images/no-image.png"
          }
        />
      ))}
    </main>
  );


}
