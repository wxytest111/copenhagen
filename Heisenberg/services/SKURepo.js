const db = require('../models/db');
const SKU = require('../models/SKU');
const ruleDao = require('../models/rule');
const shopskuDao = require('../models/shopsku');
const shopDao = require('../models/shop');
const regionDao = require('../models/regionsku');
const compress = require('koa-compress');
const SKUInfo =require('./SKUInfo');
/**
 * @author Gary
 * @desc  
 */
class SKURepo{
    constructor(props){
        
    }

    async addShop(model){
        var region = regionDao(db.sequelize,db.Sequelize.DataTypes);
        var shopsku = shopskuDao(db.sequelize,db.Sequelize.DataTypes);
        
        await region.destroy({
            where: {
                SKUid:Number(model.id),
            }
        });

        await shopsku.destroy({
            where: {
                SKUid:Number(model.id),
            }
        });


        var t = 0;
        for(var i=0; i<model.params.length; i++){
            if(model.params[i].length>11){
                // var ss = await shopsku.findAll({
                //     where:{
                //         shopid:model.params[i],
                //         SKUid:Number(model.id),
                //     }
                // })
                // if(ss && ss.length>0) break;
                await shopsku.create({shopid:model.params[i],SKUid:Number(model.id)});
                t++;
            } else {
                var rs = await region.findAll({
                    where:{
                        regionid:model.params[i],
                        SKUid:Number(model.id),
                    }
                })
                if(rs && rs.length>0) break;
                t++;
                await region.create({regionid:Number(model.params[i]),SKUid:Number(model.id)});
                // var t = await sku.update(model,{  
                //     'where':{'id':model.id}
                // });
            }
        }
        return t;
        
    }

    async getAll(key){
        var v = SKU(db.sequelize,db.Sequelize.DataTypes);
        var r = ruleDao(db.sequelize,db.Sequelize.DataTypes);
        var region = regionDao(db.sequelize,db.Sequelize.DataTypes);
        var shopsku = shopskuDao(db.sequelize,db.Sequelize.DataTypes);
        var shop = shopDao(db.sequelize,db.Sequelize.DataTypes);
        shop.belongsTo(shopsku,{foreignKey:'id',targetKey:'shopid',as:'ss'});
        v.belongsTo(shopsku,{foreignKey:'id',targetKey:'SKUid',as:'sv'});
        v.belongsTo(region,{foreignKey:'id',targetKey:'SKUid',as:'rv'});
        if(key && key.length>0){
            if(key.length>11){
                var list = await v.findAll({
                    order: [ [ 'id', 'DESC' ]],
                    include:{
                        where: {
                            shopid:key,
                        },
                        model:shopsku,
                        as:'sv'
                    }
                });
            } else {
                var list = await v.findAll({
                    order: [ [ 'id', 'DESC' ]],
                    include:{
                        where: {
                            regionid:Number(key),
                        },
                        model:region,
                        as:'rv'
                    }
                });
            }

        } else {
            var list = await v.findAll({
                order: [ [ 'id', 'DESC' ]]
            });
        }
        for (var i=0; i<list.length;i++){
            if(list[i].rule_id){
                var rule = await r.findById(list[i].rule_id);
                // var rule = r.findById(1);
                if(rule){
                    list[i].rule_id=rule;
                }
            }
            var shopInfo = await shop.findAll({
                // where:{
                //     SKUid:list[i].id,
                // },
                include:{
                    where: {
                        SKUid:list[i].id,
                    },
                    model:shopsku,
                    as:'ss'
                }
            });
            if(shopInfo.length>0){
                list[i].dataValues.shop =shopInfo;
            }

            // var regInfo = await region.findAll({
            //     where:{
            //         SKUid:list[i].id,
            //     },
            // });
            // if(regInfo.length>0){
            //     list[i].dataValues.region =regInfo;
            // }
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


    async getByIdentity(identity){
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        var result = await sku.findOne({
            where: {
                identity:identity
              }
        });
        return result
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
        var r = ruleDao(db.sequelize,db.Sequelize.DataTypes);
        var region = regionDao(db.sequelize,db.Sequelize.DataTypes);
        var shopsku = shopskuDao(db.sequelize,db.Sequelize.DataTypes);
        var sku = SKU(db.sequelize,db.Sequelize.DataTypes);
        var result = await sku.findById(id);
        r.destroy({
            where:{
                id:result.rule_id
            }
        });
        region.destroy({
            where:{
                SKUid:result.id
            }
        })
        shopsku.destroy({
            where:{
                SKUid:result.id
            }
        })


        return await result.destroy()
    }
    async update(){

    }
}

module.exports = SKURepo;