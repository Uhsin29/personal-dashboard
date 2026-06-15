import { useState, useEffect } from "react";

function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load saved notes on first render
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(e) {
    e.preventDefault();
    if (note.trim() === "") return;

    setNotes([...notes, note]);
    setNote("");
  }

  function deleteNote(index) {
    setNotes(notes.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h2>Notes</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((n, i) => (
          <li key={i}>
            {n}
            <button onClick={() => deleteNote(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;