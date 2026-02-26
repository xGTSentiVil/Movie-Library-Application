"use client";

import { useEffect, useState } from "react";
import styles from "./AddMovieCard.module.css";

interface Collection {
  id: string;
  name: string;
  movieIds: number[];
}

interface Props {
  tmdbId: number;
  onClose?: () => void;
}

export default function AddMovieCard({ tmdbId, onClose }: Props) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let collectionId = selectedCollection;

    if (newCollectionName.trim()) {
      const res = await fetch("/api/collections/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCollectionName }),
      });

      const newCollection = await res.json();
      collectionId = newCollection.id;
    }

    await fetch("/api/collections/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId,
        tmdbId,
      }),
    });

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

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h3 className={styles.title}>Add Movie</h3>

      <label className={styles.label}>Select Collection</label>
      <select
        className={styles.select}
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
      >
        <option value="">Select</option>
        {collections.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <p className={styles.or}>— OR —</p>

      <label className={styles.label}>Create New Collection</label>
      <input
        className={styles.input}
        type="text"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
        placeholder="New Collection Name"
      />

      <div className={styles.row}>
        <div className={styles.rowItem}>
          <label className={styles.label}>Rating (1-5)</label>
          <input
            className={styles.input}
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.rowItem}>
          <label className={styles.label}>Review</label>
          <textarea
            className={styles.textarea}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>Add to Collection</button>
    </form>
  );
}