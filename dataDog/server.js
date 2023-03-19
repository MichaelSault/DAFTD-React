const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000; 
const app = express(); //starts the server

//parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

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
        console.log("-----------------------");
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