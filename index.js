// import express
const express = require('express');

// create app
const app = express();

// import and configure the dotenv module
const dotenv = require("dotenv");
dotenv.config();

// call the mongoose module
const mongoose = require("mongoose");

// create and import the model on the index.js
const ToDoTask = require("./modules/ToDoTask");

// extract data from the form
app.use(express.urlencoded({extended: true}));

// access to css
app.use("/static", express.static("public"));

mongoose.connect(process.env.DB_CONNECT)
.then(() => {
console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running"));
})
.catch((err) => { console.error(err); });

// use template engine to apply web template to our web app
app.set("view engine", "ejs");

// create a route handler for a GET HTTP request, listen to the request and send response
app.get('/',(req,res) => {
    // response as plain text
    res.render('todo.ejs');
});

// post the extract values to the server and have the value display in the terminal
// app.post('/',(req,res) => {
//     console.log(req.body);
// });

app.post('/', async (req, res) => {
    const todoTask = new ToDoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.status(500).send(err);
    res.redirect("/");
    }
    });

// listen method for the app object 
app.listen(3000, () => console.log("Server up and running"));