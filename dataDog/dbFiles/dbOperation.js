const { Train, Feed } = require('@mui/icons-material');
const config = require('./dbConfig'),
    sql = require('mssql');

const getFeedTime = async(DogInfo) => {
    try {
        let pool = await sql.connect(config);
        let feedTime = await pool.request().query(`SELECT * from GoodBoys WHERE DogID = 1`);
        //console.log("Value returned by query:")
        //console.log(feedTime);
        return feedTime;
    }
    catch(error) {
        console.log(error);
    }
}

/* const setFeedTime = async(DogInfo) => {
    let FeedTime = Date();
    console.log(DogInfo);
    try {
        let pool = await sql.connect(config);
        let feedTime = await pool.request().query(`INSERT INTO GoodBoys(DogID, Name, FeedTime) VALUES (
            1, 'Milli', '${DogInfo.FeedTime}'
        )`);
        console.log("What is the feed time?");
        console.log(DogInfo.FeedTime);
        return feedTime;
    }
    catch(error) {
        console.log(error);
    }
} */

const updateFeedTime = async(DogInfo) => {
    let FeedTime = Date();
    let FeedDateValue = new Date().getTime();
    console.log(FeedDateValue);
    try {
        let pool = await sql.connect(config);
        let feedTime = await pool.request().query(`UPDATE GoodBoys SET FeedTime = '${FeedTime}' WHERE DogID = 1`);
        console.log("What is the feed time?");
        console.log(FeedTime);
        return feedTime;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getFeedTime,
    //setFeedTime,
    updateFeedTime
}