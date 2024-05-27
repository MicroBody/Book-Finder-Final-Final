// routes/books.js
const express = require('express');
const router = express.Router();

let books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    genre: 'Fiction',
    releaseDate: '2022-01-01',
    info: 'This is book 1.',
    ratings: 4.5
  }
];

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json(book);
  }
});

// Get all books with optional search criteria
router.get('/', (req, res) => {
  const { title, author, genre, releaseDate, info, ratings } = req.query;

  let filteredBooks = books;

  if (title) {
    filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }
  if (author) {
    filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (genre) {
    filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
  }
  if (releaseDate) {
    filteredBooks = filteredBooks.filter(book => book.releaseDate === releaseDate);
  }
  if (info) {
    filteredBooks = filteredBooks.filter(book => book.info.toLowerCase().includes(info.toLowerCase()));
  }
  if (ratings) {
    filteredBooks = filteredBooks.filter(book => book.ratings === parseFloat(ratings));
  }

  res.json(filteredBooks);
});

// Add a new book
router.post('/', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

// Update book details
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  books = books.map(book => (book.id === bookId ? { ...book, ...updatedBook } : book));

  res.json(books.find(book => book.id === bookId));
});

// Delete a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;