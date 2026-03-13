const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express(); // it creates an Express application instance(obj) that acts as a server.

const PORT = 3000;

const ACCESS_KEY_IN_SERVER = "1234";


// ___________ Middleware __________________________

// application middleware:

const logMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} - ${req.url}\n`;
  // console.log(log); // 2026-02-03T07:55:29.526Z - GET - /

  fs.appendFile(path.join(__dirname, "request.log"), log, (err) => {
    if(err) {
        console.error("Log failed!", err);
    }
  })

  next();
};

app.use(logMiddleware);


// Route middleware:
const authCheckMiddleware = (req, res, next) => {
    const pass = req.headers.authorization;

    if (ACCESS_KEY_IN_SERVER !== pass) {
        res.status(401).json({
          error: "User is not Authorized",
        });

        return;
    }
    next();
}




app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.get("/students", (req, res) => {
  res.send("student url...");
});

app.get("/add-students", (req, res) => {
  res.send("add student url...");
});


// Insert Route Middleware
app.get("/login", authCheckMiddleware, (req, res) => {
    res.status(200).send("User is Authorized");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});