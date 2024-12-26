const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

const createBook = async (req, res) => {
  const { title, author, edition } = req.body;
  try {
    const book = await Book.create({ title, author, edition });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, edition } = req.body;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.update({ title, author, edition });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
