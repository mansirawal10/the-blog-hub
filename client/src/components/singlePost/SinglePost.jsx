import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import './singlePost.css';
import axios from "axios";
import { Context } from "../../context/Context";
const imageEndpoint = "https://thestoryhub-blog.netlify.app/images/"; // Adjust this to your actual image endpoint




export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/api/posts/" + path);
            console.log("✅ Fetched post:", JSON.stringify(res.data, null, 2));
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setCategory(res.data.category || res.data.categories?.[0] || "");



        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            // eslint-disable-next-line
            const res = await axios.delete(`/api/posts/${post._id}`, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) {
            console.error("Error occurred:", err);

        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
                category: [category], // Ensure category is an array
            });
            setUpdateMode(false);
        } catch (err) { }
    }
    return (
        <div className='singlePost'>
            <div className='singlePostWrap'>
                {post.photo && (
                    <img
                        className="singlePostImg"
                        src={`${imageEndpoint}${post.photo}`}
                        alt="Post"
                    />
                )}

                {
                    updateMode ?
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitle"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        /> :
                        (<h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className='singlePostEdit'>
                                    <i className="singlePostIconEdit fa-solid fa-pen-to-square"
                                        onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIconDelete fa-solid fa-trash-can" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                        )}
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {category && (
                    <span className='singlePostCategory'>
                        Category:{" "}
                        <Link to={`/?category=${encodeURIComponent(category)}`} className='link'>
                            <b>{category}</b>
                        </Link>
                    </span>
                )}




                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className='singlePostDesc'>{desc}</p>
                )}
                {updateMode && (
                    <div className="singlePostButtons">
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                        <button className="singlePostButton cancel" onClick={() => {
                            setUpdateMode(false);
                            setTitle(post.title);
                            setDesc(post.desc);
                        }}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
