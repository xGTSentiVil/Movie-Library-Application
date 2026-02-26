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
      <div>
        <button onClick={() => setOpen(true)} style={addButtonStyle}>
          + Add to Collection
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

const addButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#e8eaf0",
  padding: "0.65rem 1.4rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  transition: "border-color 0.2s, background 0.2s",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#0e1117",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "2.5rem",
  borderRadius: "12px",
  position: "relative",
  boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
};

const closeStyle: React.CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "transparent",
  color: "rgba(255,255,255,0.4)",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  lineHeight: 1,
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  transition: "color 0.2s",
};