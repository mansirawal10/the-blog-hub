// In your upload route (e.g., routes/upload.js)
const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

// Configure multer to store file data in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Set the proper content type and send the binary data.
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve image", details: err.message });
  }
});



router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
      fileName: req.file.originalname
    });

    await newImage.save();
    res.status(200).json({ message: "Image uploaded successfully", imageId: newImage._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to store image", details: err.message });
  }
});

module.exports = router;