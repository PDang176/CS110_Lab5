const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;

  // Output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.send("Book is added to the database");
});

app.listen(port, () => console.log("Hello World! App listening on port 3000"));

app.get("/books", (req, res) => {
  res.json(books);
});
