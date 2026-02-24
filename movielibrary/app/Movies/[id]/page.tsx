import Link from "next/link";
import { notFound } from "next/navigation";
import AddOverlayWrapper from "./AddOverlayWrapper";
import styles from "./SpecMoviePage.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

console.log("API KEY:", process.env.TMDB_API_KEY);

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return notFound();

  const movieRes = await fetch(
    `${TMDB_BASE}/movie/${id}?api_key=${apiKey}`,
    { cache: "no-store" }
  );
  const videoRes = await fetch(
    `${TMDB_BASE}/movie/${id}/videos?api_key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!movieRes.ok) return notFound();

  const movie = await movieRes.json();
  const videos = await videoRes.json();

  const trailer = videos.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className={styles.page}>

      {/* TOP SECTION */}
      <div className={styles.topBar}>

        {/* Home Button */}
        <div className={styles.homeBox}>
          <Link href="/" className={styles.homeLink}>Home</Link>
        </div>

        {/* Add Button */}
        <AddOverlayWrapper tmdbId={Number(id)} />
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.mainContent}>

        {/* Poster */}
        <div className={styles.posterBox}>
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            width={300}
            className={styles.posterImg}
          />
        </div>

        {/* Trailer */}
        <div className={styles.trailerBox}>
          {trailer ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              className={styles.trailerFrame}
            />
          ) : (
            <p className={styles.noTrailer}>No Trailer Available</p>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.bottomSection}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.rating}><strong>Rating:</strong> {movie.vote_average}</p>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </div>
  );
}