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
   * Handles theme, note creation modal, editing notes, and in-memory notes list.
   */

  const [theme, setTheme] = useState("light");
  const [notes, setNotes] = useState([]); // [{id, title, body, created}]
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editNote, setEditNote] = useState(null); // {id, title, body, created}

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

  // PUBLIC_INTERFACE
  function handleEditNote(note) {
    setEditNote(note);
    setShowEdit(true);
  }

  // PUBLIC_INTERFACE
  function handleNoteEdited({ title, body }) {
    // Update the note in notes.
    setNotes(notes =>
      notes.map(n =>
        n.id === editNote.id
          ? { ...n, title, body }
          : n
      )
    );
    setShowEdit(false);
    setEditNote(null);
  }

  // PUBLIC_INTERFACE
  function handleCloseEditModal() {
    setShowEdit(false);
    setEditNote(null);
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
      {/* Note Edit Modal (reuse NoteCreateModal, but prefill data and edit logic) */}
      <NoteCreateModal
        open={showEdit}
        onClose={handleCloseEditModal}
        onCreate={handleNoteEdited}
        editMode={true}
        initialData={editNote}
      />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar onCreateNote={handleCreateNote} />
        {/* Pass notes, and pass edit handler for editing notes */}
        <MainContent notes={notes} onEditNote={handleEditNote} />
      </div>
    </div>
  );
}

export default App;
