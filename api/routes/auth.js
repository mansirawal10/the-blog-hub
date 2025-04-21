const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// REGISTER
router.post("/register", async (req, res) => {
    console.log("/register", req.body); // Log request data
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        console.log("✅ User created:", user);
        res.status(200).json(user);
    } catch (err) {
        console.error("❌ Registration error:", err); // Full error object
        res.status(500).json({ error: "Registration failed", details: err.message || err });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) return res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error("❌ Login error:", err); // Full error object
        res.status(500).json({ error: "Login failed", details: err.message });
    }
});

module.exports = router;
