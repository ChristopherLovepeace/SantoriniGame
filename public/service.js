function Service() {

    // ----------------------------------------------
    this.getData = async function(url) {
        try {
            let cfg = {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
            //try to load from server
            let response = await fetch(url, cfg);
            //let data = await response.json();
            //localStorage.setItem("pagedata", JSON.stringify(data));
            resolve(response);
        }           
        catch(err) {              
            console.log("Error in model: ", err);  
            //try to load from local storage
            let pageArr = localStorage.getItem("pagedata");                

            if (pageArr) {
                resolve(JSON.parse(pageArr));
            }
            else {
                reject(err);
            }                
        }        
    }
    this.deleteData = async function(updata, url) {
        let body = null;
        if(updata != null){
            body = JSON.stringify(updata);
        }
        try {
            let cfg = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: body
            }
            //try to load from server
            let response = await fetch(url, cfg);

            resolve(response);
        }           
        catch(err) {              
            console.log("Error in model: ", err);  
            reject(err);     
        }        
    }
    this.postData = async function(updata, url) {

        let body = null;
        if(updata != null){
            body = JSON.stringify(updata);
        }
        try {
            let cfg = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            }
            //try to load from server
            let response = await fetch(url, cfg);

            resolve(response);
        }           
        catch(err) {              
            console.log("Error in model: ", err);  
            reject(err);     
        }        
    }
    this.putData = async function(updata, url) {
        let body = null;
        if(updata != null){
            body = JSON.stringify(updata);
        }
        try {
            let cfg = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: body
            }
            //try to load from server
            let response = await fetch(url, cfg);

            resolve(response);
        }           
        catch(err) {              
            console.log("Error in model: ", err);  
            reject(err);     
        }    
    }
}