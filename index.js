const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err){
        console.error('could not connect to database');
    } else {
        console.log('connected to datbase: ' + config.db);
        // console.log(config.secret);
    }
});

app.use(express.static(__dirname + '/client/dist'))

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + client/dist/index.html));
    // res.send('Hello world');
});

//comment
app.listen(8080, () =>{
    console.log("server is listining on:http://localhost:8080")
});