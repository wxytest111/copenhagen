const db = require('../models/db');
const RTData = require('../models/real_time_data');
const RTDataInfo = require('./RTDataInfo');
// const AgesInfo = require('./AgesInfo');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
/**
 * @author yxiuwen
 * @desc RTDataRepo class, 
 */
class RTDataRepo{
    constructor(props){
        
    }

    async getListByShop(shop_id){

        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        
        var r=await dao.findAll({
            where:{
                shop_id:shop_id,
                deletedAt: null
            },
            order: [ [ 'createdAt', 'DESC' ]] 
        });

        return r;
    }

    async nature(model){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        //var r = new AgesInfo();
        var r = [];
        if(model.type === "ages"){
            r = await db.sequelize.query("select UUID() as id,ages,count(*) as count from("+      
            "select "+  
                "case "+  
                "when age<=18 then '18岁以下'  "+
                "when age>=19 and age<=25 then '19-25岁'  "+
                "when age>=26 and age<=35 then '26-35岁' "+
                "when age>=36 and age<=45 then '36-45岁' "+
                "when age>=46 and age<=55 then '46-55岁' "+
                "when age>=56 and age<=65 then '56-65岁' "+
                "when age>=66 then '66岁以上' "+
             "end "+ 
             "as ages,id from real_time_data  "+
            ")a group by ages");
        } else if(model.type === "gender"){
            r = await db.sequelize.query("select UUID() as id,gender,count(*) as count from("+      
            "select "+  
                "case "+  
                "WHEN gender = 1 THEN '男'  "+
                "WHEN gender = 2 THEN '女'  "+
             "end "+ 
             "as gender,id from real_time_data  "+
            ")a group by gender");
        // } else if(model.type === "glass"){
        //     r = await db.sequelize.query("select UUID() as id,glass,count(*) as count from("+      
        //     "select "+  
        //         "case "+  
        //         "WHEN glass = 1 THEN '男'  "+
        //         "WHEN glass = 2 THEN '女'  "+
        //      "end "+ 
        //      "as glass,id from real_time_data  "+
        //     ")a group by glass");
        } else if(model.type === "news"){
            r = await db.sequelize.query("select UUID() as id,news,count(*) as count from("+      
            "select "+  
                "case "+  
                "WHEN news = 0 THEN '老会员'  "+
                "WHEN news = 1 THEN '新会员'  "+
             "end "+ 
             "as news,id from real_time_data  "+
            ")a group by news");
        }

         return r.length>0?r[0]:[];
    }

    async ages(model){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        //var r = new AgesInfo();
        var r = await db.sequelize.query("select UUID() as id,ages,count(*) as count,gender from("+      
        "select "+  
            "case "+  
            "when age<=18 then '18岁以下'  "+
            "when age>=19 and age<=25 then '19-25岁'  "+
            "when age>=26 and age<=35 then '26-35岁' "+
            "when age>=36 and age<=45 then '36-45岁' "+
            "when age>=46 and age<=55 then '46-55岁' "+
            "when age>=56 and age<=65 then '56-65岁' "+
            "when age>=66 then '66岁以上' "+
         "end "+ 
         "as ages,id,gender from real_time_data  "+
        ")a group by ages,gender");

         return r[0];
    }

    async pCount(pid,shop_id){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        var m = await dao.count({
            where:{
                pid:pid,
                shop_id:shop_id
            }
        })
        return m;
    }
    
    async max(str){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        var m = await dao.max('offset');
        return m;
    }

    async add(m,msg){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        // var max = await dao.max('offset');
        // if(!max) max = -1;
        // if(message.offset > max){
            
            // let msg = m.message.value;
            // let msg = JSON.parse(m.message.value.toString('utf8'));
            if(msg.type === 'add'){
                // console.log('msg---dao---',msg)
                var info = new RTDataInfo();
                info.Pid = msg.pid;
                info.Gid = msg.gid;
                info.News = msg.new;
                info.ShopId = msg.shop;
                info.Sensor = msg.cover.sensor;
                info.Image = msg.cover.uri;
                info.CreatedAt = msg.time;
                info.Gender = msg.attribute.gender;
                info.Hat = msg.attribute.hat;
                info.Age = msg.attribute.age;
                info.Glass = msg.attribute.glass;
                info.Offset = m.offset;
    
                return await dao.create(info);
            } else if(msg.type === 'delete'){
                var info = new RTDataInfo();
                info.DeletedAt = msg.time;
                info.Duration = msg.duration;
                await dao.update(info,{  
                    'where':{'gid':msg.gid}
                });
            } else if(msg.type === 'tag'){
                var info = new RTDataInfo();
                info.tag = msg.tags.tag;
                await dao.update(info,{  
                    'where':{'gid':msg.gid}
                });
            }
        // }           
    }
    
}

module.exports = RTDataRepo;