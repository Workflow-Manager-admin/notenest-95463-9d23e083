import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function AppHeader() {
  /** 
   * Minimalistic header with application title.
   */
  return (
    <header
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
        padding: "1.2rem 2rem",
        fontWeight: 700,
        fontSize: "1.25rem",
        letterSpacing: ".02em",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        height: "64px"
      }}
    >
      NoteNest
    </header>
  );
}

export default AppHeader;
