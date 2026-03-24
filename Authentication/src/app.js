const express = require('express');
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');


const app = express();

app.use(express.json()); // is used to parse incoming JSON requests and make the data available in req.body
app.use(cookieParser());



// prefix- pre-require for get into /registration api
app.use('/api/auth', authRoutes);
app.use("/api/auth", postRoutes);


module.exports = app;