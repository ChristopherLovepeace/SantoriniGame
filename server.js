const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/game.js");
const userRoutes = require("./routes/users.js")

const app = express();
const DEFAULT_PORT = 8080;

app.use(express.static('public'));//tells express where our client.html file is
app.use(express.json());
app.set('port', (process.env.PORT || DEFAULT_PORT));
app.use("/users", userRoutes);
app.use("/game", gameRoutes);
// We need this middleware func for endpoints
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set("Access-Control-Allow-Headers", "content-type");
    next();
});
//TEST
app.get('/', function(req, res){
    res.status(200).send("hello");
});
app.listen(app.get('port'), function(){
    console.log(`server open on port: ${app.get('port')}`)
});
