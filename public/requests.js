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
            //Save Session Info
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
            //Save Session Info
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
            //Save Session Info
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
            //Save Session Info
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
            displayLogin();
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
            //Save Session Info
            sessionArray = [{"msg": data.msg,"id": data.id, "email": data.email, "name": data.name, "pass": data.pass}];
            saveSessionArray("key", sessionArray);
        }
    }catch(err){
        console.log("Error in requests", err);
        txtOut.innerHTML = "Sorry, no valid data";
    }
}

