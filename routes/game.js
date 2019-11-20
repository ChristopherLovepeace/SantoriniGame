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
const sessionChat = [];

route.post("/", async function(req,res,next){
    let game_id = Math.random().toString(10).substr(2,8);
    let updata = req.body;
    let result = await db.createGame(game_id, game_name, game_user_id, game_user_name, game_state, game_type);
    if(result){
        //let sessionChat[game_id] = [];
        res.status(200).json({msg: "Game created!", gameid: result.game_id, gamename: result.game_name, gamestate: result.game_state, gametype: result.game_type});
    }else{
        res.status(500).json({msg: "Couldn't create game!"}).end();
    }
});
route.get("/:game_id", function(req,res,next){


})
//base/application/gameID/turnID
route.get("/:gameID/:turnID", function(req,res,next){


});
// maybe put the chat in server.js?
route.post("/chat/:game_id", function(req,res,next){
    sessionChat[game_id].push(msg);
});
route.get("/chat/:game_id", function(req,res,next){

});
module.exports = route;