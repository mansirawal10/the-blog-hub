const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

// CREATE NEW POST
router.post("/", async (req, res) => {
    try {
        const newPost = new Post({
            ...req.body,
            photo: `https://the-blog-hub-jevy.onrender.com/images/${req.body.photo}`,
        });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: "Failed to save post", details: err.message });
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        // Check if the user is the author of the post
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true } // Return the updated document
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json({ error: "Error updating post", details: err.message });
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json({ error: "Error fetching post", details: err.message });
    }
});


/// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        // Only allow delete if username matches
        if (post.username === req.body.username) {
            await post.deleteOne();
            return res.status(200).json("Post has been deleted successfully!");
        } else {
            return res.status(401).json("You can only delete your post!");
        }
    } catch (err) {
        console.error("❌ Error deleting post:", err);
        return res.status(500).json(err);
    }
});

// GET a single post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// GET ALL POSTS (with optional filters)
router.get("/", async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;

    try {
        let posts = await Post.find();
        posts = posts.map(post => ({
            ...post._doc,
            photo: post.photo ? `https://the-blog-hub-jevy.onrender.com/images/${post.photo}` : null,
        }));
        ;
        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({
                categories: {
                    $in: [category],
                },
            });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});



module.exports = router;