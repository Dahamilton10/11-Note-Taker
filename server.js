const express = require("express");
var path = require("path");
const fs = require("fs");

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,"public", "index.html"));
    res.sendFile(path.join(__dirname,"public", "assets", "js", "index.js"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname,"public", "notes.html"));
    res.sendFile(path.join(__dirname,"public", "assets", "css", "styles.css"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
