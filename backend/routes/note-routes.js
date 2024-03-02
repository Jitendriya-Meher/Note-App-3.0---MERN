const express = require('express');
const { addNote, getAllNotes, getSingleNote, editNote, deleteNote,deleteAllNote } = require('../controller/note-controllers');
const { authMiddleware } = require('../middlewares/auth-middleware');
const router = express.Router();

router.route("/add").post(authMiddleware,addNote);
router.route("/all").get(authMiddleware,getAllNotes);
router.route("/:id").get(getSingleNote);
router.route("/edit/:id").patch(editNote);
router.route("/delete/all").delete(authMiddleware,deleteAllNote);
router.route("/delete/:id").delete(deleteNote);

module.exports = router;