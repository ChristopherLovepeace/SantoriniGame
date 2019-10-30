//for database
const pg = require("pg");

//Classes in JS
const db = function(dbConnectionString){

    const connectionString = dbConnectionString;//give me client with that connection string postgres!

    async function runQuery(query, params){//general purpose function
        //connect to db
        //return info
        const client = new pg.Client(connectionString);
        try{
            await client.connect();//BUT Did I connect?
            const res = await client.query(query, params);//you shold run queries like this
            if(res){
                let response = res.rows[0];//to be fixed
                //console.log(rs.rows[0].message);

            }else{
                let response = null;
            }
            await client.end();//Must end the connection to the server
            return response;
        }catch(err){
            console.log("And error occured: ", err);
        }
        
    }
    const getUserByID = async function(userID){
        let userData = null;
        try{
            userData = await runQuery('SELECT * from UserTbl where userID=$1',[userID]);

        }catch(err){
            console.log(err);
        }
        return userData;//this gives the return a breakpoint
    }
    const getUserTaskforUser = async function(userID){
        return await runQuery('SELECT * from UserTasks where userID=$1',[userID]);
    }
    return{
        getuser : getUserByID
    }

}

module.exports = db;
//eyecandy
class Db{
}//there should exist only one instance of the db
