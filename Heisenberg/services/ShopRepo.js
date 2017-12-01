const db = require('../models/db');
const shop = require('../models/shop');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
const Op = Sequelize.Op

/**
 * @author yxiuwen
 * @desc ShopRepo class, 
 */
class ShopRepo{
    constructor(props){
        
    }
    
    async add(model){
        var shopDao = shop(db.sequelize,db.Sequelize.DataTypes);
        
        if(!model.id){
            var t = await shopDao.create(model);
           
        } else {
            var t = await shopDao.update(model,{  
                'where':{'id':model.id}
            });
        }
        return t;
    }

    async getShopList(region_id){
        
        var shopDao = shop(db.sequelize,db.Sequelize.DataTypes);
        if(region_id){
            return await shopDao.findAll({
                where:{
                    region_id:{
                        [Op.in]: region_id
                    }
                }      
            });
        }
        return await shopDao.findAll();
    };

    async remove(id){
        var shopDao = shop(db.sequelize,db.Sequelize.DataTypes);
        var result = await shopDao.findById(id);
        return await result.destroy()
    }

    
}

module.exports = ShopRepo;