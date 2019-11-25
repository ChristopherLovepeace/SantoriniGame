function createGameStartView(){
    let template = document.querySelector("#gameStartTemplate");
    let view = document.importNode(template.content, true);
    let play = view.querySelector("#play");
    let selectType = view.querySelector("#selectType");
    let isPrivate = false;
    selectType.addEventListener("click", function(evt){
        if(selectType.value == "private"){
            shareInp.disabled = false;
            isPrivate = true;
        }else if(selectType.value == "public"){
            shareInp.disabled = true;
            shareInp.value = "";
            isPrivate = false;
        }
    });
    play.onclick = playGame;

    clearDiv(btnCont);
    let backBtn = createElement(`<button id="backBtn">Back</button>`);
    btnCont.appendChild(backBtn);
    backBtn.addEventListener("click", function(evt){
        displayUserView();
    });
    async function playGame(evt){
        let nameInp = document.querySelector("#nameInp");
        let shareInp = document.querySelector("#shareInp")
        let selectType = document.querySelector("#selectType");
        let selectTheme = document.querySelector("#selectTheme");
        let selectRounds = document.querySelector("#selectRounds");
        let copyData = loadSessionArray("key")[0];
        let gamestate = [0];
        let gameusers = [copyData.name];
        let gametheme = 1;
        if(selectTheme.value == "dark"){
            gametheme = 2;
        }else if(selectTheme.value == "lava"){
            gametheme = 3;
        }else if(selectTheme.value == "ice"){
            gametheme = 4;
        }
        let gameusershare = null;
        if(isPrivate){
            if(nameInp.checkValidity() && shareInp.checkValidity()){
                gameusershare = shareInp.value;
                let data = await startGameRequest(nameInp.value, copyData.id, copyData.name, gamestate, selectType.value, gametheme, gameusers, selectRounds.value, gameusershare);
                
                clearDiv(cont);
                let playView = createGamePlayView(data.gameid);
                cont.appendChild(playView);
            }else{
                txtOut.innerHTML = "Try again";
            }
        }else{
            if(nameInp.checkValidity()){
                let data = await startGameRequest(nameInp.value, copyData.id, copyData.name, gamestate, selectType.value, gametheme, gameusers, selectRounds.value, gameusershare);
                clearDiv(cont);
                let playView = createGamePlayView(data.gameid);
                cont.appendChild(playView);
            }else{
                txtOut.innerHTML = "Try again";
            }
        }   
    }
    return view;

}

function createGamePlayView(gameid){
    let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#gameTemplate");
    let view = document.importNode(template.content, true);
    let textInp = view.querySelector("#textInp");
    let send = view.querySelector("#send");
    let shareURL = view.querySelector("#shareURL");
    shareURL.innerText = `santorinigame.com/${gameid}`;
    increaseGameUsers(gameid, copyData);
    async function increaseGameUsers(gameid, copyData){
        let data = await getGameByGameID(gameid);
        let gameusers = data.result.game_users;
        if(gameusers.indexOf(copyData.name)==-1){
            gameusers.push(copyData.name);
            await updateGameUsersRequest(data.result.game_id, gameusers, copyData.name);
        }  
    }
    runGame(gameid);
    async function decreaseGameUsers(gameid, copyData){
        let data = await getGameByGameID(gameid);
        let gameusers = data.result.game_users.filter(name => name != copyData.name);
        await updateGameUsersRequest(data.result.game_id, gameusers, copyData.name);
    }
    let interval = setInterval(function (){
        displayChat(gameid, copyData);
    }, 2000);
    async function displayChat(gameid, copyData){
        let chatData = await getChat(gameid);
        let ul = document.querySelector("#chatList");
        clearDiv(chatList);
        for(let elem of chatData.msgs){
            let li = document.createElement("li");
            elem = elem.replace(copyData.name, "You");
            li.appendChild(document.createTextNode(`${elem}`));
            ul.appendChild(li);
        }
    }
    textInp.addEventListener("keydown",function(event){
        if(event.code == "Enter"){
            let copyData = loadSessionArray("key")[0];
            sendMsg(gameid, copyData.name);
        }
    });
    send.addEventListener("click", function(evt){
        let copyData = loadSessionArray("key")[0];
        sendMsg(gameid, copyData.name);
    });
    
    clearDiv(btnCont);
    let backBtn = createElement(`<button id="backBtn">Back</button>`);
    btnCont.appendChild(backBtn);
    backBtn.addEventListener("click", function(evt){
        decreaseGameUsers(gameid, copyData);
        clearInterval(interval);
        displayUserView();
    });
    return view;
}
function sendMsg(gameid, name){
    let textInp = document.querySelector("#textInp");
    if(textInp.checkValidity()){
        let timeNow = new Date();
        let msg = `${name} at ${timeNow.toLocaleTimeString()}: ${textInp.value}`;
        postChat(gameid, msg)
        textInp.value ="";
    }
}