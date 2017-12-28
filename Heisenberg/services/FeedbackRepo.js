const db = require('../models/db');
const feedback = require('../models/feedback');
/**
 * @author yxw
 * @desc  
 */
class FeedbackRepo{
    constructor(props){
        
    }

    async add(model){
        var dao = feedback(db.sequelize,db.Sequelize.DataTypes);
        return await dao.create(model);
        
    }

    async getAll(){
        var dao = feedback(db.sequelize,db.Sequelize.DataTypes);
        var result = await dao.findAll({
            order: [ [ 'createdAt', 'DESC' ]]
        });
        return result;
    }

    async update(){

    }
}

module.exports = FeedbackRepo;