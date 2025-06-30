# Implemented Features – NoteNest Frontend

This document lists and describes all user-facing features that are currently implemented in the NoteNest React frontend codebase, based strictly on the observed source code as of this writing.

---

## 1. Note Creation

Users can create new notes using a modal dialog. When the "+ New Note" button is clicked (in the sidebar), a modal appears prompting for both a note title and content. Both fields are required; form validation prevents empty submissions. On successful creation, the new note is added to the app state and displayed at the top of the notes list. The creation modal automatically resets on close or after successful creation.

## 2. Note Editing

Existing notes can be edited. When a user selects "Edit" (adjacent to each note in the main pane, except in Trash view), a modal opens with the current title and content pre-filled. Users can update either field. Changes are applied to the note in memory upon saving. Editing works only for notes not in the Trash.

## 3. Note Deletion & Trash (Soft Delete and Permanent Delete)

The application uses a two-step deletion approach:
- **Soft Delete:** When deleting a note from the main or favourites view, the note is marked as 'trashed' rather than removed outright. A confirmation dialog ensures accidental deletions are minimized.
- **Trash Bin View:** The sidebar provides a "Trash" section listing all soft-deleted notes. Inside Trash, users are offered two actions for each note:
  - **Restore:** Return a note to active status.
  - **Permanent Delete:** Irrevocably remove the note from the app (memory).

Confirmation dialogs appear before all permanent deletions. This closely mimics the trash/bin workflow in modern note-taking applications.

## 4. Favourites

Users can mark notes as favourites. Each note in the main and favourites views exposes a star button ("☆" for not-favourited, "★" for favourited) to toggle favourite status. The sidebar includes a "Favourites" filter, which when selected lists only those notes specifically marked as favourites (and not trashed).

## 5. Sidebar Navigation

The persistent sidebar enables users to quickly navigate between:
- All Notes,
- Favourites,
- Trash.

Sidebar also shows the first few recent (non-trashed) notes for fast reference or deletion. The "+ New Note" button is always available in the sidebar.

## 6. Note Listing, Search & Filtering

The main content panel displays a list of notes based on the current sidebar section/filter:
- **All Notes:** All non-trashed notes.
- **Favourites:** All favourited, non-trashed notes.
- **Trash:** All trashed notes.

A search input is present both in the sidebar and main content. Typing into the search box live-filters notes by matching the search term (case-insensitive) in either the note title or content. If no notes are found for the current filter/search, a friendly placeholder is shown.

## 7. Theming (Light/Dark Mode Toggle)

The top-right of the application contains a button toggling the visual theme (light or dark). This switch updates CSS variables for primary/secondary backgrounds, text, borders, and buttons throughout the interface. The mode is applied globally using the root document's `data-theme` attribute. This ensures a cohesive look between all panels and modals.

## 8. Responsive UI & Accessibility

- The layout is structured for responsiveness, adapting the sidebar and main content panels for different window sizes.
- Interactive elements and dialogs include ARIA labels and reasonable keyboard accessibility.
- The UI uses semantic HTML and role attributes (such as `dialog`) for modals.

## 9. Modals for Note Actions

- Both note creation and note editing use the same modal component with different props.
- Confirmation dialogs appear for potentially destructive actions (delete, permanent delete, restore).

---

## Implementation and Storage Notes

- All note operations (create, edit, delete, favourite, restore, etc.) are performed in-memory. There is no backend or persistence; data resets on reload.
- Each note is an object containing: `id`, `title`, `body`, `created`, `isFavourite`, and `trashed`.

---

## Feature Summary Table

| Feature                | Implemented | Notes         |
|------------------------|-------------|---------------|
| Create Note            | Yes         | Modal dialog with validation |
| Edit Note              | Yes         | Only outside Trash          |
| Delete Note            | Yes         | Soft deletion (Trash), permanent delete in Trash |
| Restore Note           | Yes         | Only from Trash             |
| Favourites             | Yes         | Star toggle, favourites view |
| Search                 | Yes         | Title/body filter, live     |
| Sidebar Navigation     | Yes         | All/Favourites/Trash, quick note list |
| Theming                | Yes         | Light/Dark switch           |
| Responsive Design      | Yes         | CSS flexbox, variable sizing |
| Modal Confirmations    | Yes         | For deletes/restores        |
| Persistence            | No          | Data resets on reload       |

---

## Diagram: Feature Overview

```mermaid
flowchart LR
    Sidebar --open create modal--> NoteCreateModal
    NoteCreateModal --submit--> NotesList
    NotesList --edit--> NoteCreateModal
    NotesList --delete--> ConfirmDialog
    ConfirmDialog --soft-delete--> TrashView
    TrashView --restore--> NotesList
    TrashView --perma-delete--> ConfirmDialog
    Sidebar --view favourites--> NotesList
    Sidebar --view trash--> TrashView
    Sidebar --search--> NotesList
    NotesList --toggle favourite--> NotesList
    ThemeToggle --switch mode--> AppUI
```

---

This document will be updated as additional features are implemented or when the underlying codebase changes.
