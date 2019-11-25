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
    let urlInp = document.querySelector("#urlInp");
    if(urlInp.checkValidity()){
        let url = urlInp.value;
        let gameid = url.slice(url.indexOf("/")+1);
        joinGame(gameid);
    }
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