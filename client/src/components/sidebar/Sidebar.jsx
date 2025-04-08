import React, { useState, useEffect } from "react";
import './sidebar.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCategoriesFromPosts = async () => {
            try {
                const res = await axios.get("/api/posts"); // Fetch all posts
                const allCats = res.data.flatMap(post => post.categories || []);
                const uniqueCats = [...new Set(allCats)];
                setCats(uniqueCats);
            } catch (err) {
                console.error("Failed to fetch categories from posts", err);
            }
        };

        getCategoriesFromPosts();
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>ABOUT US</span>
                <img
                    src='https://i.pinimg.com/736x/b3/d8/34/b3d834de6e9a5cdebfa26d54034b70d8.jpg'
                    alt='About'
                />
                <p>
                    Where your overthinking becomes over-sharing 🧠➡️📢.
                    Spill the tea ☕, drop the drama 🎭, and blog like no one's watching 👀🔥.
                </p>
            </div>

            <div className="sidebarItem">
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className='sidebarList'>
                    {cats.map((c, i) => (
                        <Link key={i} to={`/?category=${encodeURIComponent(c)}`} className="link">
                            <li className="sidebarListItem">{c}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className='sidebarSocial'>
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    );
}
