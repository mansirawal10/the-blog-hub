import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
        const res = await axios.get("/api/posts" + search);
        console.log(res.data);
        setPosts(res.data); 
      
  
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
