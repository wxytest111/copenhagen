const db = require('../models/db');
const RTData = require('../models/real_time_data');
const AgesInfo = require('./AgesInfo');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
/**
 * @author yxiuwen
 * @desc RTDataRepo class, 
 */
class RTDataRepo{
    constructor(props){
        
    }

    async ages(model){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        var r = new AgesInfo();
        r = await db.sequelize.query("select ages,count(*) as count,gender from("+      
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

         return r;
    }

    
    async max(str){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        var m = await dao.max('offset');
        return m;
    }

    async add(message){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        var max = await dao.max('offset');
        if(!max) max = -1;
        if(message.offset > max){
            var msg = JSON.parse(message.value);
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
                info.Offset = message.offset;
    
                await dao.create(info);
            } else if(msg.type === 'delete'){
                var info = new RTDataInfo();
                info.DeletedAt = msg.time;
                info.Duration = msg.duration;
                await dao.update(info,{  
                    'where':{'gid':msg.gid}
                });
            }
        }           
    }
    
}

module.exports = RTDataRepo;