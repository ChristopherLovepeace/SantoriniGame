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