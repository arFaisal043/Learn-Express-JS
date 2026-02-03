const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express(); // it creates an Express application instance that acts as a server.

const PORT = 3000;

const ACCESS_KEY_IN_SERVER = "1234";

// let notes = [
//     {id: 1, title: "My Note 1", content: "content 1..."},
//     {id: 2, title: "My Note 2", content: "content 2..."},
//     {id: 3, title: "My Note 3", content: "content 3..."},
// ]

// create basic Express route

// app.get("/", (req, res) => {
//     res.send("Server is running");
// })

// app.listen(PORT, () => {
//     console.log(`Express server is running on ${PORT}`);
// });

// ........... Response .................

// create route
// app.get("/notes", (req, res) => {
//   // JSON response
//   res.status(200).json({ notes });
// });

// // download
// app.get("/download", (req, res) => {
//     res.download("../20220505_092000.jpg");
// })

// // if visit /redirect then system auto move to /download
// app.get("/redirect", (req, res) => {
//     res.redirect("/download");
// })

// // header response (html)
// app.get("/html", (req, res) => {
//     res.set("Content-type", "text/html");
//     res.send("<h1>Hello, I am a HTML file...</h1>")
// })

// app.get("/login", (req, res) => {
//     res.cookie("username", "faisal");
//     res.send("Cookies create...");
//     console.log("Cookie is created");
// })

// app.get("/logout", (req, res) => {
//     res.clearCookie("username");
//     res.send("Cookies delete...");
//     console.log("Cookie is deleted");
// });

// // ............ Request .................

// // request get method
// // app.get("/notes", (req, res) => {
// //   const accessKeyFromClient = req.headers.authorization; // get client's key

// //   if (accessKeyFromClient !== ACCESS_KEY_IN_SERVER) {
// //     res.status(401).json({
// //       error: "Authentication failed!",
// //     });
// //     return;
// //   }

// //   // console.log(accessKeyFromClient);
// //   res.status(200).json({ notes });
// // });

// // request post method
// app.use(express.json());

// app.post("/notes", (req, res) => {
//     const { id, title, content } = req.body;
//     const addNote = { id, title, content };
//     // console.log("New note: ", addNote); // { id: 4, title: 'My Note 4', content: 'content 4...' }

//     notes.push(addNote);
//     // console.log("All notes: ", notes); // get all notes together

//     res.status(201).json(addNote);
// });

// // request put method --> http://localhost:3000/notes/1

// app.put("/notes/:id", (req, res) => {
//     const noteId = req.params.id; // 1
//     const { title } = req.body;
//     console.log(title); // This is updated notes

//     notes = notes.map( val => {
//       //console.log(`${val.id}` === noteId); // true

//       if(`${val.id}` === noteId) {
//         return { ...val, title};
//       }
//       return val;
//     });

//     res.status(200).json(notes);
// })

// // request delete method --> http://localhost:3000/notes/1

// app.delete("/notes/:id", (req, res) => {
//     const noteId = req.params.id; // 1
//     notes = notes.filter(note => {
//         return `${note.id}` !== noteId;
//     })
//     console.log(notes);

//     res.end();
// })

// // -- Request query params: http://localhost:3000/notes?id=1

// app.get("/notes", (req, res) => {
//     const queryId = parseInt(req.query.id); // 1
//     res.status(200).json( {notes: notes.filter(val => queryId === val.id)});
// })





// ................. Middleware ................

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