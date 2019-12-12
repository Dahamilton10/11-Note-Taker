const express = require("express");
var path = require("path");
const fs = require("fs");
const axios = require("axios");

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// got this from https://expressjs.com/en/starter/static-files.html
//Dunno what it really does. I understand that this serves files from the public folder and its sub folders. I just don't understand why this code doesn't work without it.
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db", "db.json"));
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    compileNote(newNote);
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

compileNote = (note) => {
    fs.readFile(`${path.join(__dirname, "db", "db.json")}`, (err, data) => {
        if (err) throw err;
        allNotes = JSON.parse(data);
        allNotes.push(note);
        fs.writeFile(`${path.join(__dirname, "db", "db.json")}`, JSON.stringify(allNotes), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })
};