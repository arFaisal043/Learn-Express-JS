const express = require('express'); // class
const app = express(); // obj

const PORT = 5173;
const ACCESS_KEY_IN_SERVER = "1234";

// application middleware
app.use(express.json());

// custom application middleware
const demoAppMiddleware = (req, res, next) => {
    console.log("This is a demoAppMiddleware");
    next();
}

// custom Logger application middleware
const logMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

// custom Auth application middleware
const authMiddleware = (req, res, next) => {
    if(true) {
        console.log("Authentication Successfully!");
    }
    next();
}


app.use(demoAppMiddleware);
app.use(logMiddleware);



app.get("/", (req, res) => {
    res.status(200).send("Server us OK!");
})

app.get("/login", authMiddleware, (req, res) => {
    res.status(200).send("This is login page");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})