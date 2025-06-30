import React, { useState } from "react";
import "../App.css";

/**
 * Minimal modal/dialog for creating a new note.
 * Props:
 *  - open (bool): whether modal is visible
 *  - onClose(): closes modal
 *  - onCreate({title, body}): called with validated note data
 */
function NoteCreateModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  if (!open) return null;

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!body.trim()) errs.body = "Body is required";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onCreate({ title: title.trim(), body: body.trim() });
      setTitle("");
      setBody("");
      setErrors({});
    }
  }

  function handleClose() {
    setTitle("");
    setBody("");
    setErrors({});
    onClose();
  }

  return (
    <div
      tabIndex={-1}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
      }}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderRadius: 12,
          minWidth: 340,
          maxWidth: 450,
          padding: "2rem 2.5rem",
          boxShadow: "0 8px 32px rgba(40,44,52,0.12)",
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{margin: 0, fontWeight: 600, fontSize: "1.1rem"}}>New Note</h3>
        <form style={{marginTop: 18, display: "flex", flexDirection: "column", gap: 18}} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="note-title" style={{display: "block", marginBottom: 6, fontWeight: 500}}>Title</label>
            <input
              id="note-title"
              type="text"
              autoFocus
              value={title}
              maxLength={80}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: `1px solid ${errors.title ? "#ff6961" : "var(--border-color)"}`,
                fontSize: 15,
                outline: errors.title ? "2px solid #ff6961" : "none",
                background: "var(--bg-secondary)"
              }}
              placeholder="Note title"
            />
            {errors.title && <span style={{color: "#ff6961", fontSize: 13}}>{errors.title}</span>}
          </div>
          <div>
            <label htmlFor="note-body" style={{display: "block", marginBottom: 6, fontWeight: 500}}>Content</label>
            <textarea
              id="note-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={5}
              maxLength={2000}
              style={{
                width: "100%",
                resize: "vertical",
                padding: "10px",
                borderRadius: 6,
                border: `1px solid ${errors.body ? "#ff6961" : "var(--border-color)"}`,
                fontSize: 15,
                outline: errors.body ? "2px solid #ff6961" : "none",
                background: "var(--bg-secondary)"
              }}
              placeholder="Type your note here..."
            />
            {errors.body && <span style={{color: "#ff6961", fontSize: 13}}>{errors.body}</span>}
          </div>
          <div style={{display: "flex", gap: 12, justifyContent: "flex-end"}}>
            <button
              type="button"
              onClick={handleClose}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "var(--button-bg, #1976d2)",
                color: "var(--button-text)",
                border: "none",
                fontWeight: 600,
                padding: "8px 18px",
                borderRadius: 6,
                cursor: "pointer",
                opacity: (!title.trim() || !body.trim()) ? 0.75 : 1
              }}
              disabled={!title.trim() || !body.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteCreateModal;
