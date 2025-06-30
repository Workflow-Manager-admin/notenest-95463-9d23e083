import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application wrapper.
   * Renders the header, sidebar, and main content area.
   * Implements theme toggle (light/dark) for demonstration, though default is minimal light.
   */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleCreateNote = () => {
    // Placeholder: eventually will open new note UI.
    window.alert("TODO: Show create note dialog (placeholder)");
  };

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
      <div style={{ display: "flex", flexDirection: "row", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar onCreateNote={handleCreateNote} />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
