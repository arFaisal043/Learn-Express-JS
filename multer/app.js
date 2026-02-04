import express from "express"
import multer from "multer"
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})