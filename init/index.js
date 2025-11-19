const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main()
    .then(()=>{
        console.log("conneted to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main() {    
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((object)=> ({...object, owner: "68fc6361b4d94eb5720a5a75"}));
    await Listing.insertMany(initData.data);
    console.log("saved");
}

initDB();