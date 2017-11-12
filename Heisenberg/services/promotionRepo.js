const db = require('../models/db');
const promotion = require('../models/promotion');
const promotionsku= require('../models/promotionSKU');
var compress = require('koa-compress');
const PromotionInfo=require('./promoteinfo');
const SKUDao = require('../models/SKU');
const PersonInfo = require('./personInfo');
const SKUInfo =require('./SKUInfo');
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
    async remove(id){
        var p = promotion(db.sequelize,db.Sequelize.DataTypes);
        var result = await p.findById(id);
        return await result.destroy()
    }

    async add(model){
        console.log(model)
        var p = promotion(db.sequelize,db.Sequelize.DataTypes);
        console.log(model)
        return await p.create(model);
    }
    async ps(model){
        var ps = promotionsku(db.sequelize,db.Sequelize.DataTypes);
        console.log(model)
        return await ps.create(model);
    }
    
     
    // async getPromotion(){
    //     var v = promotion(db.sequelize,db.Sequelize.DataTypes);
    //     var result = await v.findAll({
    //         limit: 1,
    //         order: [ [ 'id', 'DESC' ]]
    //     });
    //     if(result.length >0){
    //         var proinfo = new PromotionInfo();
    //         proinfo.id=result[0].id;
    //         proinfo.name=result[0].name;
    //         proinfo.desc=result[0].desc;
    //         var s = promotionsku(db.sequelize,db.Sequelize.DataTypes);
    //         var promolist = await s.findAll({
    //             limit: 3,
    //             where: {
    //                 promotionid: result[0].id
    //             },
    //             order: [ [ 'priority' ]]
    //         });
            
    //         var SKUlist = new Array();
    //         var skuDao = SKUDao(db.sequelize,db.Sequelize.DataTypes);
    //         for (var i=0; i<promolist.length;i++)
    //         {     
    //             console.log(promolist[i].SKUid);
    //             var skuObject = await skuDao.findAll({
    //                 limit:1,
    //                 where:{
    //                     id: promolist[i].SKUid
    //                 }
    //             });      
    //             var ss=  new SKUInfo();
    //             ss.Name = skuObject[0].name; 
    //             ss.Id = skuObject[0].id;
    //             ss.Desc = skuObject[0].desc;
    //             ss.Pic = skuObject[0].pic;
    //             ss.Price = skuObject[0].price;
    //             console.log(ss)
    //             SKUlist[i]=ss;
    //         }
    //         console.log(SKUlist)
    //         proinfo.SetSKUlist=SKUlist;
    //         var opersonInfo = new PersonInfo();
    //         opersonInfo.gender= '女';
    //         opersonInfo.age = 27;
    //         opersonInfo.isGlass = '否';
    //         opersonInfo.isHat = '否';
    //         opersonInfo.frequency = 59;
    //         opersonInfo.preferSKU = '饮品';
    //         opersonInfo.pic = 'http://fujian.cn-bj.ufileos.com/thumbnailPhoto.jpg';
    //         proinfo.personInfo = opersonInfo;
    //         proinfo.updateTime = new Date();
    //         return proinfo;
    //     }
    //     return [];
    // } 
    async getPromotion(messageContent){
        var v = promotion(db.sequelize,db.Sequelize.DataTypes);
        var result = await v.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        });
        if(result.length >0){
            var proinfo = new PromotionInfo();
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
                console.log(promolist[i].SKUid);
                var skuObject = await skuDao.findAll({
                    limit:1,
                    where:{
                        id: promolist[i].SKUid
                    }
                });      
                var ss=  new SKUInfo();
                ss.Name = skuObject[0].name; 
                ss.Id = skuObject[0].id;
                ss.Desc = skuObject[0].desc;
                ss.Pic = skuObject[0].pic;
                ss.Price = skuObject[0].price;
                console.log(ss)
                SKUlist[i]=ss;
            }
            console.log(SKUlist)
            proinfo.SetSKUlist=SKUlist;
            var j = JSON.parse(messageContent);
            var opersonInfo = new PersonInfo();
            opersonInfo.gender= j.feature.gender;
            opersonInfo.age =  j.feature.Age;
            opersonInfo.isGlass = '';
            opersonInfo.isHat = '';
            opersonInfo.frequency = 0;
            opersonInfo.preferSKU = '';
            opersonInfo.pic = j.image;
            proinfo.personInfo = opersonInfo;
            proinfo.updateTime = new Date();
            return proinfo;
        }
        return [];
    } 
    
}

module.exports = PromotionRepo;