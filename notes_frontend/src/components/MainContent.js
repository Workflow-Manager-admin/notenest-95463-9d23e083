import React from "react";
import "../App.css";
import NoteSearchInput from "./NoteSearchInput";

/**
 * MainContent lists notes, allowing viewing and triggering editing for any note.
 * Shows a placeholder if no notes, otherwise lists notes, each with Edit and Delete buttons.
 * Props:
 *   - notes (array): the currently-filtered notes
 *   - onEditNote (function): open edit modal
 *   - onDeleteNote (function): prompt for deletion
 *   - searchTerm (string)
 *   - onSearchChange (function)
 */
function MainContent({ notes = [], onEditNote, onDeleteNote, searchTerm, onSearchChange }) {
  return (
    <main
      style={{
        flex: 1,
        padding: "2rem 3vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--bg-primary)"
      }}
    >
      <div style={{ width: "100%", maxWidth: 660, marginBottom: 5 }}>
        <NoteSearchInput searchTerm={searchTerm} onChange={onSearchChange} />
      </div>
      {notes.length === 0 ? (
        <div style={{marginTop: "30vh", textAlign: "center", color: "var(--text-secondary)"}}>
          <h2 style={{color: "var(--text-primary)", fontWeight: 500, margin: 0}}>No notes found</h2>
          <p style={{margin: ".5rem 0 0 0"}}>Try adjusting your search or create a new note.</p>
        </div>
      ) : (
        <section style={{maxWidth: 660, width: "100%"}}>
          <h2 style={{color: "var(--text-primary)", fontWeight: 500}}>Your Notes</h2>
          <ul style={{padding: 0, margin: "1.5rem 0 0 0", listStyle: "none"}}>
            {notes.map(note => (
              <li key={note.id} style={{
                background: "var(--bg-secondary)",
                borderRadius: 8,
                padding: "1.2rem 1.3rem",
                marginBottom: 18,
                border: "1px solid var(--border-color)",
                position: "relative",
                minHeight: 60
              }}>
                <div style={{fontSize: "1.1rem", fontWeight: 600, marginBottom: 6, color: "var(--text-primary)"}}>{note.title}</div>
                <div style={{fontSize: 15, color: "var(--text-secondary)", marginBottom: 6, whiteSpace: "pre-line", textOverflow: "ellipsis", overflow: "hidden"}}>{note.body}</div>
                <div style={{fontSize: 12, color: "var(--border-color)", marginTop: 4}}>
                  Created: {new Date(note.created).toLocaleString()}
                </div>
                {onEditNote &&
                  <button
                    onClick={() => onEditNote(note)}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 60,
                      background: "var(--button-bg, #1976d2)",
                      color: "var(--button-text, #fff)",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      opacity: 0.98,
                      transition: "background .18s",
                      marginLeft: 8
                    }}
                    aria-label="Edit note"
                  >
                    Edit
                  </button>
                }
                {onDeleteNote &&
                  <button
                    onClick={() => onDeleteNote(note)}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      background: "transparent",
                      color: "#ff6961",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: "pointer",
                      borderRadius: 6,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.85,
                      transition: "color 0.18s"
                    }}
                    aria-label="Delete note"
                    title="Delete"
                  >
                    🗑️
                  </button>
                }
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default MainContent;
