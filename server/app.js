const express  = require("express");
const app = express(); // it creates an Express application instance that acts as a server.
const PORT = 3000;


const notes = [
    {id: 1, title: "My Note 1", content: "content 1..."},
    {id: 2, title: "My Note 2", content: "content 2..."},
    {id: 3, title: "My Note 3", content: "content 3..."},
]

// create basic Express route
app.get("/", (req, res) => {
    res.send("Server is running");
})

app.get("/notes", (req, res) => {
    // string and HTTP code pass
    // res.status(200).send("Here is your Notes about How to learn Express JS");

    // JSON pass
    res.status(200).json({ notes });
})


app.listen(PORT, () => {
    console.log(`Express server is running on ${PORT}`);
})