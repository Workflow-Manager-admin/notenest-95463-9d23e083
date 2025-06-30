import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import NoteCreateModal from "./components/NoteCreateModal";

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application wrapper for the notes app.
   * Handles theme, note creation modal, and in-memory notes list.
   */

  const [theme, setTheme] = useState("light");
  const [notes, setNotes] = useState([]); // [{id, title, body, created}]
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  function handleCreateNote() {
    setShowCreate(true);
  }

  // PUBLIC_INTERFACE
  function handleNoteCreated({ title, body }) {
    // Add note to top of list. ID is timestamp-based.
    const newNote = {
      id: "note-" + Date.now(),
      title,
      body,
      created: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setShowCreate(false);
  }

  // PUBLIC_INTERFACE
  function handleCloseCreateModal() {
    setShowCreate(false);
  }

  return (
    <div className="App" style={{minHeight: "100vh", background: "var(--bg-primary)"}}>
      <AppHeader />
      <button
        className="theme-toggle"
        onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      {/* Note Creation Modal */}
      <NoteCreateModal
        open={showCreate}
        onClose={handleCloseCreateModal}
        onCreate={handleNoteCreated}
      />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar onCreateNote={handleCreateNote} />
        {/* Pass notes as prop for future use */}
        <MainContent notes={notes} />
      </div>
    </div>
  );
}

export default App;
