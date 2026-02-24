"use client";

import { useEffect, useState } from "react";

import styles from "./AddMovieCard.module.css";

interface Collection {
  id: string;
  name: string;
  movieIds: number[];
}

interface AddMovieCardProps {
  tmdbId: number;
}

export default function AddMovieCard({ tmdbId }: AddMovieCardProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");

  // Fetch collections
  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1️⃣ Add movie to collection
    await fetch("/api/collections/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId: selectedCollection,
        tmdbId,
      }),
    });

    // 2️⃣ Save personal review
    await fetch("/api/personal-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tmdbId,
        rating,
        review,
      }),
    });

    alert("Movie added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
        <h3 className={styles.title}>Add Movie</h3>

        <label className={styles.label}>Collection</label>
        <select
            className={styles.select}
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            required
        >
            <option value="">Select Collection</option>
            {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
                {collection.name}
            </option>
            ))}
        </select>

        <label className={styles.label}>Rating</label>
        <input
            className={styles.input}
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
        />

        <label className={styles.label}>Remark</label>
        <textarea
            className={styles.textarea}
            value={review}
            onChange={(e) => setReview(e.target.value)}
        />

        <button type="submit" className={styles.button}>
            Add to Collection
        </button>
    </form>    
    );
}