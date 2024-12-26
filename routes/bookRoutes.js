const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/books', authMiddleware, getAllBooks);

router.get('/books/:id', authMiddleware, getBookById);

router.post('/books', authMiddleware, createBook);

router.put('/books/:id', authMiddleware, updateBook);

router.delete('/books/:id', authMiddleware, deleteBook);

module.exports = router;
