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
async function login(evt){
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
    //let gameJoin = view.querySelector("#gameJoin");
    //let gameOngoing = view.querySelector("#gameOngoing");
    let welcome = view.querySelector("#welcome");
    welcome.innerText = `Welcome ${copyData.name}`;

    userUpdate.onclick = displaySettings;
    logout.onclick = logOut;
    gameStart.onclick = startGame;
    //gameJoin.onclick = joinGame;
    //gameOngoing.onclick = resumeGame;

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
    //TODO
    console.log("Game here");

}
//-------------------------------------------------------------------------------
//Settings view
//-------------------------------------------------------------------------------
function createSettingsView() {
    let copyData = loadSessionArray("key")[0];
    //getUserRequest(copyData.id);
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
//Chat view
//-------------------------------------------------------------------------------
/*
function createChatView() {

    let container = document.createElement("div");

    container.showData = function(data) {

        container.innerHTML = "";
        container.innerHTML = `
            <hr>
            <h2>Global Text-chat</h2>
            <hr>
        `;

        let main = document.createElement("div");
        let inner = document.createElement("div");
        let chat = document.createElement("div");
        chat.id = "chat";
        chat.innerHTML = `
            <p>loading...</p>
        `;
        let msg = document.createElement("div");
        msg.innerHTML = `
            <hr>
            <p>Type your message here: </p>
            <input type="text" id="inpText" required minlength="1" maxlength="100" size="100">
            <button id="send">Send</button>
            <br>
        `;
        inner.appendChild(chat);
        inner.appendChild(msg);
        main.appendChild(inner);
        //container.classList.add("");
        container.appendChild(main);
        
        let inpText = document.getElementById("inpText");
        let send = document.getElementById("send");
    }
    return container;
}
*/