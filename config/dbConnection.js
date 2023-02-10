const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

mongoose.set('strictQuery', true);

const URI = process.env.mongoURI;
const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(URI);
        console.log("DB connected", connect.connection.host)
    }catch(e){
        console.log("error"+ e)
    }
}

module.exports = connectDb;