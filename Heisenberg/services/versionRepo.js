const db = require('../models/db');
const version = require('../models/version');
var compress = require('koa-compress');

/**
 * @author Lucas
 * @desc APP version class, 
 */
class VersionRepo{
    constructor(props){
        
    }
    async getAll(){
        var v = version(db.sequelize,db.Sequelize.DataTypes);
        return await v.findAll();
    }
    async getNew(){
        var v = version(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0) return result[0];
        return [];
    }   
    async add(model){
        var v = version(db.sequelize,db.Sequelize.DataTypes);
        return await v.create(model);
    }
    remove(){

    }
    update(){

    }
}

module.exports = VersionRepo;