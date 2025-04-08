import { Link } from "react-router-dom";
import React, { useState } from "react";
import './register.css';
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      console.log("Registration successful:", res.data);
    } catch (err) {
      setError(true);
      console.error("Registration error:", err.response.data);
    }
  };

  return (
    <div className='register'>
      <span className="registerTitle">WELCOME!</span>
      <span className="registerTitle">REGISTER</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className='registerInput' 
          type='text' 
          placeholder='Enter your username...' 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input 
          className='registerInput' 
          type='email'
          placeholder='Enter your email...' 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input 
          className='registerInput' 
          type='password' 
          placeholder='Enter your password...' 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLogin">
        <Link className="link" to="/login">LOGIN</Link>
      </button>
      <span className="registerError">{error && "Something went wrong!"}</span>
    </div>
  );
}
