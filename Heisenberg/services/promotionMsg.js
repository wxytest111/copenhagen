var umqclient = require('umq-nodejs-sdk')
var config = require('../config/uCloudConfig');
var assert = require('assert');
const promotionRepo = require('./promotionRepo');
const socket = require("../routes/socketRoute");
var schedule = require('node-schedule');

const isRunning = false;
async function subscription(s) {
    var succCount = 0;
    s.on("data", async(message) => {
        isRunning = true;
        var msgId = message.messageID;
        var msg = message.content.toString();
        console.log("receive message", msgId, msg);
        
        if (msg != '') {
            var vr = await (new promotionRepo()).getPromotion(msg);
            socket.sendMsg(vr);
        }
        s.ackMessage([msgId]).then(() => {
            console.log("ack message " + msgId + '\n');
        }).catch(err => {
            isRunning = false;
            console.error(err);
        });
    });
}

function scheduleMonitor() {
    
    schedule.scheduleJob('10 * * * * *', function(){
        console.log("schedule: "+isRunning);
        if(isRunning == false){
            publish();
        }
    }); 
}


async function publish() {
    const client = umqclient.newUmqClient({
        host: config.Host,
        projectId: config.ProjectId,
        timeout: 5000,
    });
    const s = client.createSubscription(config.ConsumerId, config.ConsumerToken, config.Topic, 10);
    await subscription(s);
    //scheduleMonitor();
}
module.exports = publish;