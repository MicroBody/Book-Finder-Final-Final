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
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    genre: 'Thriller',
    releaseDate: '2022-03-02',
    info: 'This is book 2.',
    ratings: 2.2
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Author 3',
    genre: 'Historic',
    releaseDate: '2022-02-04',
    info: 'This is book 3.',
    ratings: 1.6
  },
  {
    id: 4,
    title: 'Book 4',
    author: 'Author 3',
    genre: 'Horror',
    releaseDate: '2022-05-22',
    info: 'This is book 4.',
    ratings: 4
  },
  {
    id: 5,
    title: 'Book 5',
    author: 'Author 6',
    genre: 'Fiction',
    releaseDate: '2022-08-05',
    info: 'This is book 5.',
    ratings: 3.2
  },
  {
    id: 6,
    title: 'Book 6',
    author: 'Author 5',
    genre: 'Horror',
    releaseDate: '2022-11-23',
    info: 'This is book 6.',
    ratings: 2.6
  },
  {
    id: 7,
    title: 'Book 7',
    author: 'Author 1',
    genre: 'Fiction',
    releaseDate: '2022-04-08',
    info: 'This is book 7.',
    ratings: 3
  },
  {
    id: 8,
    title: 'Book 8',
    author: 'Author 7',
    genre: 'Children',
    releaseDate: '2022-07-14',
    info: 'This is book 8.',
    ratings: 1
  },
  {
    id: 9,
    title: 'Book 9',
    author: 'Author 5',
    genre: 'Travel Guide',
    releaseDate: '2022-10-26',
    info: 'This is book 9.',
    ratings: 2
  },
  {
    id: 10,
    title: 'Book 10',
    author: 'Author 1',
    genre: 'Romance',
    releaseDate: '2022-03-30',
    info: 'This is book 10.',
    ratings: 5
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