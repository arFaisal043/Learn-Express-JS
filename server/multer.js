const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");
const app = express();

const PORT = 5173;
const serverPassword = 1234;

const STUDENTS = [
    {id: 1, name: "David", profilePic: "david.jpg"},
    {id: 2, name: "Luna", profilePic: "luna.jpg"},
]


// folder destination instance:

// It's can not add extension
// const upload = multer({dest: "uploads/"})

// Logical add extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Specifies folder for saving uploaded files
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Creates unique filename with timestamp
});
const upload = multer({ storage }); // Creates multer middleware with custom storage configuration



// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const pass = req.headers.authorization;

    if(serverPassword != pass) {
        res.status(401).json(
            {
                error: "User is unauthorized!"
            }
        )

        return;
    }
    next();
}


// Routing
app.get("/", (req, res) => {
    res.status(200).send("Server is running...");
});

app.get("/login", authMiddleware, (req, res) => {
    res.status(200).send("Login successfully...");
});

app.get("/students", authMiddleware, (req, res) => {
    res.status(200).json({students: STUDENTS});
});



// create new students: --> single file upload
// app.use(express.json()); 

// app.post("/add-student", authMiddleware, upload.single("profilePic"), (req, res) => {
//     const newStudentName = req.body.name;
//     const newStudent = {
//         id: new Date().getTime(),
//         name: newStudentName,
//         profilePic: req.file.filename,
//     };

//     STUDENTS.push(newStudent);

//     res.status(201).json({ newStudent });
// })




// create new students: --> Multiple files upload

app.use(express.json()); 

// Multiple files upload layout (middleware)
const uploadLayout = upload.fields([
    {name: 'photo', maxCount:1},
    {name: 'documents', maxCount:3},
])

app.post("/add-student", authMiddleware, uploadLayout, (req, res) => {
    const newStudentName = req.body.name;
    const profilePic = req.files.photo[0].filename;
    const documents = req.files.documents.map(val => val.filename);

    console.log(req.files);

    const newStudent = {
        id: new Date().getTime(),
        name: newStudentName,
        profilePic,
        documents,
    };

    STUDENTS.push(newStudent);

    res.status(201).json({ newStudent });
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});