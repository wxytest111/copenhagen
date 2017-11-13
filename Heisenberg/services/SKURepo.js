const db = require('../models/db');
const SKU = require('../models/SKU');
const compress = require('koa-compress');
/**
 * @author Gary
 * @desc  
 */
class SKURepo{
    constructor(props){
        
    }
    async getAll(){
        var v = SKU(db.sequelize,db.Sequelize.DataTypes);
        return await v.findAll();
    }
    async getNew(){
        var v = SKU(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0) return result[0];
        return [];
    }   

    async getByCode(code){
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        var result = await sku.findAll({
            where: {
                code:code
              }
        });
        return await result[0]
    }
    async add(model){
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        return await sku.create(model);
        
    }
    async remove(id){
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        var result = await sku.findById(id);
        return await result.destroy()
    }
    async update(){

    }
}

module.exports = SKURepo;