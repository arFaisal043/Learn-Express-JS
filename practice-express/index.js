const express = require('express'); // class
const app = express(); // obj

const PORT = process.env.PORT = 5173;
const ACCESS_KEY_IN_SERVER = "1234";

let notes = [
    {id: 1, title: "My Note 1", content: "content 1..."},
    {id: 2, title: "My Note 2", content: "content 2..."},
    {id: 3, title: "My Note 3", content: "content 3..."}
]


app.get("/health", (req, res) => {
    res.send("Server is OK...");
})


// app.get("/notes", (req, res) => {
//     res.status(200).json({notes});
// })

app.get("/login", (req, res) => {
  res.cookie("username", "faisal");
  res.send("Cookies create...");
  console.log("Cookie is created");
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.send("Cookies delete...");
  console.log("Cookie is deleted");
});


app.get("/notes", (req, res) => {
  const ACCESS_KEY_IN_CLIENT = req.headers.authorization; // get client's key

  if (ACCESS_KEY_IN_CLIENT !== ACCESS_KEY_IN_SERVER) {
    res.status(401).json({
      error: "Authentication failed!",
    });
    return;
  }

  res.status(200).json({ notes });
});


app.use(express.json());

app.post("/all-notes", (req, res) => {
    const { id, title, content } = req.body;
    const addNote = { id, title, content };
    
    notes.push(addNote);
    //console.log("All notes: ", notes); // get all notes together
    console.log({notes}); 

    res.status(201).json({ notes });
});



app.put("notes/:id", (req, res) => {
    const noteId = req.params.id; // 1
    const {title} = req.body;

    notes = notes.map( val => {
        if(`${val.id}` === noteId) {
            return {...val, title};
        }
        return val;
    })
    res.status(200).send("Get it");
})


app.get("/note", (req, res) => {
    const queryId = parseInt(req.query.id); // 1
    res.status(200).json( {notes: notes.filter(val => queryId === val.id)});
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})