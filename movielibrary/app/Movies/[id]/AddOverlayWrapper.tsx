"use client";

import { useState } from "react";
import AddMovieCard from "@/app/components/AddMovieCard";

interface Props {
  tmdbId: number;
}

export default function AddOverlayWrapper({ tmdbId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ border: "3px solid blue", padding: "1rem" }}>
        <button onClick={() => setOpen(true)}>
          Add to Collection
        </button>
      </div>

      {open && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setOpen(false)}
              style={closeStyle}
            >
              ✖
            </button>

            <AddMovieCard
              tmdbId={tmdbId}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#111",
  padding: "2rem",
  borderRadius: "8px",
  position: "relative",
};

const closeStyle: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};