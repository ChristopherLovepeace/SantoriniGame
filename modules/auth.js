const express = require("express");
const route = express.Router();
const crypto = require("crypto");
let secrets;
try{
    secrets = require("../secrets.js");
}catch(err){
    console.error("Not running locally so no secrets")
}
const dbConnection = process.env.DATABASE_URL || secrets.env.DATABASE_URL;
const db = require('../modules/db')(dbConnection);

async function authenticate(user_name, pswhash){
    let result = null;
    try{
        result = await db.getUserByName(user_name);
        if(result){
            if(result.user_pswhash == pswhash){
                return result;
            }
        }else{
            return result;
        }

    }catch(err){
        console.log(err);
    }
}

module.exports = authenticate;