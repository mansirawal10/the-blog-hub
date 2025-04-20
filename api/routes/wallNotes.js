const router = require("express").Router();
const WallNote = require("../models/WallNote");

// GET all notes
router.get('/', async (req, res)  => {
  try {
    const notes = await WallNote.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new note
router.post('/', async (req, res) => { 
  try {
    const newNote = new WallNote({
      text: req.body.text,
      color: req.body.color,
      username: req.body.username,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error("❌ Error saving wall note:", err);
    res.status(500).json( {error: "Failed to save note"});
  }
});
// DELETE a note (only if username matches)
router.delete("/:id", async (req, res) => {
  try {
    const note = await WallNote.findById(req.params.id);
    if (!note) return res.status(404).json("Note not found");

    if (note.username === req.body.username) {
      await note.deleteOne();
      return res.status(200).json("Note has been deleted successfully!");
  } else {
      return res.status(401).json("You can only delete your note!");
  }
} catch (err) {
  console.error("❌ Error deleting note:", err);
  return res.status(500).json(err);
}
});


module.exports = router;
