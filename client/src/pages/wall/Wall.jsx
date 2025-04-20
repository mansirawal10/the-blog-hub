import React, { useState, useEffect, useContext } from "react";
import "./wall.css";
import { motion } from "framer-motion";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";

const pastelColors = [
  "#ffd6e0", "#fff5ba", "#caffbf", "#9bf6ff", "#bdb2ff",
  "#ffc6ff", "#f0efeb", "#00FF9C", "#FF7EE2", "#6DE1D2",
  "#FFD63A", "#FFA955", "#FFCCEA", "#CDC1FF", "#BFECFF"
];

const randomColor = () =>
  pastelColors[Math.floor(Math.random() * pastelColors.length)];

export default function Wall() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(Context);

  // Fetch notes on mount
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await fetch("/api/wallnotes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    getNotes();
  }, []);

  // Handle new note submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newNote = {
      text,
      color: randomColor(),
      username: user.username,
    };

    try {
      const response = await fetch(`/api/wallnotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const savedNote = await response.json();
        setNotes([savedNote, ...notes]);
        setText("");
      } else {
        console.error("Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Handle note deletion
  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`/api/wallnotes/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username }), // Send username for authorization
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId)); // Remove the deleted note from state
      } else {
        console.error("Failed to delete note or unauthorized action.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="wall-container">
      <h2 className="wall-heading">🕶️ Anonymous Wall of Feels</h2>

      <form className="wall-form" onSubmit={handleSubmit}>
        <textarea
          className="wall-textarea"
          placeholder="Drop your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <motion.button
          className="wall-button"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Drop it ✨
        </motion.button>
      </form>

      <div className="wall-grid">
        {notes.map((note) => (
          <motion.div
            key={note._id}
            className="note-card"
            style={{ backgroundColor: note.color }}
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            {note.text}
            <div className="note-timestamp">
              {moment(note.createdAt).format("YYYY-MM-DD HH:mm")}
            </div>

            {note.username === user?.username && ( // Only show delete button for the note creator
              <motion.button
                className="delete-button"
                onClick={() => handleDelete(note._id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
