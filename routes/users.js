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
        res.status(200).json({msg: "Sign-up successful!", id: result.user_id, email: result.user_email, name: result.user_name, pass: result.user_pswhash});
    }else{
        res.status(500).json({msg: "Sign-up failed: User already exists!"}).end();
    }
});
route.delete("/:user_id", async function(req,res,next){
    let updata = req.body;
    let result = await db.deleteUser(updata.id);
    if(result){
        res.status(200).json({msg: "User has been deleted!"});
    }else{
        res.status(500).json({msg: "Error in deleting user!"});
    }
});
route.get("/:user_id", async function(req,res,next){
    let updata = req.params.user_id;
    let result = await db.getUserByID(updata);
    if(result){
        res.status(200).json({msg: "Found user!", id: result.user_id, email: result.user_email, name: result.user_name, pass: result.user_pswhash});
    }else{
        res.status(500).json({msg: "Error in finding user!"});
    }
});
route.post("/auth/:user_name", async function(req,res,next){
    let updata = req.body;
    let hash = crypto.createHash("sha256");
    let pswhash = hash.update(updata.pass).digest("base64");
    let result = await authenticate(updata.name, pswhash);
    if(result){
        res.status(200).json({msg: "Authentification successful!", id: result.user_id, email: result.user_email, name: result.user_name, pass: result.user_pswhash});
    }else{
        res.status(500).json({msg: "Authentification failed!"}).end();
    }
});
route.put("/:user_id", async function(req, res, next){
    let updata = req.body;
    let result = await db.updateUser(updata.id, updata.email, updata.name);
    if(result){
        res.status(200).json({msg: "Account updated successfully!", id: result.user_id, email: result.user_email, name: result.user_name, pass: result.user_pswhash});
    }else{
        res.status(500).json({msg: "Failed to update "}).end();
    }
});
route.put("/pass/:user_id", async function(req, res, next){
    let updata = req.body;
    let hash = crypto.createHash("sha256");
    let pswhash = hash.update(updata.pass).digest("base64");
    let result = await db.updateUserPass(updata.id, pswhash);
    if(result){
        res.status(200).json({msg: "Account updated successfully!", id: result.user_id, email: result.user_email, name: result.user_name, pass: result.user_pswhash});
    }else{
        res.status(500).json({msg: "Failed to update."}).end();
    }
});
//Chat functions
/*
route.get("/chat", async function(req, res, next){
    let result = await db.getChat();
    if(result){
        res.status(200).json({msg: "Loaded chat!", id: result.user_id, name: result.user_name, msg: result.user_msg, date: result.user_date});
    }else{
        res.status(500).json({msg: "Error in loading chat!"});
    }
});
route.post("/chat", async function(req,res,next){
    let updata = req.body;
    let result = await postChat(updata.id, updata.name, updata.msg, updata.date);
    if(result){
        res.status(200).json({msg: "Message sent!", id: result.user_id, name: result.user_name, msg: result.user_msg, date: result.user_date});
    }else{
        res.status(500).json({msg: "Failed to send message!"}).end();
    }
});
*/
module.exports = route;