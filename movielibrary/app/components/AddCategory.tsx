'use client';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddCategory() {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;

    await fetch("http://localhost:4000/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        name,
        movieIds: [],
      }),
    });

    setName("");
    window.location.reload(); // quick refresh
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category name"
      />
      <button onClick={handleAdd}>Add Category</button>
    </div>
  );
}