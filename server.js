const express = require("express");
const bodyParser = require("body-parser");
const db = require(".modules/db")(process.env.dbconnection);
const gameRoutes = require("./routes/game.js");
const app = express();
const DEFAULT_PORT = 8080;
app.use("/game", gameRoutes);
app.use(express.static('public'));//tells express where our client.html file is
app.use(express.json());
app.set('port', (process.env.PORT || DEFAULT_PORT));

// We need this middleware func for endpoints
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set("Access-Control-Allow-Headers", "content-type");
    next(); //go to endpoint
});

app.get("/game/:gameID", function(req, res, next){

});

app.get("/user/:userID", function(req, res, next){
    
    let user = db.getUser(req.body.userID);
    if(user){
        res.status(200).json(user);
    }else {
        res.status(500).end();//500 or 400 lvl code matters, because 500 means it's the DB that's messed up, but 400 means its a timeout etc
    }
});

app.post('/', function(req, res){

    let txt = `Welcome user, your username is: ${req.body.name}\n, your encrypted password is: ${req.body.pass}`
    res.status(200).send(txt);
    //this is bad, but it's just testing and we will change it later :)
});

app.get('/', function (req, res) {
    // code here... 
    res.status(200).send("hello from GET"); //send response    
});

app.listen(app.get('port'), function(){
    console.log(`server open on port: ${app.get('port')}`)
});
//hello