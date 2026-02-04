import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads folder
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2)}${ext}`;
        cb(null, uniqueName);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.post("/upload", upload.single("avatar"), (req, res) => {
    try {
        if (!req.file) throw new Error("No file uploaded");

        res.status(201).json({
            success: true,
            filename: req.file.filename,
            url: `/uploads/${req.file.filename}`,
        });
    } 
    catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Static files
app.use("/uploads", express.static("uploads"));

// Error middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || "Something went wrong",
    });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});