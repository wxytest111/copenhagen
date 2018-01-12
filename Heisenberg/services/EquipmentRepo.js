const db = require('../models/db');
const equipment = require('../models/equipment');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
const Op = Sequelize.Op

/**
 * @author yxiuwen
 * @desc EquipmentRepo class, 
 */
class EquipmentRepo{
    constructor(props){
        
    }
    
    async getBySensor(sensor){
        var equipmentDao = equipment(db.sequelize,db.Sequelize.DataTypes);
        var equ = await equipmentDao.findOne({
            where: {
                equipment_ID:sensor
              }
        });
        return equ
    }
    
    async add(model){
        var equipmentDao = equipment(db.sequelize,db.Sequelize.DataTypes);
        
        if(!model.id){
          
            var t = await equipmentDao.create(model);
           
        } else {
            var t = await equipmentDao.update(model,{  
                'where':{'id':model.id}
            });
        }
        return t;
    }

    async getList(params){
        
        var equipmentDao = equipment(db.sequelize,db.Sequelize.DataTypes);
        if(params){
            if(params.shop_id && params.type && params.type!='0'){
                return await equipmentDao.findAll({
                    where:{
                        shop_id:params.shop_id,
                        type:params.type,
                    }      
                });
            }
            if(params.shop_id){
                return await equipmentDao.findAll({
                    where:{
                        shop_id:params.shop_id,
                        // {
                        //     [Op.in]: params.shop_id
                        // } 
                    }      
                });
            }
            if(params.type && params.type!='0'){
                return await equipmentDao.findAll({
                    where:{
                        type:params.type,
                    }      
                });
            }
            return await equipmentDao.findAll();
        }
        return await equipmentDao.findAll();
    };

    async remove(id){
        var equipmentDao = equipment(db.sequelize,db.Sequelize.DataTypes);
        var result = await equipmentDao.findById(id);
        return await result.destroy()
    }

    
}

module.exports = EquipmentRepo;