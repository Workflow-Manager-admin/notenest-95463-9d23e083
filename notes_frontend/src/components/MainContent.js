import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function MainContent() {
  /**
   * Primary content area for viewing and editing notes.
   * Currently shows a placeholder message.
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
      <div style={{marginTop: "30vh", textAlign: "center", color: "var(--text-secondary)"}}>
        <h2 style={{color: "var(--text-primary)", fontWeight: 500, margin: 0}}>Select or create a note</h2>
        <p style={{margin: ".5rem 0 0 0"}}>Your notes will appear here.</p>
      </div>
    </main>
  );
}

export default MainContent;
