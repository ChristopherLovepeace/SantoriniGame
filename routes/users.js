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
const authenticate = require('../modules/auth');
route.post("/", async function(req,res,next){
    let id = Math.random().toString(10).substr(2,8);
    let updata = req.body;
    let hash = crypto.createHash("sha256");
    let pswhash = hash.update(updata.pass).digest("base64");
    let result = await db.createUser(id, updata.email, updata.name, pswhash);
    if(result){
        res.status(200).json({email: result.user_email, name: result.user_name, id: result.user_id});
    }else{
        res.status(500).end();
    }
});
route.delete("/:user_id", async function(req,res,next){
    let updata = req.body;
    let result = await db.deleteUser(updata.id);
    if(result){
        res.status(200).json({msg: "Deleted"});
    }else{
        res.status(500).json({msg: "Error"});
    }
});
route.get("/:user_id", async function(req,res,next){
    let updata = req.body;
    let result = await db.getUserByID(updata.id);
    if(result){
        res.status(200).json({msg: "Got user", email: result.user_email, name: result.user_name});
    }else{
        res.status(500).json({msg: "Error"});
    }
});
route.get("/auth/:user_name", async function(req,res,next){
    let updata = req.body;
    let hash = crypto.createHash("sha256");
    let pswhash = hash.update(updata.pass).digest("base64");
    let result = await authenticate(updata.name, pswhash);
    if(result){
        res.status(200).json({msg: "Authentification successful", id: result.user_id, name: result.user_name});
    }else{
        res.status(500).json({msg: "Authentification failed"});
    }
});
route.put("/:user_id", async function(req, res, next){
    let updata = req.body;
    //let hash = crypto.createHash("sha256");
    //let pswhash = hash.update(updata.pass).digest("base64");
    let result = await db.updateUser(updata.id, updata.email, updata.name);
    if(result){
        res.status(200).json({email: result.user_email, name: result.user_name, id: result.user_id});
    }else{
        res.status(500).end();
    }

});
module.exports = route;