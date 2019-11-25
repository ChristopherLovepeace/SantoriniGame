async function loginRequest(name, pass){
    let updata = {
        name : name,
        pass : pass
    }
    try{
        let response = await service.postData(updata, `users/auth/${nameInp.value}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
            displayUserView();
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function signupRequest(name, email, pass){
    let updata = {
        name : name,
        email: email,
        pass : pass
    }
    try{
        let response = await service.postData(updata, `users/`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
            displayUserView();
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function updateRequest(id, name, email){
    let updata = {
        id : id,
        name : name,
        email: email
    }
    try{
        let response = await service.putData(updata, `users/${id}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
            displaySettings();
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function updateRequestPass(id, pass){
    let updata = {
        id : id,
        pass: pass
    }
    try{
        let response = await service.putData(updata, `users/pass/${id}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
            displaySettings();
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function deleteRequest(id){
    let updata = {
        id : id
    }
    try{
        let response = await service.deleteData(updata, `users/${id}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            sessionStorage.clear();
            tryLogin();
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function getUserRequest(id){
    try{
        let response = await service.getData(`users/${id}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
            return null;
        }else{
            txtOut.innerHTML = data.msg;
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}

//Game Requests

async function getGameByTypeRequest(type){
    try{
        let response = await service.getData(`games/gametype/${type}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
            return null;
        }else{
            txtOut.innerHTML = data.msg;
            return data;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function getGameByUserID(id){
    try{
        let response = await service.getData(`games/userid/${id}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
            return null;
        }else{
            txtOut.innerHTML = data.msg;
            return data;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function getGameByUserShare(username){
    try{
        let response = await service.getData(`games/usershare/${username}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
            return null;
        }else{
            txtOut.innerHTML = data.msg;
            return data;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function getGameByGameID(gameid){
    try{
        let response = await service.getData(`games/gameid/${gameid}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
            return null;
        }else{
            txtOut.innerHTML = data.msg;
            return data;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function startGameRequest(gamename, userid, username, gamestate, gametype, gametheme, gameusers, gamerounds, gameusershare){
    let updata = {
        gamename : gamename,
        userid : userid,
        username : username,
        gamestate: gamestate,
        gametype : gametype,
        gametheme : gametheme,
        gameusers : gameusers,
        gamerounds : gamerounds,
        gameusershare : gameusershare
    }
    try{
        let response = await service.postData(updata, `games/`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
            return data;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function deleteGameRequest(gameid){
    let updata = {};
    try{
        let response = await service.deleteData(updata, `games/${gameid}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function updateGameUsersRequest(gameid, gameusers, username){
    let updata = {
        gameid : gameid,
        gameusers : gameusers,
        username: username
    }
    try{
        let response = await service.putData(updata, `games/users/${gameid}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
async function updateGameLastMoveRequest(gameid, username){
    let updata = {
        gameid : gameid,
        username: username
    }
    try{
        let response = await service.putData(updata, `games/users/${gameid}`);
        let data = await response.json();
        if(response.status>202){
            txtOut.innerHTML = `${response.status} ${data.msg}`;
        }else{
            txtOut.innerHTML = data.msg;
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}
//Chat Requests
async function getChat(gameid){
    try{
        let response = await service.getData(`games/chat/${gameid}`);
        let data = await response.json();
        return data;
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
    
}
async function postChat(gameid, msg){
    let updata = {
        gameid : gameid,
        msg : msg
    }
    try{
        let response = await service.postData(updata, `games/chat/${gameid}`);
        let data = await response.json();        
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}