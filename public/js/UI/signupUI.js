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