const db = require('../models/db');
const promotion = require('../models/promotion');
const promotionsku= require('../models/promotionSKU');
var compress = require('koa-compress');
const proinfo=require('./promoteinfo');
const SKUDao = require('../models/SKU');
/**
 * @author Gary
 * @desc promotion class, 
 */
class PromotionRepo{
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
        if(result.length >0){
            proinfo.id=result[0].id;
            proinfo.name=result[0].name;
            proinfo.desc=result[0].desc;
            var SKUlist = new Array();
            SKUlist[0]='ddddd';
            proinfo.SKUlist=SKUlist;
            return proinfo;
        }
        return [];
    }   
    async getPromotion(){
        var v = promotion(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0){
            proinfo.id=result[0].id;
            proinfo.name=result[0].name;
            proinfo.desc=result[0].desc;
            var s = promotionsku(db.sequelize,db.Sequelize.DataTypes);
            var promolist = await s.findAll({
                limit: 3,
                where: {
                    promotionid: result[0].id
                },
                order: [ [ 'priority' ]]
            });
            
            var SKUlist = new Array();
            var skuDao = SKUDao(db.sequelize,db.Sequelize.DataTypes);
            for (var i=0; i<promolist.length;i++)
            {     
                var skuObject = await skuDao.findAll({
                    limit:1,
                    where:{
                        id: promolist[i].SKUid
                    }
                });      
                var ss=  require('./SKUInfo');
                ss.name = skuObject[0].name; 
                ss.id = skuObject[0].id;
                ss.desc = skuObject[0].desc;
                ss.pic = skuObject[0].pic;
                SKUlist[i]=ss;
            }
            proinfo.SKUlist=SKUlist;
            return proinfo;
        }
        return [];
    } 
    add(){

    }
    remove(){

    }
    update(){

    }
}

module.exports = PromotionRepo;