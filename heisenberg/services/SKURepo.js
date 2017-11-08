const db = require('../models/db');
const skuRepo = require('../models/SKU');
var compress = require('koa-compress');

/**
 * @author Gary
 * @desc  
 */
class SKURepo{
    constructor(props){
        
    }
    async getAll(){
        var v = skuRepo(db.sequelize,db.Sequelize.DataTypes);
        return await v.findAll();
    }
    async getNew(){
        var v = skuRepo(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0) return result[0];
        return [];
    }   
    async add(skuObject){
        var v = skuRepo(db.sequelize,db.Sequelize.DataTypes);
        return await v.create({name:skuObject.name, pic:skuObject.pic, desc: skuObject.desc});
        
    }
    remove(){

    }
    update(){

    }
}

module.exports = SKURepo;