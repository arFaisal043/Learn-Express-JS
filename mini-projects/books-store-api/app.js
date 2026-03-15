require("dotenv/config");
const express = require("express");

const bookRouter = require("./routes/books.routes");

const { logMiddleware } = require("./middleware/logger");

const app = express();

const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// All custom middlewares
app.use(logMiddleware);

// All Routes
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
