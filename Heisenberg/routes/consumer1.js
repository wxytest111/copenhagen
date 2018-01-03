var statisticsDao = require('../services/StatisticsRepo');
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
// var ServiceRouter = require('../service-router/serviceRouter.js');
var toKafka = function () {
    var client = new kafka.KafkaClient({ kafkaHost: '140.143.115.48:9092' });
    
    var Offset = kafka.Offset;
    var offset = new Offset(client);
    console.log('连接kafka1中......');
    var dao = new statisticsDao();
    var m = dao.max('offset');
    var topics = [{
        topic: 'tongmeng-reid', partition: 0, offset:isNaN(m)?offset:m
    }];
  
    var options = {
        groupId: 'tongmeng-reid',//consumer group id, default `kafka-node-group`
// Auto commit config
        autoCommit: true,
        autoCommitMsgCount: 100,
        autoCommitIntervalMs: 1000,
// Fetch message config
        fetchMaxWaitMs: 100,
        fetchMinBytes: 1,
        fetchMaxBytes: 1024 * 10,
        fromOffset: true,
        fromBeginning: false
    };
    var consumer = new Consumer(
        client,
        topics,
        options
    );
    consumer.on('message', function (message) {
        console.log("------------- message1 ------------");
        // var key = message.toString();
        // console.log('key',key);
        if (message.value) {
            // console.log('message',message);
            try {
                // dao.add(message);
                // var msg = JSON.parse(message.value);
                // ServiceRouter.dispatch(key, msg);
                console.log('msg1',(message))

                consumer.commit(function(err, data) {
                    console.log("commit1------------------------")
                });

            } catch (e) {
                console.log(e)
            }
        } else {
            console.log('message1',message)
        }
    });
    consumer.on('offsetOutOfRange', function (topic) {
        // console.log("------------- offsetOutOfRange ------------");
        topic.maxNum = 2;
        offset.fetch([topic], 
        function (err, offsets) {
           console.log('offsets1',offsets);
           var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
           consumer.setOffset(topic.topic, topic.partition, min);
       });
    });
    consumer.on('error', function (message) {
        // console.log("------------- error ------------");
        console.log('error1',message);
        console.log('kafka1错误');
    });
};
module.exports = toKafka;