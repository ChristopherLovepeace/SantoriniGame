//database
const pg = require("pg");

const db = function(dbConnectionString){

    const connectionString = dbConnectionString;

    async function runQuery(query, params){
        const client = new pg.Client(connectionString);
        try{
            await client.connect();
            const res = await client.query(query, params);
            let response = res.rows[0];
            await client.end();//Must end the connection to the server
            return response;
        }catch(err){
            console.log("And error occured: ", err);
        }
    }
    const getUserByID = async function(userID){
        let userData = null;
        try{
            userData = await runQuery('SELECT * from users where userID=$1',[userID]);

        }catch(err){
            console.log(err);
        }
        return userData;//this gives the return a breakpoint
    }
    const createUser = async function(id, email, name, pass){
        try{
            let sql = 'INSERT INTO users (id, user_id, user_email, user_name, user_pswhash) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *';
            let values = [id, email, name, pass];
            userData = await runQuery(sql,values);

        }catch(err){
            console.log(err);
        }
        return userData;
    }

    const deleteUser = async function(userID){
        
        try{

        }catch(err){

        }

    }

    return {
        createUser : createUser
    }
}

module.exports = db;
