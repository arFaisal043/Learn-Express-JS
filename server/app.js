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
    res.status(200).json({ notes });
})

app.get("/download", (req, res) => {
    res.download("../20220505_092000.jpg");
})

// if visit /redirect then system auto move to /download
app.get("/redirect", (req, res) => {
    res.redirect("/download");
})

// header response (html)
app.get("/html", (req, res) => {
    res.set("Content-type", "text/html");
    res.send("<h1>Hello, I am a HTML file...</h1>")
})


app.get("/login", (req, res) => {
    res.cookie("username", "faisal");
    res.send("Cookies create...");
    console.log("Cookie is created");
})

app.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.send("Cookies delete...");
    console.log("Cookie is deleted");
});


app.listen(PORT, () => {
    console.log(`Express server is running on ${PORT}`);
})