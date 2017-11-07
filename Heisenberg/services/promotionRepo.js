const db = require('../models/db');
const promotion = require('../models/promotion');
var compress = require('koa-compress');

/**
 * @author Lucas
 * @desc promotion class, 
 */
class promotionRepo{
    constructor(props){
        
    }
    async getAll(){
        var v = promotion(db.sequelize,db.Sequelize.DataTypes);
        return await v.findAll();
    }
    async getNew(){
        var v = promotion(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0) return result[0];
        return [];
    }   
    add(){

    }
    remove(){

    }
    update(){

    }
}

module.exports = VersionRepo;