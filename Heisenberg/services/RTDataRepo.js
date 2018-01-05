const db = require('../models/db');
const RTData = require('../models/real_time_data');
const RTDataInfo = require('./RTDataInfo');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
/**
 * @author yxiuwen
 * @desc RTDataRepo class, 
 */
class RTDataRepo{
    constructor(props){
        
    }
    
    // async max(str){
    //     var dao = statistics(db.sequelize,db.Sequelize.DataTypes);
    //     return await dao.max('offset');
    // }

    async add(message){
        var dao = RTData(db.sequelize,db.Sequelize.DataTypes);
        // var max = await dao.max('offset');
        // if(!max) max = -1;
        // if(message.offset > max){
        if(message.value){
            var msg = JSON.parse(message.value);
            if(message.value.type === 'add'){
                console.log('msg---dao---',msg)
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
                info.Glass = msg.v.glass;
    
                dao.create(info);
            }
        }           
    }
    
}

module.exports = RTDataRepo;