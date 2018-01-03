const db = require('../models/db');
const statistics = require('../models/statistics');
const statisticsInfo = require('./StatisticsInfo');
const Sequelize = require('sequelize');
var compress = require('koa-compress');
/**
 * @author yxiuwen
 * @desc StatisticsRepo class, 
 */
class StatisticsRepo{
    constructor(props){
        
    }
    
    async max(str){
        var dao = statistics(db.sequelize,db.Sequelize.DataTypes);
        return await dao.max('offset');
    }

    async add(message){
        var dao = statistics(db.sequelize,db.Sequelize.DataTypes);
        var max = await dao.max('offset');
        if(!max) max = -1;
        if(message.offset > max){
            var msg = JSON.parse(message.value);
            var info = new statisticsInfo();
            info.TransId = msg.transId;
            info.FaceId = msg.faceId;
            info.PersonId = msg.personId;
            info.StoreNo = msg.storeNo;
            info.PosNo = msg.posNo;
            info.Gender = msg.feature.gender;
            info.Age = msg.feature.age;
            info.Emotion = msg.feature.emotion;
            info.Offset = message.offset;
            dao.create(info);
        }           
    }
    
}

module.exports = StatisticsRepo;