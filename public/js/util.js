function createElement(html){
    let elem = document.createElement("div");
    elem.innerHTML = html;
    //button.classList.add("");
    return elem;
}

function refreshSessionArr(name){
    sessionArray = loadSessionArray(name);
}

function clearDiv(name){
    while(name.firstChild){
        name.removeChild(name.firstChild);
    }
}

function isEmptySession(name){
    if(loadSessionArray(name)==null || loadSessionArray(name).length==0){
        return true;
    }else{
        return false;
    }
}

function saveSessionArray(name, sessionArray){
    sessionStorage.setItem(name, JSON.stringify(sessionArray));
}

function loadSessionArray(name){
    return JSON.parse(sessionStorage.getItem(name));
}

function writeHtml(id, text){
    id.innerHTML = text;
}

function showPass(elem){
    if(elem.type == "password"){
        elem.type = "text";
    }else {
        elem.type = "password";
    }
};

let sessionArray = [];
if(!isEmptySession("key")){
    sessionArray = loadSessionArray("key");
}
