const express = require("express");
const app = express();

const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("Server is OK!");
});

// Root route
app.get("/", (req, res) => {
  res.send("Books API Server is running!");
});


// _________ CRUD ROUTES ____________________________

// CREATE - Add a new book 
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  // Create new book with auto-increment ID
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json({
    message: "Book created successfully",
    book: newBook,
  });
});



// READ 
app.get("/books", (req, res) => {
  res.status(200).json({ books });
});

// READ - Get single book by ID (GET)
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((val) => val.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json({ book });
});




// UPDATE 
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((val) => val.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  // Update book
  books[bookIndex] = { id, title, author };

  res.status(200).json({
    message: "Book updated successfully",
    book: books[bookIndex],
  });
});



// DELETE 
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((val) => val.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Remove book
  const deletedBook = books.splice(bookIndex, 1);

  res.status(200).json({
    message: "Book deleted successfully",
    deletedBook: deletedBook[0],
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
