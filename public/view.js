//-------------------------------------------------------------------------------
//Log in page
//-------------------------------------------------------------------------------
function tryLogin(){
    if(isEmptySession("key")){
        clearDiv(btnCont);
        clearDiv(cont);
        let loginView = createLoginView();
        cont.appendChild(loginView);
    }else{
        let copyData = loadSessionArray("key")[0];
        if(getUserRequest(copyData.id)){
            displayUserView();
        }else{
            clearDiv(btnCont);
            clearDiv(cont);
            let loginView = createLoginView();
            cont.appendChild(loginView);        
        }
    }

}
function createLoginView() {
    let template = document.querySelector("#loginTemplate");
    let view = document.importNode(template.content,true);
    let loginBtn = view.querySelector("#loginBtn");
    let signupBtn = view.querySelector("#signupBtn");
    let check = view.querySelector("#check");

    check.onclick = show;
    loginBtn.onclick = login;
    signupBtn.onclick = displaySignup;
    return view;
}
function show(evt){
    showPass(passInp);
}
function login(evt){
    let passInp = document.querySelector("#passInp");
    let nameInp = document.querySelector("#nameInp");
    passInp.type = "password";
    check.checked = false;
    // Validation and error msg
    if(nameInp.checkValidity() && passInp.checkValidity()){
        writeHtml(nameInpHelp, "");
        writeHtml(passInpHelp, "");
        loginRequest(nameInp.value,passInp.value);
    }else{
        writeHtml(nameInpHelp, "");
        writeHtml(passInpHelp, "");
        if(!nameInp.checkValidity()){
            nameInpHelp.innerHTML = "Enter a valid name";
        }else{
            passInpHelp.innerHTML = "Enter a valid password";
        }
    }

}

function displaySignup(evt){
    clearDiv(cont);
    let signupView = createSignupView();
    cont.appendChild(signupView);
}
//-------------------------------------------------------------------------------
//Sign up page
//-------------------------------------------------------------------------------
function createSignupView() {

    let template = document.querySelector("#signupTemplate");
    let view = document.importNode(template.content, true);
    let loginBtn = view.querySelector("#loginBtn");
    let signupBtn = view.querySelector("#signupBtn");
    let check = view.querySelector("#check");
    check.onclick = show;
    loginBtn.onclick = displayLogin;
    signupBtn.onclick = signup;
    return view;
}
function signup(evt){
    let passInp = document.querySelector("#passInp");
    let nameInp = document.querySelector("#nameInp");
    let emailInp = document.querySelector("#emailInp");
    passInp.type = "password";
    check.checked = false;
    // Validation and error msg
    if(nameInp.checkValidity() && passInp.checkValidity() && emailInp.checkValidity()){
        writeHtml(nameInpHelp, "");
        writeHtml(passInpHelp, "");
        writeHtml(emailInpHelp, "")
        signupRequest(nameInp.value, emailInp.value, passInp.value);
    }else{
        writeHtml(nameInpHelp, "");
        writeHtml(passInpHelp, "");
        writeHtml(emailInpHelp, "")
        if(!nameInp.checkValidity()){
            writeHtml(nameInpHelp, "Enter a valid username");
        }else if(!passInp.checkValidity()){
            writeHtml(passInpHelp, "Enter a valid password");
        }else{
            writeHtml(emailInpHelp, "Enter a valid email");
        }
    }
}
function displayLogin(evt){
    clearDiv(cont);
    let loginView = createLoginView();
    cont.appendChild(loginView);
}
function displayUserView(){
    clearDiv(cont);
    let userView = createUserView();
    cont.appendChild(userView);    
}
//-------------------------------------------------------------------------------
//User view
//-------------------------------------------------------------------------------
function createUserView() {
    let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#userViewTemplate");
    let view = document.importNode(template.content, true);
    let userUpdate = view.querySelector("#userUpdate");
    let logout = view.querySelector("#logout");
    let gameStart = view.querySelector("#gameStart");
    let gameJoin = view.querySelector("#gameJoin");
    let gamePrivate = view.querySelector("#gamePrivate");
    let gamePublic = view.querySelector("#gamePublic");
    let welcome = view.querySelector("#welcome");
    welcome.innerText = `Welcome ${copyData.name}`;

    userUpdate.onclick = displaySettings;
    logout.onclick = logOut;
    gameStart.onclick = startGame;
    gameJoin.onclick = joinGameURL;
    gamePrivate.onclick = displayPrivate;
    gamePublic.onclick = displayPublic;

    return view;
}
function logOut(evt){
    sessionStorage.clear();
    txtOut.innerHTML = "Logged out";
    tryLogin();
}
function displaySettings(evt){
    clearDiv(cont);
    let settingsView = createSettingsView();
    cont.appendChild(settingsView);
}
function startGame(evt){
    clearDiv(cont);
    let startView = createGameStartView();
    cont.appendChild(startView);
}

