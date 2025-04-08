import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { CATEGORIES } from "../../data/Categories";


export default function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories:[category],    
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) { }
    }

    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Post creation failed", err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
          <input type="text" placeholder='Title' className='writeInput' autoFocus onChange={e => setTitle(e.target.value)} />
        </div>

        {/* Dropdown for categories */}
        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.label} value={`${cat.emoji} ${cat.label}`}>
                <span role="img" aria-label={cat.aria}>{cat.emoji}</span> {cat.label}
              </option>
            ))}
          </select>

        </div>


        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
            onInput={e => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>

        <button className='writeSubmit' type="submit">Publish</button>
      </form>
    </div>
  );
}
