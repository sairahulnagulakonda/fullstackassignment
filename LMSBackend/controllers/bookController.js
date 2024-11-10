const Book = require("../models/Book");
const { Op,fn,col } = require("sequelize");

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
    let { search } = req.query;
    console.log('Search query:', search); // Debugging log
    search = search ? search.toString() : '';
    
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error('Error:', error); // More detailed error logging
    res.status(500).json({ error: error.message });
  }
};


