const express = require("express");
const {
  createBook,
  getBook,
  getBookByUser,
  updateBook,
  deleteBook,
  getBooks,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/create", authMiddleware, createBook);
router.get("/book/:id", authMiddleware, getBook);
router.get("/:id", authMiddleware, getBookByUser);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);
router.get("/", getBooks);

module.exports = router;
