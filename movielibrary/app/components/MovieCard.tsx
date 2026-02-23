'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './MovieCard.module.css';

type MovieCardProps = {
  title: string;
  rating: number;
  voters: number;
  imageSrc: string;
  imageAlt?: string;
};

export default function MovieCard({
  title,
  rating,
  voters,
  imageSrc,
  imageAlt = 'Movie poster',
}: MovieCardProps) {
  const [watchLater, setWatchLater] = useState(false);

  const fullStars = Math.floor(rating / 2);
  const hasHalf = rating / 2 - fullStars >= 0.5;

  return (
    <div className={styles.card}>
      <div className={styles.posterWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <button
          className={`${styles.watchLaterBtn} ${watchLater ? styles.active : ''}`}
          onClick={() => setWatchLater(!watchLater)}
          title={watchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
        >
          {watchLater ? '✓' : '+'}
        </button>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.ratingRow}>
          <Stars total={5} filled={fullStars} half={hasHalf} />
          <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
          <span className={styles.voters}>({formatVoters(voters)})</span>
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