const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// middleware for cookie-parser
app.use(cookieParser());

app.get("/", (req, res) => {
    res.cookie("auth-token", "12345", {
        sameSite: "strict",
        httpOnly:true,
        secure: true
    });
    
    console.log(req.cookies);
    res.send("Hello, I'm Cookies!");
})

app.listen(3000, () => console.log("Server is running on 3000 port..."));