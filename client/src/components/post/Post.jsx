import React from "react";
import './post.css';
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const imageEndpoint = "https://thestoryhub-blog.netlify.app/images/"; // Adjust this to your actual image endpoint

  if (!post) return null;

  return (
    <div className='post'>
      {post.photo && (
        <img
          className="postImg"
          src={`${imageEndpoint}${post.photo}`}
          alt=''
        />
      )}
      <div className="postInfo">
        <div className='postCats'>
          {(post.category || post.categories?.[0]) && (
            <span className='postCat'>
              {post.category || post.categories[0]}
            </span>
          )}
        </div>

        <Link to={`/post/${post._id}`} className='link'>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>
        {post.desc}
      </p>
    </div>
  );
}
