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
            await client.end();
            return response;
            
        }catch(err){
            console.log("An error occured in query: ", err);
        }
        
    }
    async function runQueryMultiple(query, params){
        const client = new pg.Client(connectionString);
        try{
            await client.connect();
            const res = await client.query(query, params);
            let response = res.rows;
            await client.end();
            return response;
            
        }catch(err){
            console.log("An error occured in query: ", err);
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
    //-------------------------------------------------------------------
    const getGameByUserID = async function(game_user_id){
        let gameData = null;
        try{
            let sql = 'SELECT * FROM test WHERE game_user_id = $1';
            let values = [game_user_id];
            gameData = await runQueryMultiple(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const getGameByUserShare = async function(game_user_share){
        let gameData = null;
        try{
            let sql = 'SELECT * FROM test WHERE game_user_share = $1';
            let values = [game_user_share];
            gameData = await runQueryMultiple(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const getGameByGameID = async function(game_id){
        let gameData = null;
        try{
            let sql = 'SELECT * FROM test WHERE game_id = $1';
            let values = [game_id];
            gameData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const getGameByType = async function(game_type){
        let gameData = null;
        try{
            let sql = 'SELECT * FROM test WHERE game_type = $1';
            let values = [game_type];
            gameData = await runQueryMultiple(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const createGame = async function(game_name, game_user_id, game_user_name, game_id, game_state, game_type, game_theme, game_users, game_rounds, game_user_share){
        let gameData = null;
        try{
            let sql = 'INSERT INTO test (id, game_name, game_user_id, game_user_name, game_id, game_state, game_type, game_theme, game_users, game_rounds, game_user_share) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
            let values = [game_name, game_user_id, game_user_name, game_id, game_state, game_type, game_theme, game_users, game_rounds, game_user_share];
            gameData = await runQuery(sql,values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const deleteGame = async function(game_id){
        let gameData = null;
        try{
            let sql = 'DELETE FROM test WHERE game_id = $1 RETURNING *';
            let values = [game_id];
            gameData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const updateGameState = async function(game_id, game_state){
        let gameData = null;
        try{
            let sql = 'UPDATE test SET game_state = $2 WHERE game_id = $1 RETURNING *';
            let values = [game_id, game_state];
            gameData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const updateGameType = async function(game_id, game_type){
        let gameData = null;
        try{
            let sql = 'UPDATE test SET game_type = $2 WHERE game_id = $1 RETURNING *';
            let values = [game_id, game_type];
            gameData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }
    const updateGameUsers = async function(game_id, game_users){
        let gameData = null;
        try{
            let sql = 'UPDATE test SET game_users = $2 WHERE game_id = $1 RETURNING *';
            let values = [game_id, game_users];
            gameData = await runQuery(sql, values);
        }catch(err){
            console.log(err);
        }
        return gameData;
    }


    return {
        createUser : createUser,
        deleteUser : deleteUser,
        getUserByID : getUserByID,
        getUserByName : getUserByName,
        updateUser : updateUser,
        updateUserPass : updateUserPass,
        //-------------------------------
        getGameByUserID : getGameByUserID,
        getGameByUserShare : getGameByUserShare,
        getGameByGameID : getGameByGameID,
        getGameByType : getGameByType,
        createGame : createGame,
        deleteGame : deleteGame,
        updateGameState : updateGameState,
        updateGameType : updateGameType,
        updateGameUsers : updateGameUsers
    }
}

module.exports = db;