function joinGameURL(evt){
    //TODO
    console.log("Joining game");
}

function displayPublic(evt){
    clearDiv(cont);
    let publicView = createPublicView();
    cont.appendChild(publicView);
}
function displayPrivate(evt){
    clearDiv(cont);
    let privateView = createPrivateView();
    cont.appendChild(privateView);
}
//-------------------------------------------------------------------------------
//Settings view
//-------------------------------------------------------------------------------
function createSettingsView() {
    let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#userSettingsTemplate");
    let view = document.importNode(template.content, true);
    let name = view.querySelector("#name");
    let email = view.querySelector("#email");
    let userDel = view.querySelector("#userDel");
    let nameInp = view.querySelector("#nameInp");
    let nameInpBtn = view.querySelector("#nameInpBtn");
    let emailInp = view.querySelector("#emailInp");
    let emailInpBtn = view.querySelector("#emailInpBtn");
    let passInp = view.querySelector("#passInp");
    let passInpBtn = view.querySelector("#passInpBtn");
    let check = view.querySelector("#check");

    nameInp.placeholder = `${copyData.name}`;
    emailInp.placeholder = `${copyData.email}`;
    name.innerText = `${copyData.name}`;
    email.innerText = `${copyData.email}`;
    userDel.onclick = deleteUser;
    nameInpBtn.onclick = updateName;
    emailInpBtn.onclick = updateEmail;
    passInpBtn.onclick = updatePass;
    check.onclick = show;

    clearDiv(btnCont);
    let backBtn = createElement(`<button id="backBtn">Back</button>`);
    btnCont.appendChild(backBtn);
    backBtn.addEventListener("click", function(evt){
        displayUserView();
    });

    return view;
}
function deleteUser(evt){
    let copyData = loadSessionArray("key")[0];
    if(window.confirm("Are you sure you want to delete your account?")){
        deleteRequest(copyData.id);
    }
}
function updateName(evt){
    let copyData = loadSessionArray("key")[0];
    if(nameInp.checkValidity()){
        updateRequest(copyData.id, nameInp.value, copyData.email);
    }
}
function updateEmail(evt){
    let copyData = loadSessionArray("key")[0];
    if(emailInp.checkValidity()){
        updateRequest(copyData.id, copyData.name, emailInp.value);
    }
}
function updatePass(evt){
    passInp.type = "password";
    check.checked = false;
    let copyData = loadSessionArray("key")[0];
    if(passInp.checkValidity()){
        updateRequestPass(copyData.id, passInp.value);
    }
}
//-------------------------------------------------------------------------------
//Public Games view
//-------------------------------------------------------------------------------

function createPublicView() {
    //let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#publicViewTemplate");
    let view = document.importNode(template.content, true);
    let list = view.querySelector("#list");
    writeList(list);
    async function writeList(list){
        let data = await getGameByTypeRequest("public");
        for(let elem of data.result){
            let onGoing = "";
            if(elem.game_users.length > 1){
                onGoing = `
                    <p>${elem.game_users.length}/2</p>
                `;
            }else{
                onGoing = `
                <p>${elem.game_users.length}/2</p>
                <button id="button${elem.game_name}">Join</button>
            `;
            }
                let listElem = document.createElement("div");
                listElem.innerHTML = `
                <p>${elem.game_name} by ${elem.game_user_name} </p>
                <p>${elem.game_type}</p>
                ${onGoing}
                `;
                list.appendChild(listElem);
                let button = document.getElementById(`button${elem.game_name}`);
                button.addEventListener("click", function(evt){
                    joinGame(elem.game_id);
                });
        }
    }
    clearDiv(btnCont);
    let backBtn = createElement(`<button id="backBtn">Back</button>`);
    btnCont.appendChild(backBtn);
    backBtn.addEventListener("click", function(evt){
        displayUserView();
    });
    return view;
}
function joinGame(gameid){
    clearDiv(cont);
    let gameplayView = createGamePlayView(gameid);
    cont.appendChild(gameplayView);
}

