const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false   }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
  const book = req.body;

  // Output the book to the console for debugging
  console.log(book);
  if(books.find(b => b.isbn == book.isbn)){
    res.send("Book already exists in the database");
  }
  else{
    books.push(book);
    res.send("Book is added to the database");
  }

});

app.get('/book/:isbn', (req, res) => {
  const book = books.find(book => book.isbn === req.params.isbn);
  res.send(book);
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.delete('/book/:isbn', (req, res) => {
  books = books.filter(book => book.isbn !== req.params.isbn);
  res.send("Book is deleted");
})

app.post('/book/:isbn', (req, res) => {
  // Reading isbn from the URL
  const isbn = req.params.isbn;
  const newBook = req.body;

  // Remove item from the books array
  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      books[i] = newBook;
      res.send("Book is edited");
    }
  }

  // Sending 404 when not found something is a good practice
  res.send("Error 404: Book not found");
});

app.listen(port, () => console.log("Hello World! App listening on port 3000"));
