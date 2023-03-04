const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000; 
const app = express(); //starts the server

//define variables for mongoDB
let client;
let session;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors()); 

app.post('/getFeed', async(req, res) => {
    const result = await dbOperation.getFeedTime(req.body);
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
});

app.post('/setFeed', async(req, res) => { 
    //await dbOperation.setFeedTime(req.body);
    const result = await dbOperation.updateFeedTime(req.body);
    console.log(result);
});

app.post('/login', async(req, res) => {
    const result = await dbOperation.getOwnerProfile(req.body);
    res.send(result.recordset[0]);
});

app.post('/signup', async(req, res) => {
    const result = await dbOperation.createOwner(req.body);
    console.log(result);
});

app.post('/adopt', async(req, res) => {
    const result = await dbOperation.addDog(req.body);
    console.log(result);
    const result2 = await dbOperation.linkDog(result);
    console.log(result2);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));