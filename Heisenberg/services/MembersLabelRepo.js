const db = require('../models/db');
const label = require('../models/members_label');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
/**
 * @author yxiuwen
 * @desc MembersLabelRepo class, 
 */
class MembersLabelRepo{
    constructor(props){
        
    }

    async add(model){
   
    }

    async update(model){
        var dao = label(db.sequelize,db.Sequelize.DataTypes);
        if(model.id){
            var r = await dao.update(model,{  
                'where':{'id':model.id}
            });
        } else {
            var r = await dao.create(model);
        }

         return r;
    }

    async remove(id){
        var dao = label(db.sequelize,db.Sequelize.DataTypes);
        var result = await dao.findById(id);
        var r = await result.destroy();
        return r;
    }

    async getList(name){

        var dao = label(db.sequelize,db.Sequelize.DataTypes);
        if(name){
            return await dao.findAll({
                where:{
                    name:{
                        [Op.like]: '%'+name+'%'
                    }
                },
                order: [ [ 'createdAt', 'DESC' ]] 
            });
        }

        return await dao.findAll({
            order: [ [ 'createdAt', 'DESC' ]] 
        });
    }
  
}

module.exports = MembersLabelRepo;