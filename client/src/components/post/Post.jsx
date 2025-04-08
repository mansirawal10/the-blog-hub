import React from "react";
import './post.css';
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  if (!post) return null;

  return (
    <div className='post'>
      {post.photo && (
        <img
          className="postImg"
          src={`${PF}${post.photo}`}
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
