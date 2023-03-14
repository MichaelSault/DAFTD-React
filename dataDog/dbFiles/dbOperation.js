const { Train, Feed } = require('@mui/icons-material');
const config = require('./dbConfig'),
    sql = require('mssql');


const addDog = async(DogInfo) => {
    let FeedTime = Date();
    let FeedDateValue = new Date().getTime();
    try {
        let pool = await sql.connect(config);
        let dogBio = await pool.request().query(`INSERT INTO GoodBoys(Name) VALUES ('${DogInfo.Name}','${DogInfo.FeedTime}','${DogInfo.Breed}','${DogInfo.AdoptDate}','${DogInfo.Age}')`);
        let dogID = await pool.request().query(`SELECT dogID from GoodBoys WHERE Name = '${DogInfo.Name}' ORDER BY dogID DESC`);
        console.log(dogID.recordset[0].dogID);
        return parseInt(dogID.recordset[0].dogID);
    }
    catch(error) {
        console.log(error);
    }
}

const getFeedTime = async(DogInfo) => {
    try {
        let pool = await sql.connect(config);
        let feedTime = await pool.request().query(`SELECT * from GoodBoys WHERE DogID = 1`);

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

const linkDog = async(OwnerInfo, DogID) => {
    console.log(OwnerInfo.OwnerID);
    console.log(DogID);
    try {
        let pool = await sql.connect(config);
        let dogBio = await pool.request().query(`INSERT INTO OwnerDogLinks(OwnerID, DogID) VALUES ('${OwnerInfo.OwnerID}', '${DogID}')`);
        return dogBio;
    }
    catch(error) {
        console.log(error);
    }
}


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