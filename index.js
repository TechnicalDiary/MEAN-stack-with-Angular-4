const express = require('express'); // express framework for node
const app = express();  //initiate express
const mongoose = require('mongoose');  //node tool for mongodb
const config = require('./config/database'); //mongoose config
const cors = require('cors');

const router = express.Router(); //route package
const path = require('path'); //Nodejs package for file path 
const authentication = require('./routes/authentication')(router); //middleware authentication for routes
const blogs = require('./routes/blogs')(router);

const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err){
        console.error('could not connect to database');
    } else {
        console.log('connected to datbase: ' + config.db);
        // console.log(config.secret);
    }
});

app.use(cors({
    origin:"http://localhost:4200"
}));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist'));
app.use('/blogs', blogs);
app.use('/authentication', authentication);
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
    // res.send('Hello world');
});

//comment
app.listen(8080, () =>{
    console.log("server is listining on:http://localhost:8080")
});