const service = new Service();
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
            return response;
        }           
        catch(err) {              
            console.log("Error in service: ", err);           
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
            return response;
        }           
        catch(err) {              
            console.log("Error in service: ", err);  
            return null;
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
            return response;
        }           
        catch(err) {              
            console.log("Error in service: ", err);  
            return null;    
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
            return response;
        }           
        catch(err) {              
            console.log("Error in service: ", err);  
            return null;
        }    
    }
}