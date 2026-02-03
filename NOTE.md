_________________________________________________________________________________________________________

👉 Routing:

-- Create a server using express:

const express  = require("express");
const app = express(); // it creates an Express application instance that acts as a server.
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Express server is running on ${PORT}`);
})



-- Create a route using express:

const express  = require("express");
const app = express(); 
const PORT = 3000;

// create basic Express route
app.get("/", (req, res) => {
    res.send("Server is running");
})

app.get("/notes", (req, res) => {
    res.status(201).send("Here is your Notes about How to learn Express JS");
})

app.listen(PORT, () => {
    console.log(`Express server is running on ${PORT}`);
})




_________________________________________________________________________________________________________

👉 Response:

-- simple string response:

app.get("/", (req, res) => {
    res.send("Server is running");
})


-- response status code:

app.get("/notes", (req, res) => {
    res.status(201).send("Here is your Notes about How to learn Express JS");
})



-- JSON response:

const notes = [
    {id: 1, title: "My Note 1", content: "content 1..."},
    {id: 2, title: "My Note 2", content: "content 2..."},
    {id: 3, title: "My Note 3", content: "content 3..."},
]

app.get("/notes", (req, res) => {
    // JSON response
    res.status(200).json({ notes });
})


-- response download:

app.get("/download", (req, res) => {
    res.download("../20220505_092000.jpg");
})


-- response redirect:

// if visit /redirect then system auto move to /download
app.get("/redirect", (req, res) => {
    res.redirect("/download");
})


-- response header:

// header response (html)
app.get("/html", (req, res) => {
    res.set("Content-type", "text/html");
    res.send("<h1>Hello, I am a HTML file...</h1>")
})


-- response set cookies and clear cookies:

// response cookies
app.get("/set-cookies", (req, res) => {
    res.send("Cookies sent...");
    console.log("Cookie is created");
})


// Actual use cases: when log in then create a cookies, and remove when logout

app.get("/login", (req, res) => {
    res.cookie("username", "faisal");
    res.send("Cookies create...");
    console.log("Cookie is created");
})

app.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.send("Cookies delete...");
    console.log("Cookie is deleted");
});





_________________________________________________________________________________________________________

👉 Request:


-- Request Headers (Get method):

const ACCESS_KEY_IN_SERVER = "1234";

app.get("/notes", (req, res) => {
    const accessKeyFromClient = req.headers.authorization; // get client's key

    if(accessKeyFromClient !== ACCESS_KEY_IN_SERVER) {
        res.status(401).json({
            error: "Authentication failed!"
        })
        return;
    }

    console.log(accessKeyFromClient);
    res.status(200).json({ notes });
})




-- Request Body (Post method):

app.use(express.json());
// app.use(express.json()) built in middleware is essential for your POST endpoint to work properly.

app.post("/notes", (req, res) => {
    const { id, title, content } = req.body;
    const addNote = { id, title, content };
    // console.log("New note: ", addNote); // { id: 4, title: 'My Note 4', content: 'content 4...' }

    notes.push(addNote);
    // console.log("All notes: ", notes); // get all notes together

    res.status(201).json(addNote);
});




-- Put request (request route params): for update we need id for understand which one we update. example: 
// url: http://localhost:3000/notes/101

// how to create route(id) params
app.put("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    res.status(200).end(noteId);
})


// how can update by id(route params)

app.put("/notes/:id", (req, res) => {
    const noteId = req.params.id; // 1
    const { title } = req.body;
    console.log(title); // This is updated notes

    let newNotes = notes.map( val => {
      //console.log(`${val.id}` === noteId); // true

      if(`${val.id}` === noteId) {
        return { ...val, title};
      }

      return val
    });
    console.log(newNotes);

    res.status(200).json(newNotes);
})




-- Request delete method --> http://localhost:3000/notes/1

app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id; // 1
    notes = notes.filter(note => {
        return `${note.id}` !== noteId;
    })
    console.log(notes);

    res.end();
})




-- Request query params: http://localhost:3000/notes?id=1

app.get("/notes", (req, res) => {
    const queryId = parseInt(req.query.id); // 1
    res.status(200).json( {notes: notes.filter(val => queryId === val.id)});
})






_________________________________________________________________________________________________________

👉 Middleware:
1. Application Middleware
2. Routes Middleware


// structure application middleware:

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.url); // GET /
  next();
};

app.use(logMiddleware);



1. Application middleware: -> works for all routes

// save request log

const logMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} - ${req.url}`;
  console.log(log); // 2026-02-03T07:55:29.526Z - GET - /

  next();
};

app.use(logMiddleware);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/students", (req, res) => {
  res.send("student url...");
});


app.listen(PORT, () => {
  console.log(`Express server is running on ${PORT}`);
});



// Save all request log on a file

const fs = require("fs");
const path = require("path");

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




2. // Route middleware: for specific Routes

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

// Insert Route Middleware
app.get("/login", authCheckMiddleware, (req, res) => {
    res.status(200).send("User is Authorized");
});





_________________________________________________________________________________________________________

👉 Multer:


-- Single file upload:

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


// create new student
app.use(express.json()); 
app.post("/add-student", authMiddleware, upload.single("profilePic"), (req, res) => {
    const newStudentName = req.body.name;
    const newStudent = {
        id: new Date().getTime(),
        name: newStudentName,
        profilePic: req.file.filename,
    };

    STUDENTS.push(newStudent);

    res.status(201).json({ newStudent });
})



-- Multiple files upload:


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