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