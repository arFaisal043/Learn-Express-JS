const express = require("express");
const app = express();

const PORT = 8000;

const students = [
    {id:1, name:"Alan"},
    {id:2, name:"Bob"},
    {id:3, name:"John"},
]

// student controller
const studentController = (req, res) => {
    const query = req.query.name.toLowerCase(); // bob

    if (query) {
      const result = students.filter(val => val.name.toLowerCase().includes(query));
      res.json({ student: result });

      return;
    }

    res.json({ students });
};




app.get("/health", (req, res) => {
    res.send("SUCCESS!");
});

// insert controller on routes
app.get("/api/students/", studentController);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})