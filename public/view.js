const service = new Service();

//-------------------------------------------------------------------------------
//Log in page
//-------------------------------------------------------------------------------
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
        let updata = {
            name : nameInp.value,
            pass : passInp.value
        }
        //login(nameInp.value,passInp.value);
        
        try{
            let response = await service.postData(updata, `users/auth/${nameInp.value}`);
            let data = await response.json();
            if(response.status>202){
                txtOut.innerHTML = data.msg;
            }else{
                txtOut.innerHTML = data.msg;
                console.log("Welcome ", data.name);
                //Save Session Info
                sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
                saveSessionArray("key", sessionArray);
                displayUserView();
            }
        }catch(err){
            console.log("Error in index", err);
            txtOut.innerHTML = "Sorry, no valid data";
        }
        
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
        let updata = {
            name : nameInp.value,
            email: emailInp.value,
            pass : passInp.value
        }
        console.log("Data Sent to server");
        /*
        try{
            let response = await service.postData(updata, `users/`);
            let data = await response.json();
            if(response.status>202){
                txtOut.innerHTML = data.msg;
            }else{
                txtOut.innerHTML = data.msg;
                console.log("Welcome ", data.name);
                //Save Session Info
                sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
                saveSessionArray("key", sessionArray);
                displayUserView();
            }
        }catch(err){
            console.log("Error in index", err);
            txtOut.innerHTML = "Sorry, no valid data";
        }
        */
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

    let template = document.querySelector("#userViewTemplate");
    let view = document.importNode(template.content, true);
    let userUpdate = view.querySelector("#userUpdate");
    let logOut = view.querySelector("#logOut");
    let gameStart = view.querySelector("#gameStart");
    let gameJoin = view.querySelector("#gameJoin");
    let gameOngoing = view.querySelector("#gameOngoing");
    
    
    userUpdate.onclick = displaySettings;
    logOut.onclick = logOut;
    gameStart.onclick = startGame;
    //gameJoin.onclick = joinGame;
    //gameOngoing.onclick = resumeGame;

    return view;
}
function displaySettings(evt){

}
function logOut(evt){

}
function startGame(evt){

}

//-------------------------------------------------------------------------------
function createSettingsView() {

    let container = document.createElement("div");

    container.showData = function(data) {

        container.innerHTML = "";
        container.innerHTML = `
            <hr>
            <h2>Settings</h2>
            <hr>
        `;

        let main1 = document.createElement("div");
        let main2 = document.createElement("div");
        let html1 = `
            <h2>Current Credentials:</h2>
            <hr>
            <p>Username: </p>
            <p>${data.name}</p>
            <br>
            <p>Email: </p>
            <p>${data.email}</p>
            <br>
            <label for="userDel"><b>Delete your account: </b></label><br>
            <button id="userDel">Delete</button>
            <br>
        `;
        let html2 = `
            <h2>Update Credentials:</h2>
            <hr>
            <p>Username: </p>
            <input type="text" placeholder=${data.name} id="nameInp" required minlength="3" maxlength="10" size="20">
            <button id="nameInpBtn">Update</button>
            <br>
            <p>Email: </p>
            <input type="email" placeholder=${data.email} id="emailInp" required minlength="3" size="20">
            <button id="emailInpBtn">Update</button>
            <br>
            <p>Current password:</p>
            <input type="password" placeholder="Enter Password" id="passInpOld" required minlength="8" maxlength="20" size="20"> 
            <input type="checkbox" id="check">
            <p>New password:</p>            
            <input type="password" placeholder="Enter Password" id="passInpNew" required minlength="8" maxlength="20" size="20"> 
            <input type="checkbox" id="check">
            <button id="passInpBtn">Update</button>
            <br>
        
        `;
        main1.innerHTML = html1;
        main2.innerHTML = html2;
        //container.classList.add("");
        container.appendChild(main1);
        container.appendChild(main2);

        let userDel = document.getElementById("userDel");
        let nameInp = document.getElementById("nameInp");
        let nameInpBtn = document.getElementById("nameInpBtn");
        let emailInp = document.getElementById("emailInp");
        let emailInpBtn = document.getElementById("emailInpBtn");
        let passInpOld = document.getElementById("passInpOld");
        let passInpNew = document.getElementById("passInpNew");
        let passInpBtn = document.getElementById("passInpBtn");

    }
    return container;
}
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
