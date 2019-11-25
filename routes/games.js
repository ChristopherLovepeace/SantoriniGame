const express = require("express");
const route = express.Router();
let secrets;
try{
    secrets = require("../secrets.js");
}catch(err){
    console.error("Not running locally so no secrets")
}
const dbConnection = process.env.DATABASE_URL || secrets.env.DATABASE_URL;
const db = require('../modules/db')(dbConnection);
const sessionChat = [];

route.post("/", async function(req,res,next){
    let game_id = Math.random().toString(32).substr(2,8);
    let updata = req.body;
    let result = await db.createGame(updata.gamename, updata.userid, updata.username, game_id, updata.gamestate, updata.gametype, updata.gametheme, updata.gameusers, updata.gamerounds, updata.gameusershare);
    if(result){
        res.status(200).json({msg: "Game created!", gamename: result.game_name, gameid: result.game_id, gamestate: result.game_state, gametype: result.game_type, gametheme: result.game_theme, gameusers: result.game_users, gamerounds: result.game_rounds, gameusershare: result.game_user_share});
        sessionChat.push({gameid : game_id, msgs : []});
    }else{
        res.status(500).json({msg: "Couldn't create game!"}).end();
    }
});
route.get("/gametype/:game_type", async function(req,res,next){
    let updata = req.params.game_type;
    let result = await db.getGameByType(updata);
    if(result){
        res.status(200).json({msg: `${result.length} ${updata} games found!`, result : result});
    }else{
        res.status(500).json({msg: "No public games found!"}).end();
    }
});
route.get("/usershare/:user_name", async function(req,res,next){
    let updata = req.params.user_name;
    let result = await db.getGameByUserShare(updata);
    if(result!=null && Object.keys(result).length>0){
        res.status(200).json({msg: `You have an invitation!`,  result : result});
    }else{
        res.status(500).json({msg: "You have no invitations!"}).end();
    }
});
route.get("/userid/:user_id", async function(req,res,next){
    let updata = req.params.user_id;
    let result = await db.getGameByUserID(updata);
    if(result!=null && Object.keys(result).length>0){
        res.status(200).json({msg: `You have ${result.length} ongoing games!`,  result : result});
    }else{
        res.status(500).json({msg: "You have no ongoing games!"}).end();
    }
});
route.get("/gameid/:game_id", async function(req,res,next){
    let updata = req.params.game_id;
    let result = await db.getGameByGameID(updata);
    if(result!=null && Object.keys(result).length>0){
        res.status(200).json({msg: "Found game!", result : result});
    }else{
        res.status(500).json({msg: "No game found with that id!"}).end();
    }
});
route.put("/state/:game_id", async function(req,res,next){
    let updata = req.body;
    let result = await db.updateGameState(updata.gameid, updata.gamestate);
    if(result){
        res.status(200).json({msg: `${updata.gameusername} made a move!`, result : result});
    }else{
        res.status(500).json({msg: "Failed to update "}).end();
    }
});
route.put("/users/:game_id", async function(req,res,next){
    let updata = req.body;
    let result = await db.updateGameUsers(updata.gameid, updata.gameusers);
    if(result){
        let msg = `${updata.username} has left the game!`;
        if(updata.gameusers.length > 1 ){
            msg = `${updata.username} has joined the game!`;
        }
        res.status(200).json({msg: msg, result : result});
    }else{
        res.status(500).json({msg: "Failed to join!"}).end();
    }
});
route.delete("/:game_id", async function(req,res,next){
    let updata = req.params.game_id;
    let result = await db.deleteGame(updata);
    if(result){
        res.status(200).json({msg: "Game has been deleted!"});
        for(let elem of sessionChat){
            if(elem.gameid == updata){
              sessionChat.splice(sessionChat.indexOf(elem),1);
          }
        }
    }else{
        res.status(500).json({msg: "Error in deleting game!"}).end();
    }
});
//CHAT
route.post("/chat/:game_id", function(req,res,next){
    let updata = req.body;
    for(let elem of sessionChat){
        if(elem.gameid == updata.gameid){
          elem.msgs.push(updata.msg);
          res.status(200).json({msgs: elem.msgs}).end();
        }
    }    

});
route.get("/chat/:game_id", function(req,res,next){
    let updata = req.params.game_id;
    for(let elem of sessionChat){
        if(elem.gameid == updata){
            res.status(200).json({msgs: elem.msgs}).end();
        } 
    }
});
module.exports = route;