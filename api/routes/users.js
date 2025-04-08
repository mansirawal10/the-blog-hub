const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
router.put("/:id", async (req, res) => {
    // Check if the userID matches the ID in the URL
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            // Hash the password if it's in the request body
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            // Update the user document with the data provided in the request body
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true } // return the updated document
            );

            // Return the updated user data
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    console.log("Request Body:", req.body);  // Log the request body
    console.log("URL Param ID:", req.params.id);  // Log the URL parameter
  
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json("User not found!");
        }
  
        // Proceed with deletion
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        console.error("Error:", err);  // Log the error
        res.status(500).json({ message: "Server Error", error: err.message });
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });

//   GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json("User not found");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

  
module.exports = router;
