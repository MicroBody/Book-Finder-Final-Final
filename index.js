// index.js
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});