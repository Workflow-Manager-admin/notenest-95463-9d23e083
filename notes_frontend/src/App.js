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
  // Notes structure: [{id, title, body, created, isFavourite, trashed}]
  const [notes, setNotes] = useState([]); // [{id, title, body, created, isFavourite, trashed}]
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editNote, setEditNote] = useState(null); // {id, title, body, created, isFavourite}
  // --- Search/filter state ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- Favourites/trash view state ---
  const [activeSidebar, setActiveSidebar] = useState("all"); // "all", "favourites", "trash"

  // --- Trash permanent delete and restore modal state ---
  const [trashActionNote, setTrashActionNote] = useState(null);
  const [trashActionType, setTrashActionType] = useState(null); // "restore" | "delete"
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
      created: new Date().toISOString(),
      isFavourite: false,
      trashed: false
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
    // Update the note in notes (preserving isFavourite, trashed).
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
  function handleToggleFavourite(noteId) {
    setNotes(notes =>
      notes.map(n =>
        n.id === noteId ? { ...n, isFavourite: !n.isFavourite } : n
      )
    );
  }

  // PUBLIC_INTERFACE
  function handleSidebarSelect(key) {
    setActiveSidebar(key);
  }

  // PUBLIC_INTERFACE
  function handleDeleteNoteRequest(note) {
    // In "Trash" view, triggers permanent delete confirm; elsewhere, soft delete
    if (activeSidebar === "trash" || note.trashed) {
      setTrashActionNote(note);
      setTrashActionType("delete");
    } else {
      setNoteToDelete(note);
      setShowDeleteConfirm(true);
    }
  }

  // PUBLIC_INTERFACE
  function handleConfirmDelete() {
    // Soft delete: mark as trashed rather than removing from state.
    setNotes(notes =>
      notes.map(n =>
        n.id === noteToDelete.id
          ? { ...n, trashed: true }
          : n
      )
    );
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  }

  // PUBLIC_INTERFACE
  function handleCancelDelete() {
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  }

  // For Trash view: permanently wipe a trashed note
  function handlePermanentDeleteNote() {
    setNotes(notes => notes.filter(n => n.id !== trashActionNote.id));
    setTrashActionNote(null);
    setTrashActionType(null);
  }

  // For Trash view: restore a trashed note to active
  function handleRestoreNote() {
    setNotes(notes =>
      notes.map(n =>
        n.id === trashActionNote.id
          ? { ...n, trashed: false }
          : n
      )
    );
    setTrashActionNote(null);
    setTrashActionType(null);
  }

  function handleCancelTrashAction() {
    setTrashActionNote(null);
    setTrashActionType(null);
  }

  // Computed: filter notes according to sidebar state and search/trash/favourites
  let viewNotes = notes;
  if (activeSidebar === "favourites") {
    viewNotes = notes.filter(n => n.isFavourite && !n.trashed);
  } else if (activeSidebar === "trash") {
    viewNotes = notes.filter(n => n.trashed);
  } else {
    viewNotes = notes.filter(n => !n.trashed);
  }
  const filteredNotes = (searchTerm || "").trim()
    ? viewNotes.filter(note => {
        const v = searchTerm.toLowerCase();
        return (
          note.title.toLowerCase().includes(v) ||
          note.body.toLowerCase().includes(v)
        );
      })
    : viewNotes;

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
          notes={
            activeSidebar === "trash"
              ? notes.filter(n => n.trashed)
              : notes.filter(n => !n.trashed)
          }
          onDeleteNote={handleDeleteNoteRequest}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeSidebar={activeSidebar}
          onSelectSidebar={handleSidebarSelect}
        />
        {/* MainContent changes for Trash: show restore/permanent delete, no "edit"/"favourite" for trash */}
        <MainContent
          notes={filteredNotes}
          onEditNote={
            activeSidebar !== "trash" ? handleEditNote : undefined
          }
          onDeleteNote={handleDeleteNoteRequest}
          onToggleFavourite={
            activeSidebar === "trash" ? undefined : handleToggleFavourite
          }
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          trashMode={activeSidebar === "trash"}
          onRestoreNote={note => {
            setTrashActionNote(note);
            setTrashActionType("restore");
          }}
        />
      </div>
      {/* Trash-specific: Restore/Permanent Delete confirm dialog */}
      <ConfirmDialog
        open={!!trashActionNote && trashActionType === "delete"}
        title="Permanently delete this note?"
        message={
          trashActionNote
            ? `Are you sure you want to permanently delete "${trashActionNote.title}"? This cannot be undone.`
            : ""
        }
        onConfirm={handlePermanentDeleteNote}
        onCancel={handleCancelTrashAction}
      />
      <ConfirmDialog
        open={!!trashActionNote && trashActionType === "restore"}
        title="Restore this note?"
        message={
          trashActionNote
            ? `Restore "${trashActionNote.title}" to Notes? It will be moved from Trash.`
            : ""
        }
        onConfirm={handleRestoreNote}
        onCancel={handleCancelTrashAction}
      />
    </div>
  );
}

export default App;
