import React from "react";
import "../App.css";
import NoteSearchInput from "./NoteSearchInput";

// PUBLIC_INTERFACE
function Sidebar({ onCreateNote, notes = [], onDeleteNote, searchTerm, onSearchChange }) {
  /**
   * Renders the sidebar navigation for the notes app.
   * Includes navigation links, search input, "New Note" button, and filtered note list with delete options.
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
        <div style={{marginTop: 7, marginBottom: 4}}>
          <NoteSearchInput searchTerm={searchTerm} onChange={onSearchChange} />
        </div>
        <ul style={{
          margin: 0,
          padding: "0 0 24px 0",
          listStyle: "none",
        }}>
          <li style={{padding: "0.75rem 2rem", fontWeight: 600}}>
            <span role="img" aria-label="notes" style={{marginRight: 8}}>🗒️</span>
            All Notes
          </li>
          {/* Show quick list of filtered notes (first 5) */}
          {notes.length > 0 && (
            <>
              {notes.slice(0, 5).map(note => (
                <li key={note.id} style={{
                  padding: "0.25rem 2.1rem 0.25rem 2.3rem",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <span style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: 108
                  }} title={note.title}>{note.title}</span>
                  {onDeleteNote && (
                    <button
                      style={{
                        background: "transparent",
                        color: "#ff6961",
                        border: "none",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                        borderRadius: 5,
                        width: 26,
                        height: 26,
                        marginLeft: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label="Delete note"
                      title="Delete"
                      onClick={() => onDeleteNote(note)}
                    >
                      🗑️
                    </button>
                  )}
                </li>
              ))}
              <li style={{height: 1}}></li>
            </>
          )}
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
