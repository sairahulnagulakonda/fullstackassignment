const express = require("express");
const { createBook, getBooks } = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/create", authMiddleware, createBook);
router.get("/", getBooks);

module.exports = router;
