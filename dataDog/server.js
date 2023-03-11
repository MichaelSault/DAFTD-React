const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const API_PORT = process.env.PORT || 5000; 
const app = express(); //starts the server

//define one day in milliseconds
const oneWeek = 1000 * 60 * 60 * 24 * 7;

//session middleware
app.use(sessions({
    secret: "sneakydatadog", //will remove secret if I ever host publicly
    saveUninitalized: true,
    cookie: {maxAge: oneWeek},
    resave: false,
    path: '/login'
}));

//parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

//serving public file
app.use(express.static(__dirname));

//cookie parser middleware
app.use(cookieParser());

//a variable to save a session
var session;

//call to logout the user
app.get('/logout',(req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/getFeed', async(req, res) => {
    const result = await dbOperation.getFeedTime(req.body);
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
});

app.post('/setFeed', async(req, res) => { 
    const result = await dbOperation.updateFeedTime(req.body);
    console.log(result);
});


//verifies login credentials and creates a cookie
app.post('/login', async(req, res) => {
    const result = await dbOperation.getOwnerProfile(req.body);
    if (result.recordset[0] != null){
        res.cookie('email', result.recordset[0].Email);
        console.log(res.cookie);
    } else {
        console.log("No user found");
        res.cookie('email', 'error - no email found');
    }
});

app.post('/signup', async(req, res) => {
    const result = await dbOperation.createOwner(req.body);
    console.log(result);
});

app.post('/adopt', async(req, res) => {
    console.log(req.body);
    const result = await dbOperation.addDog(req.body);
    console.log(result);
    const result2 = await dbOperation.linkDog(req.body, result);
    console.log(result2);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));