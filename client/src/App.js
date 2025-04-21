import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Write from "./pages/write/Write";
import TopBar from "./components/topbar/TopBar";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import About from "./pages/about/About";
import Wall from "./pages/wall/Wall"; 
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;




function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/wall" element={user ? <Wall /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
