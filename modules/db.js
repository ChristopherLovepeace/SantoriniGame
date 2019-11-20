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
            console.log("An error occured: ", err);
        }
        
    }
    const getUserByID = async function(user_id){
        let userData = null;
        try{
            let sql = 'SELECT * FROM users WHERE user_id = $1';
            let values = [user_id];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const getUserByName = async function(user_name){
        let userData = null;
        try{
            let sql = 'SELECT * FROM users WHERE user_name = $1';
            let values = [user_name];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const createUser = async function(user_id, user_email, user_name, user_pswhash){
        let userData = null;
        try{
            let sql = 'INSERT INTO users (id, user_id, user_email, user_name, user_pswhash) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *';
            let values = [user_id, user_email, user_name, user_pswhash];
            userData = await runQuery(sql,values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const deleteUser = async function(user_id){
        let userData = null;
        try{
            let sql = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
            let values = [user_id];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const updateUser = async function(user_id, user_email, user_name){
        let userData = null;
        try{
            let sql = 'UPDATE users SET user_email = $2, user_name = $3 WHERE user_id = $1 RETURNING *';
            let values = [user_id, user_email, user_name];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const updateUserPass = async function(user_id, user_pswhash){
        let userData = null;
        try{
            let sql = 'UPDATE users SET user_pswhash = $2 WHERE user_id = $1 RETURNING *';
            let values = [user_id, user_pswhash];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }

    return {
        createUser : createUser,
        deleteUser : deleteUser,
        getUserByID : getUserByID,
        getUserByName : getUserByName,
        updateUser : updateUser,
        updateUserPass : updateUserPass
    }


    const getGameByID = async function(game_id){
        let userData = null;
        try{
            let sql = 'SELECT * FROM games WHERE game_id = $1';
            let values = [game_id];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const getGameByName = async function(game_name){
        let userData = null;
        try{
            let sql = 'SELECT * FROM games WHERE game_name = $1';
            let values = [game_name];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const createGame = async function(game_name, game_user_id, game_user_name, game_theme,game_id,game_state){
        let userData = null;
        try{
            let sql = 'INSERT INTO games (game_name, game_user_id, game_user_name, game_theme,game_id,game_state) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *';
            let values = [game_name, game_user_id, game_user_name, game_theme,game_id,game_state];
            userData = await runQuery(sql,values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }
    const deleteGame = async function(game_id){
        let userData = null;
        try{
            let sql = 'DELETE FROM games WHERE game_id = $1 RETURNING *';
            let values = [game_id];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }////////////////////////////////////////////////////////////////////////////////
    const updateGame = async function(game_name, game_user_id, game_user_name, game_theme, game_id, game_state){
        let userData = null;
        try{
            let sql = 'UPDATE games SET game_name = $1, game_user_id = $2, game_user_name = $3, game_theme = $4, game_state = $6 WHERE game_id = $5 RETURNING *';
            let values = [game_name, game_user_id, game_user_name, game_theme, game_id, game_state];
            userData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return userData;
    }

    return {
        createGame : createGame,
        deleteGame: deleteGame,
        getGameByID : getGameByID,
        getGameByName : getGameByName,
        updateGame : updateGame
    }

}

module.exports = db;
