const db = require('../models/db');
const region = require('../models/region');
const regiontree= require('../models/region_tree');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
const Op = Sequelize.Op;

/**
 * @author yxiuwen
 * @desc RegionRepo class, 
 */
class RegionRepo{
    constructor(props){
        
    }

    async add(model){
        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        if(!model.id){
            var r = await reg.create(model);
            var result = await db.sequelize.query('INSERT INTO region_tree (ancestor_key,member_key,distance,is_leaf) SELECT rt.ancestor_key, '+
            ':member_key, rt.distance + 1,1 FROM region_tree AS rt WHERE rt.member_key = :parentid UNION ALL SELECT :member_key, :member_key,0,1', 
            { replacements: { member_key: r.id,parentid:model.parentid },})
        } else {
            var r = await reg.update(model,{  
                'where':{'id':model.id}
            });
            var pid = await this.getParent(model.id);
            if(pid.id === model.parentid){
                
            } else {
                await db.sequelize.query('delete a from region_tree a join region_tree b on (a.member_key = b.member_key) where b.ancestor_key=:id',
                {replacements: { id:model.id },});
                await db.sequelize.query('INSERT INTO region_tree (ancestor_key,member_key,distance,is_leaf) SELECT rt.ancestor_key, '+
                ':member_key, rt.distance + 1,1 FROM region_tree AS rt WHERE rt.member_key = :parentid UNION ALL SELECT :member_key, :member_key,0,1', 
                { replacements: { member_key:model.id,parentid:model.parentid },})
            };
        }
         return r;
    }

    async update(model){
        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        
        var r = await reg.update(model,{  
            'where':{'id':model.id}
        });
        
         return r;
    }

    async remove(id){
        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        var result = await reg.findById(id);
        var r = await result.destroy()
        await db.sequelize.query('delete a from region_tree a join region_tree b on (a.member_key = b.member_key) where b.ancestor_key=:id',
        {replacements: { id: id },});
        return r;
    }
    

    async getParent(id){

        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        var regt = regiontree(db.sequelize,db.Sequelize.DataTypes);
        reg.belongsTo(regt,{foreignKey:'id',targetKey:'ancestor_key',as:'tt'});
 
        var r=await reg.findOne({
            where:'',      
            include:{
                where: {
                    member_key:id,
                    distance:1
                    },
                    
                    model:regt,
                    as:'tt'
                }
        });


        //  var r = await db.sequelize.query('select r.id,r.name from region r join region_tree rt on (r.id = rt.ancestor_key) where rt.member_key = :id and distance = 1',
        // {replacements: { id: id },});
        return r;
    }

    async getRegionList(ancestor_key){
        
        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        var regt = regiontree(db.sequelize,db.Sequelize.DataTypes);
        reg.belongsTo(regt,{foreignKey:'id',targetKey:'member_key',as:'tt'});
 
        var regionlist=await reg.findAll({
            where:'',      
            include:{
                where: {
                    ancestor_key:6,
                    distance:0
                    },
                    
                    model:regt,
                    as:'tt'
                }
        });
        await this.getData(regionlist);
        return regionlist;

        };
       
    async getData(list){
        
        var reg = region(db.sequelize,db.Sequelize.DataTypes);
        var regt = regiontree(db.sequelize,db.Sequelize.DataTypes);
        reg.belongsTo(regt,{foreignKey:'id',targetKey:'member_key',as:'tt'});

        for (var i=0; i<list.length;i++){  
            var l = await reg.findAll({
                where:'',      
                include:{
                    where: {
                        ancestor_key:list[i].id,
                        distance:1
                    },
                    model:regt,
                    as:'tt'
                }
            });
            
            if(l.length > 0){
                list[i].dataValues.children = l;
                await this.getData(l);
            }
        }
    };
  
}

module.exports = RegionRepo;