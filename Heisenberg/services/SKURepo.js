const db = require('../models/db');
const SKU = require('../models/SKU');
const ruleDao = require('../models/rule');
const compress = require('koa-compress');
const SKUInfo =require('./SKUInfo');
/**
 * @author Gary
 * @desc  
 */
class SKURepo{
    constructor(props){
        
    }
    async getAll(){
        var v = SKU(db.sequelize,db.Sequelize.DataTypes);
        var r = ruleDao(db.sequelize,db.Sequelize.DataTypes);
        var list = await v.findAll({
            order: [ [ 'id', 'DESC' ]]
        });
        for (var i=0; i<list.length;i++){
            if(list[i].rule_id){
                var rule = await r.findById(list[i].rule_id);
                // var rule = r.findById(1);
                if(rule){
                    list[i].rule_id=rule;
                }
            }
        }
        return list;
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
        return result[0]
    }
    async add(model){
        model.SKU_brand_code=model.SKU_brand_code.key;
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);

        if(!model.id){
            var t = await sku.create(model);
        } else {
            var t = await sku.update(model,{  
                'where':{'id':model.id}
            });
        }
        return t;
        
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