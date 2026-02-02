const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5173;

// uploads folder
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name =
      Date.now() + "-" + Math.random().toString(36).substring(2) + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send(`
        <h2>File Upload Test</h2>
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file">
            <button>Upload</button>
        </form>
    `);
});

// Single file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });

  res.json({
    success: true,
    file: {
      name: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
    },
  });
});

// Multiple files
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  res.json({
    success: true,
    files: req.files.map((f) => f.filename),
  });
});

// List files
app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    res.json({ files });
  });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
