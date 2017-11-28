const db = require('../models/db');
const skutype = require('../models/SKU_type');
const skutypetree= require('../models/SKU_type_tree');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
const Op = Sequelize.Op;

/**
 * @author yxiuwen
 * @desc SKUTypeRepo class, 
 */
class SKUTypeRepo{
    constructor(props){
        
    }
    
    async add(model){
        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        if(!model.id){
            var t = await type.create(model);
            var result = await db.sequelize.query('INSERT INTO SKU_type_tree (ancestor_key,member_key,distance,is_leaf) SELECT rt.ancestor_key, '+
            ':member_key, rt.distance + 1,1 FROM SKU_type_tree AS rt WHERE rt.member_key = :parentid UNION ALL SELECT :member_key, :member_key,0,1', 
            { replacements: { member_key: t.id,parentid:model.parentid },})
        } else {
            var t = await type.update(model,{  
                'where':{'id':model.id}
            });

            var pid = await this.getParent(model.id);
            if(pid.id === model.parentid){
                
            } else {
                await db.sequelize.query('delete a from SKU_type_tree a join SKU_type_tree b on (a.member_key = b.member_key) where b.ancestor_key=:id',
                {replacements: { id:model.id },});
                await db.sequelize.query('INSERT INTO SKU_type_tree (ancestor_key,member_key,distance,is_leaf) SELECT rt.ancestor_key, '+
                ':member_key, rt.distance + 1,1 FROM SKU_type_tree AS rt WHERE rt.member_key = :parentid UNION ALL SELECT :member_key, :member_key,0,1', 
                { replacements: { member_key:model.id,parentid:model.parentid },})
            
            }
        }
        return t;
    }


    async remove(id){
        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        var result = await type.findById(id);
        var r = await result.destroy()
        await db.sequelize.query('delete a from SKU_type_tree a join SKU_type_tree b on (a.member_key = b.member_key) where b.ancestor_key=:id',
        {replacements: { id: id },});
        return r;
    }

    async getParent(id){
        
        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        var typetree = skutypetree(db.sequelize,db.Sequelize.DataTypes);
        type.belongsTo(typetree,{foreignKey:'id',targetKey:'ancestor_key',as:'stt'});
    
        var r=await type.findOne({
            where:'',      
            include:{
                where: {
                    member_key:id,
                    distance:1
                    },
                    
                    model:typetree,
                    as:'stt'
                }
        });
                
        return r;
    }

    async getSKUTypeParent(name){
        
        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        var typetree = skutypetree(db.sequelize,db.Sequelize.DataTypes);
        type.belongsTo(typetree,{foreignKey:'id',targetKey:'member_key',as:'stt'});
        var typelist=await type.findAll({
            where:{
                name:{like:'%'+name+'%'}
            },      
            include:{
                    model:typetree,
                    as:'stt'
                }
        });
        return typelist;
    };


    async getSKUType(ancestor_key){

        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        var typetree = skutypetree(db.sequelize,db.Sequelize.DataTypes);
        type.belongsTo(typetree,{foreignKey:'id',targetKey:'member_key',as:'stt'});
        
        var typelist=await type.findAll({
            where:'',      
            include:{
                where: {
                    ancestor_key:1,
                    distance:0
                    },
                    
                    model:typetree,
                    as:'stt'
                }
        });
        await this.getData(typelist);
        return typelist;
    };


    async getData(list){
        
        var type = skutype(db.sequelize,db.Sequelize.DataTypes);
        var typetree = skutypetree(db.sequelize,db.Sequelize.DataTypes);
        type.belongsTo(typetree,{foreignKey:'id',targetKey:'member_key',as:'stt'});

        for (var i=0; i<list.length;i++){  
            var l = await type.findAll({
                where:'',      
                include:{
                    where: {
                        ancestor_key:list[i].id,
                        distance:1
                    },
                    model:typetree,
                    as:'stt'
                }
            });
            
            if(l.length > 0){
                list[i].dataValues.children = l;
                await this.getData(l);
            }
        }
    };
    
}

module.exports = SKUTypeRepo;