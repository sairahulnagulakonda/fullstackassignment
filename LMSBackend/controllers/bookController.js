const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, condition, availability } = req.body;
    const userId = req.user.id;
    const book = await Book.create({ title, author, genre, condition, availability, userId });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { search } = req.query;
    const books = await Book.findAll({
      where: {
        title: { [Op.iLike]: `%${search}%` },
      },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
