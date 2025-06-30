import React from "react";
import "../App.css";

/**
 * Minimalistic input for searching/filtering notes.
 * Props:
 *  - searchTerm (string)
 *  - onChange (function, called with new value)
 *  - placeholder (string, optional)
 */
// PUBLIC_INTERFACE
function NoteSearchInput({ searchTerm, onChange, placeholder = "Search notes..." }) {
  return (
    <div style={{
      width: "100%",
      margin: "0.5rem 0 1rem 0",
      padding: "0 1.6rem",
      display: "flex"
    }}>
      <input
        type="search"
        value={searchTerm}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 10px 8px 34px",
          borderRadius: 7,
          border: "1px solid var(--border-color)",
          fontSize: 15,
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          outline: "none",
          backgroundImage: "url('data:image/svg+xml,%3Csvg fill=\'none\' stroke=\'%2361dafb\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'11\' cy=\'11\' r=\'8\'/%3E%3Cpath d=\'M21 21l-4.35-4.35\'/%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "8px center"
        }}
        aria-label="Filter notes"
      />
    </div>
  );
}

export default NoteSearchInput;
