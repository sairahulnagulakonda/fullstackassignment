const Book = require("../models/Book");
const { Op, fn, col } = require("sequelize");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, condition, availability } = req.body;
    const userId = req.user.id;
    const book = await Book.create({
      title,
      author,
      genre,
      condition,
      availability,
      userId,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findByPk(bookId);

    res.status(200).json(book);
  } catch (error) {
    console.error("Error:", error); // More detailed error logging
    res.status(500).json({ error: error.message });
  }
};

exports.getBookByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const books = await Book.findAll({
      where: {
        userId: userId, // Corrected this part
      },
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error); // More detailed error logging
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre, condition, availability, location } =
      req.body;
    const userId = req.user.id;

    const book = await Book.findOne({ where: { id: bookId, userId } });

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not owned by user" });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.condition = condition;
    book.availability = availability;
    book.location = location;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findOne({ where: { id: bookId, userId } });

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not owned by user" });
    }

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    console.log("Enter into get books function");

    let { search, author, genre, availability, location, page, limit } =
      req.query;

    // Pagination defaults
    page = page ? parseInt(page, 10) : 1;
    limit = limit ? parseInt(limit, 10) : 10;
    const offset = (page - 1) * limit;

    const filters = {};

    // Adding filters based on query parameters
    if (search) {
      filters.title = { [Op.iLike]: `%${search}%` };
    }
    if (author) {
      filters.author = { [Op.iLike]: `%${author}%` };
    }
    if (genre) {
      filters.genre = { [Op.iLike]: `%${genre}%` };
    }
    if (availability) {
      filters.availability = availability === "true";
    }
    if (location) {
      filters.location = { [Op.iLike]: `%${location}%` };
    }

    const { rows: books, count: total } = await Book.findAndCountAll({
      where: filters,
      limit,
      offset,
    });

    res.status(200).json({
      books,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: error.message });
  }
};
