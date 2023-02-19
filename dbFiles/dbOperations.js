const getFeedTime = async(DogInfo) => {
    try {
        let pool = await sql.connect(config);
        let fedTime = await pool.request().query(`SELECT * from DataDog WHERE DogID = '${DogInfo.ID}'`);
        console.log("Value returned by query:")
        console.log(fedTime);
        return fedTime;
    }
    catch(error) {
        console.log(error);
    }
}

const setFeedTime = async(DogInfo) => {
    //console.log(DogInfo);
    try {
        let pool = await sql.connect(config);
        let trainers = await pool.request().query(`INSERT INTO TrainerProfile(FedTime) VALUES (
            '${DogInfo.FedTime}'
        )`);
        console.log(TrainerProfile.trainerName, TrainerProfile.email, TrainerProfile.firstName, TrainerProfile.lastName, TrainerProfile.password);
        return trainers;
    }
    catch(error) {
        console.log(error);
    }
}