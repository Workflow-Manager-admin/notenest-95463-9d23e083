import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import NoteCreateModal from "./components/NoteCreateModal";

/** Minimal confirm dialog for reuse */
function ConfirmDialog({ open, title = "Are you sure?", message = "", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div
      tabIndex={-1}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
      }}
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderRadius: 12,
          minWidth: 300,
          maxWidth: 400,
          padding: "1.5rem 2rem",
          boxShadow: "0 6px 32px rgba(40,44,52,0.13)",
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{margin: 0, fontWeight: 600, fontSize: "1.07rem"}}>{title}</h3>
        <p style={{margin: "1.1em 0 2.2em 0", color: "var(--text-secondary)"}}>{message}</p>
        <div style={{display: "flex", gap: 12, justifyContent: "flex-end"}}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "none",
              fontWeight: 600,
              letterSpacing: ".02em",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >Cancel</button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              background: "var(--button-bg, #d32f2f)",
              color: "var(--button-text, #fff)",
              border: "none",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: 6,
              cursor: "pointer",
              opacity: 1
            }}
          >Delete</button>
        </div>
      </div>
    </div>
  );
}

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
  // --- Search/filter state ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- Deletion modal state ---
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
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

  // PUBLIC_INTERFACE
  function handleDeleteNoteRequest(note) {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  }

  // PUBLIC_INTERFACE
  function handleConfirmDelete() {
    setNotes(notes => notes.filter(n => n.id !== noteToDelete.id));
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  }

  // PUBLIC_INTERFACE
  function handleCancelDelete() {
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  }

  // Filter notes according to search term (case-insensitive in title or body)
  const filteredNotes = (searchTerm || "").trim()
    ? notes.filter(note => {
        const v = searchTerm.toLowerCase();
        return (
          note.title.toLowerCase().includes(v) ||
          note.body.toLowerCase().includes(v)
        );
      })
    : notes;

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
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete this note?"
        message={noteToDelete ? `Are you sure you want to delete "${noteToDelete.title}"? This cannot be undone.` : ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar
          onCreateNote={handleCreateNote}
          notes={filteredNotes}
          onDeleteNote={handleDeleteNoteRequest}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {/* MainContent: filtered notes and search control */}
        <MainContent
          notes={filteredNotes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNoteRequest}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
}

export default App;