//-------------------------------------------------------------------------------
//Private Games view
//-------------------------------------------------------------------------------

function createPrivateView(){
    let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#privateViewTemplate");
    let view = document.importNode(template.content, true);
    let listOwn = view.querySelector("#listOwn");
    let listShared = view.querySelector("#listShared");
    writeList(copyData);
    async function writeList(copyData){
        let dataOwn = await getGameByUserID(copyData.id);
        let dataShared = await getGameByUserShare(copyData.name);
        if(dataOwn){
            for(let elem of dataOwn.result){
                let listElem = document.createElement("div");
                let deleteBtnHtml = "";
                if(copyData.name == elem.game_user_name){
                    deleteBtnHtml = `<button id="delete${elem.game_name}">Delete</button>`;
                }
                listElem.innerHTML = `
                    <p>${elem.game_name} by ${elem.game_user_name}</p>
                    <p>${elem.game_type}, Last played: </p>
                    <button id="join${elem.game_name}">Play</button>
                    ${deleteBtnHtml}
                `;
                listOwn.appendChild(listElem);
                let deleteBtn = document.getElementById(`delete${elem.game_name}`);
                let joinBtn = document.getElementById(`join${elem.game_name}`);
                deleteBtn.addEventListener("click", function(evt){
                    if(window.confirm("Are you sure you want to delete this game? All progress will be lost!")){
                        deleteGameRequest(elem.game_id);
                        clearDiv(listOwn);
                        writeList(copyData);
                    }
                });
                joinBtn.addEventListener("click", function(evt){
                    joinGame(elem.game_id);
                });
            }
        }
        console.log(dataShared);
        if(dataShared){
            for(let elem of dataShared.result){
                console.log(elem);
                let listElem = document.createElement("div");
                let deleteBtnHtml = "";
                if(copyData.name == elem.game_user_name){
                    deleteBtnHtml = `<button id="delete${elem.game_name}">Delete</button>`;

                    let deleteBtn = document.getElementById(`delete${elem.game_name}`);
                    deleteBtn.addEventListener("click", function(evt){
                        if(window.confirm("Are you sure you want to delete this game? All progress will be lost!")){
                            deleteGameRequest(elem.game_id);
                            clearDiv(listShared);
                            clearDiv(listOwn);
                            writeList();
                        }
                    });
                }
                listElem.innerHTML = `
                    <p>${elem.game_name} by ${elem.game_user_name}</p>
                    <p>${elem.game_type}, Last played: </p>
                    <button id="button${elem.game_name}">Play</button>
                    ${deleteBtnHtml}
                `;
                listShared.appendChild(listElem);
               
                let joinBtn = document.getElementById(`button${elem.game_name}`);
                
                joinBtn.addEventListener("click", function(evt){
                    joinGame(elem.game_id);
                });
            }
        }
    }
    clearDiv(btnCont);
    let backBtn = createElement(`<button id="backBtn">Back</button>`);
    btnCont.appendChild(backBtn);
    backBtn.addEventListener("click", function(evt){
        displayUserView();
    });
    return view;

}

//-------------------------------------------------------------------------------
//Initialize Games view
//-------------------------------------------------------------------------------

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
        }
        let gameusershare = null;
        //let increaseGameUsers = false;
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


//-------------------------------------------------------------------------------
//Play Games view
//-------------------------------------------------------------------------------
function createGamePlayView(gameid){
    let copyData = loadSessionArray("key")[0];
    let template = document.querySelector("#gameTemplate");
    let view = document.importNode(template.content, true);
    let textInp = view.querySelector("#textInp");
    let send = view.querySelector("#send");
    increaseGameUsers(gameid, copyData);
    async function increaseGameUsers(gameid, copyData){
        let data = await getGameByGameID(gameid);
        let gameusers = data.result.game_users;
        if(gameusers.indexOf(copyData.name)==-1){
            gameusers.push(copyData.name);
            await updateGameUsersRequest(data.result.game_id, gameusers, copyData.name);
            //return;
        }  
    }
    runGame();
    async function decreaseGameUsers(gameid, copyData){
        let data = await getGameByGameID(gameid);
        let gameusers = data.result.game_users.filter(name => name != copyData.name);
        console.log(gameusers);
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