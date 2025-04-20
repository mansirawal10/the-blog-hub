import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { CATEGORIES } from "../../data/Categories";
import { motion } from "framer-motion";

export default function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("");

  const moodBackground = {
    happy: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    sad: "linear-gradient(to right, #485563, #29323c)",
    chill: "linear-gradient(to right, #d4fc79, #96e6a1)",
    energetic: "linear-gradient(to right, #f7971e, #ffd200)",
    romantic: "linear-gradient(to right, #ffdde1, #ee9ca7)",
    default: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: [category],
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Post creation failed", err);
    }
  };

  return (
    <motion.div
      className="write"
      style={{
        backgroundImage: moodBackground[mood] || moodBackground.default,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {file && (
        <motion.img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <motion.form
        className="writeForm glass-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Give it a title..."
            className="writeInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">✨ Pick a Vibe</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.label} value={cat.label}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">🌈 Mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="chill">😌 Chill</option>
            <option value="energetic">⚡ Energetic</option>
            <option value="romantic">💖 Romantic</option>
          </select>
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Pour your heart out..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>

        <motion.button
          className="writeSubmit glow-button"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🚀 Publish
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
