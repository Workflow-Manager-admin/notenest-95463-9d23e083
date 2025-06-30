import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function MainContent({ notes = [] }) {
  /**
   * Primary content area for viewing and editing notes.
   * Shows a placeholder if no notes, otherwise starts to list notes.
   */
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
      {notes.length === 0 ? (
        <div style={{marginTop: "30vh", textAlign: "center", color: "var(--text-secondary)"}}>
          <h2 style={{color: "var(--text-primary)", fontWeight: 500, margin: 0}}>Select or create a note</h2>
          <p style={{margin: ".5rem 0 0 0"}}>Your notes will appear here.</p>
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
                border: "1px solid var(--border-color)"
              }}>
                <div style={{fontSize: "1.1rem", fontWeight: 600, marginBottom: 6, color: "var(--text-primary)"}}>{note.title}</div>
                <div style={{fontSize: 15, color: "var(--text-secondary)", marginBottom: 6, whiteSpace: "pre-line", textOverflow: "ellipsis", overflow: "hidden"}}>{note.body}</div>
                <div style={{fontSize: 12, color: "var(--border-color)", marginTop: 4}}>
                  Created: {new Date(note.created).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default MainContent;
