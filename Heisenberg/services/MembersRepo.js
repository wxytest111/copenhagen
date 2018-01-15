const db = require('../models/db');
const members = require('../models/members');
const images = require('../models/members_images');
const Sequelize = require('sequelize');

/**
 * @author yxiuwen
 * @desc MembersRepo class, 
 */
class MembersRepo{
    constructor(props){
        
    }

    async add(model){
        
    }

    async update(model){
        var dao = members(db.sequelize,db.Sequelize.DataTypes);
        var iDao = images(db.sequelize,db.Sequelize.DataTypes);
        if(model.id){
            var r = await dao.update(model,{  
                'where':{'id':model.id}
            }); 
            await iDao.destroy({
                where:{
                    member_id:id
                }
            }) 
            if(model.images){
                for (let index = 0; index < model.images.length; index++) {
                    model.images[index].member_id = r.id;
                    model.images[index].createdAt = new Date();
                    await iDao.create(model.images[index]);
                }
            }
        } else {
            var r = await dao.create(model);
            if(model.images){
                for (let index = 0; index < model.images.length; index++) {
                    model.images[index].member_id = r.id;
                    model.images[index].createdAt = new Date();
                    await iDao.create(model.images[index]);
                }
            }
        }
         return r;
    }

    async remove(id){
        var dao = members(db.sequelize,db.Sequelize.DataTypes);
        var iDao = images(db.sequelize,db.Sequelize.DataTypes);
        await iDao.destroy({
            where:{
                member_id:id
            }
        })
        var r = await dao.destroy({
            where:{
                id:id
            }
        });
        return r;
    }
    

    async getOne(id){

        var dao = members(db.sequelize,db.Sequelize.DataTypes);
        var iDao = images(db.sequelize,db.Sequelize.DataTypes);
        // dao.belongsTo(iDao,{foreignKey:'id',targetKey:'member_id',as:'tt'});
        dao.hasMany(iDao, {foreignKey:'member_id',targetKey:'id',as: 'images'})
        var r=await dao.findOne({
            where:{
                id:id,
            },      
            include:{
                model:iDao,
                as:'images'
                }
        });

        return r;
    }

    async getList(label_id){

        var dao = members(db.sequelize,db.Sequelize.DataTypes);
        var iDao = images(db.sequelize,db.Sequelize.DataTypes);
        // dao.belongsTo(iDao,{foreignKey:'id',targetKey:'member_id',as:'tt'});
        dao.hasMany(iDao, {foreignKey:'member_id',targetKey:'id',as: 'images'})
        var r=await dao.findAll({
            where:{
                label_id:label_id
            },      
            include:{
                model:iDao,
                as:'images'
                }
        });

        return r;
    }
  
}

module.exports = MembersRepo;