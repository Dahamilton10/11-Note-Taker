const express = require("express");
var path = require("path");
const fs = require("fs");

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// got this from https://expressjs.com/en/starter/static-files.html
//Dunno what it really does. I understand that this serves files from the public folder and its sub folders. I just don't understand why this code doesn't work without it.
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,"public", "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname,"public", "notes.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
