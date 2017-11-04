const  MYSQL = require('mysql2/promise');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

class DB{
    constructor(props){
         
    }
    async init(){
        let connection;
        if(config.use_env_variable)
            connection= await MYSQL.createConnection(process.env[config.use_env_variable]);
        else connection = await MYSQL.createConnection(config);
        return connection;
    }
    
}

module.exports = DB;