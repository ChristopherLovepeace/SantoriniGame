const express = require("express");
const app = express();
const DEFAULT_PORT = 8080;
app.use(express.json());
app.set('port', (process.env.PORT || DEFAULT_PORT));
app.use(express.static('public'));//tells express where our client.html file is

// We need this middleware func for endpoints
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set("Access-Control-Allow-Headers", "content-type");
    next(); //go to endpoint
});

app.post('/', function(req, res){

    let txt = `Welcome user, your username is: ${req.body.name}\n, your encrypted password is: ${req.body.pass}`
    res.status(200).send(txt);
    //this is bad, but it's just testing and we will change it later :)
});

app.listen(app.get('port'), function(){
    console.log(`server open on port: ${app.get('port')}`)
});