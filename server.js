const express = require("express");
var path = require("path");
const fs = require("fs");
const axios = require("axios");

let app = express();

let id = "";

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

app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    console.log("before loop " + req.params.id)
    fs.readFile(`${path.join(__dirname, "db", "db.json")}`, (err, data) => {
        if (err) throw err;
        allNotes = JSON.parse(data);
        console.log("List " + JSON.stringify(allNotes));
        console.log("id " + id);
        popNote = (list) => {
            for (i = 0; i < allNotes.length; i++) {
                if (id === allNotes[i].id) {
                    console.log("List item " + JSON.stringify(allNotes[i]));
                    console.log("inside loop " + list[i].id);
                    list.splice(i, 1);
                }
            }
        }
        popNote(allNotes);
        fs.writeFile(`${path.join(__dirname, "db", "db.json")}`, JSON.stringify(allNotes), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
            res.sendFile(path.join(__dirname, "public", "notes.html"));
        });
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

compileNote = (note) => {
    fs.readFile(`${path.join(__dirname, "db", "db.json")}`, (err, data) => {
        if (err) throw err;
        allNotes = JSON.parse(data);
        allNotes.push(note);
        giveID(allNotes);
        fs.writeFile(`${path.join(__dirname, "db", "db.json")}`, JSON.stringify(allNotes), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })
};

giveID = (list) => {
    for (i = 0; i < list.length; i++) {
        list[i].id = uniqueID();
    }
}


// found this at https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uniqueID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

popNote = (list) => {
    for (i = 0; i < list.length; i++) {
        console.log(id);
        if (id == list[i].id) {
            list.pop(list[i]);
        }
    }
}
