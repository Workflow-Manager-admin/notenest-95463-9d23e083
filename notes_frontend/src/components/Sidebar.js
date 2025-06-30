import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Sidebar({ onCreateNote }) {
  /**
   * Renders the sidebar navigation for the notes app.
   * Includes navigation links and "New Note" button.
   */
  return (
    <aside
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        width: 250,
        minWidth: 180,
        maxWidth: 300,
        height: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
      }}
    >
      <nav style={{flex: 1}}>
        <ul style={{
          margin: 0,
          padding: "24px 0",
          listStyle: "none",
        }}>
          <li style={{padding: "0.75rem 2rem"}}>
            <span role="img" aria-label="notes" style={{marginRight: 8}}>🗒️</span>
            All Notes
          </li>
          <li style={{padding: "0.75rem 2rem", opacity: 0.7}}>
            <span role="img" aria-label="favorites" style={{marginRight: 8}}>⭐️</span>
            Favorites
          </li>
          <li style={{padding: "0.75rem 2rem", opacity: 0.7}}>
            <span role="img" aria-label="trash" style={{marginRight: 8}}>🗑️</span>
            Trash
          </li>
        </ul>
      </nav>
      <div style={{padding: "1.5rem 2rem"}}>
        <button
          style={{
            width: "100%",
            background: "var(--button-bg, #1976d2)",
            color: "var(--button-text, #fff)",
            border: "none",
            padding: "0.75rem",
            borderRadius: 8,
            fontWeight: 600,
            marginTop: 8,
            cursor: "pointer"
          }}
          onClick={onCreateNote}
        >
          + New Note
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
