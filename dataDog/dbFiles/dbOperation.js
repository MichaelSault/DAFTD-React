const { Train, Feed } = require('@mui/icons-material');
const config = require('./dbConfig'),
    sql = require('mssql');


const addDog = async(DogInfo) => {
    try {
        let pool = await sql.connect(config);
        let dogBio = await pool.request().query(`INSERT INTO GoodBoys(Name) VALUES ('${DogInfo.Name}')`);
        console.log(dogBio.DogID);
        return dogBio;
    }
    catch(error) {
        console.log(error);
    }
}

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

const getOwnerProfile = async(OwnerProfile) => {
    try {
        let pool = await sql.connect(config);
        console.log(OwnerProfile);
        let owner = await pool.request().query(`SELECT * from Owners WHERE Email = '${OwnerProfile.Email}' AND Password = '${OwnerProfile.Password}'`);
        console.log("Value returned by query:")
        console.log(owner);
        return owner;
    }
    catch(error) {
        console.log(error);
    }
}

const linkDog = async(DogInfo) => {
    try {
        let pool = await sql.connect(config);
        let dogBio = await pool.request().query(`INSERT INTO OwnerDogLinks(OwnerID, DogID) VALUES ('${DogInfo.OwnerID}', '${DogInfo.DogID}')`);
        console.log(dogBio.DogID);
        return dogBio;
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
    addDog,
    getFeedTime,
    getOwnerProfile,
    linkDog,
    //setFeedTime,
    updateFeedTime
}