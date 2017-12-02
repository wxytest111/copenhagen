const db = require('../models/db');
const brand = require('../models/SKU_brand');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
const Op = Sequelize.Op

/**
 * @author yxiuwen
 * @desc SKUBrandRepo class, 
 */
class SKUBrandRepo{
    constructor(props){
        
    }
    
    async add(model){
        var brandDao = brand(db.sequelize,db.Sequelize.DataTypes);
        
        if(!model.id){
            var t = await brandDao.create(model);
           
        } else {
            var t = await brandDao.update(model,{  
                'where':{'id':model.id}
            });
        }
        return t;
    }

    async getBrandList(name){
        
        var brandDao = brand(db.sequelize,db.Sequelize.DataTypes);
        if(name){
            return await brandDao.findAll({
                where:{
                    name:{
                        [Op.like]: '%'+name+'%'
                    }
                }      
            });
        }
        return await brandDao.findAll();
    };

    async remove(id){
        var brandDao = brand(db.sequelize,db.Sequelize.DataTypes);
        var result = await brandDao.findById(id);
        return await result.destroy()
    }

    
}

module.exports = SKUBrandRepo;