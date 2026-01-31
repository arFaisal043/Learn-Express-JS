const express  = require("express");
const app = express(); // it creates an Express application instance that acts as a server.
const PORT = 3000;

// create basic Express route
app.get("/", (req, res) => {
    res.send("Server is running");
})

app.get("/notes", (req, res) => {
    res.send("Here is your Notes about How to learn Express JS")
})

app.listen(PORT, () => {
    console.log(`Express server is running on ${PORT}`);
})