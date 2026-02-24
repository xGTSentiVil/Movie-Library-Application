'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './MovieCard.module.css';
import Link from "next/link";

type MovieCardProps = {
  id : string;
  title: string;
  rating: number;
  voters: number;
  desc : string;
  imageSrc: string;
  imageAlt?: string;
};

export default function MovieCard({
  id,
  title,
  rating,
  voters,
  desc,
  imageSrc,
  imageAlt = 'Movie poster',
}: MovieCardProps) {
  const [watchLater, setWatchLater] = useState(false);

  const safeRating = rating ?? 0;
  const fullStars = Math.floor(safeRating / 2);
  const hasHalf = safeRating / 2 - fullStars >= 0.5;

  return (
    <div className={styles.card}>
        <div className={styles.posterWrapper}>
          <Link href={`/movies/${id}`} className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 240px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </Link>

          <button
            className={`${styles.watchLaterBtn} ${watchLater ? styles.active : ''}`}
            onClick={async (e) => {
              e.stopPropagation(); // VERY IMPORTANT
              e.preventDefault();

              if (!watchLater) {
                await addWatchLater({
                  id,
                  title,
                  rating,
                  voters,
                  desc,
                  imageSrc,
                  imageAlt,
                });
              } else {
                await removeWatchLater(id);
              }
              setWatchLater(!watchLater);
            }}
          >
            {watchLater ? '✓' : '+'}
          </button>
        </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.ratingRow}>
          <Stars total={5} filled={fullStars} half={hasHalf} />
          <span className={styles.ratingNum}>{rating ? rating.toFixed(1) : "N/A"}</span>
          <span className={styles.voters}>({voters ? formatVoters(voters) : 0})</span>
        </div>
      </div>
  </div>
  );
}

function Stars({ total, filled, half }: { total: number; filled: number; half: boolean }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: total }).map((_, i) => {
        if (i < filled) return <span key={i} className={styles.starFull}>★</span>;
        if (i === filled && half) return <span key={i} className={styles.starHalf}>★</span>;
        return <span key={i} className={styles.starEmpty}>★</span>;
      })}
    </span>
  );
}

function formatVoters(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

const addWatchLater = async (movie: MovieCardProps) => {
  await fetch("http://localhost:4000/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
  });
  console.log(movie)
}


const removeWatchLater = async (id: string) => {
  await fetch(`http://localhost:4000/watchlist/${id}`, {
    method: "DELETE",
  });
};