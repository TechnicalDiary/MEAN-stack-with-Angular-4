const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

app.get('*', (req,res) =>{
    res.send('Hello world');
});

//comment
app.listen(8080, () =>{
    console.log("server is listining on:http://localhost:8080")
});