const booksTable = require("../models/books.model");
const db = require('../db');

// Root controller
exports.rootRoutes = (req, res) => {
    res.send("Books API Server is running!");
};


// Read book controller
exports.readController = async (req, res) => {
    const books = await db.select().from(booksTable);
    res.status(200).json({ books });
}


// Read book by id controller
exports.readByIDController = (req, res) => {
    const id = parseInt(req.params.id);
    const book = BOOKS.find((val) => val.id === id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({ book });
}



// create books controller
exports.createController = (req, res) => {
    const { title, author } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

    // Create new book with auto-increment ID
    const newBook = {
      id: BOOKS.length + 1,
      title,
      author,
    };

    BOOKS.push(newBook);
    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
}



// Update book controller
exports.updateController = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const bookIndex = BOOKS.findIndex((val) => val.id === id);

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
    BOOKS[bookIndex] = { id, title, author };

    res.status(200).json({
      message: "Book updated successfully",
      book: BOOKS[bookIndex],
    });
}


// Delete book controller
exports.deleteController = (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = BOOKS.findIndex((val) => val.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Remove book
    const deletedBook = BOOKS.splice(bookIndex, 1);

    res.status(200).json({
      message: "Book deleted successfully",
      deletedBook: deletedBook[0],
    });
}