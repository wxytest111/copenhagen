const db = require('../models/db');
const user = require('../models/user');
/**
 * @author yxw
 * @desc  
 */
class UserRepo{
    constructor(props){
        
    }

    async add(model){
        var dao = user(db.sequelize,db.Sequelize.DataTypes);
        return await dao.create(model);
        
    }

    async login(username){
        var dao = user(db.sequelize,db.Sequelize.DataTypes);
        var result = await dao.findOne({
            where: {
                username:username,
              }
        });
        return result;
    }

    async update(){

    }
}

module.exports = UserRepo;