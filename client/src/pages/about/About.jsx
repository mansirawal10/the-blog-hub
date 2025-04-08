import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="aboutContainer">
      <div className="aboutCard">
        <h1 className="aboutTitle">About Us? It’s giving overthinking turned aesthetic.</h1>
        <h2 className="aboutSub">💻 Welcome to <span className="brand">THE BLOG HUB</span></h2>
        <p className="aboutDesc">The unofficial HQ for your 3AM thoughts, soft launches, and main character moments.</p>

        <img
          className="aboutImage"
          src="https://i.pinimg.com/736x/b3/d8/34/b3d834de6e9a5cdebfa26d54034b70d8.jpg"
          alt="aesthetic chaos"
        />

        <div className="aboutSection">
          <h3>👀 What even <em>is</em> this?</h3>
          <p>
            It’s a blog. It’s a mood board. It’s a late-night voice note you didn’t send. <br/>
            Basically, it’s where ✨<strong>feelings meet fonts</strong>✨.
          </p>
        </div>

        <div className="aboutSection">
          <h3>🧠 Built by:</h3>
          <p>
            Someone who googles “how to fix life” daily. <br/>
            Coding the chaos. Romanticizing the existential dread. <br/>
            Turning spirals into stories. 💅
          </p>
        </div>

        <div className="aboutSection">
          <h3>🧃 What you’ll find here:</h3>
          <ul>
            <li>✨ Glow-ups, but make it emotional</li>
            <li>🔥 Hot takes you didn’t ask for</li>
            <li>🎭 Drama with no commercial breaks</li>
            <li>🧩 Self-care that’s more like soul debugging</li>
            <li>💭 Thoughts that start with “idk why but…”</li>
          </ul>
        </div>

        <div className="aboutSection">
          <h3>📡 Join the vibe:</h3>
          <p>
            Feeling like a background character lately? <br/>
            Scroll through. Read. Feel something. Or just stare blankly at the screen—relatable either way.
          </p>
        </div>

        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-instagram"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-tiktok"></i>
        </div>

        <blockquote className="quote">
          ✨we’re not just writing. we’re healing, spiraling, and occasionally slaying.✨
        </blockquote>
      </div>
    </div>
  );
}