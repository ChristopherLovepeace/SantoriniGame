const express = require("express");
const route = express.Router();
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
let secrets;
try{
    secrets = require("../secrets.js");
}catch(err){
    console.error("Not running locally so no secrets")
}
const dbConnection = process.env.DATABASE_URL || secrets.env.DATABASE_URL;
const db = require('../modules/db')(dbConnection);

/*
route.get("/:userID", function(req,res,next){
    let updata = req.body;
    let result = db.getUser(updata.userID);
    if(result.rows.length>0){
        res.status(200).json(result);
    }else {
        res.status(500).end();
    }
})
route.delete("/:userID", function(req,res,next){
    let updata = req.body;
    let result = db.deleteUser(updata.userID);
    if(result.rows.length>0){
        res.status(200).json(result);
    }else {
        res.status(500).end();
    }
})
*/
route.post("/", function(req,res,next){
    let id = Math.random().toString(10).substr(2,6);
    let updata = req.body;       
    let result = db.createUser(id, updata.email, updata.name, updata.pass);
    console.log("hello");
    if(result!=0){
        res.status(200).json(result);
    }else {
        res.status(500).end();
    }
});

module.exports = route;