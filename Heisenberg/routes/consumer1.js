var RTDataDao = require('../services/RTDataRepo');
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
// var ServiceRouter = require('../service-router/serviceRouter.js');
var toKafka = function () {
    var client = new kafka.KafkaClient({ kafkaHost: '140.143.115.48:9092' });
    
    var Offset = kafka.Offset;
    var offset = new Offset(client);
    console.log('connection kafka......');
    var dao = new RTDataDao();
    var m = dao.max('offset');
    var topics = [{
        // topic: 'tongmeng-reid', partition: 0, offset:offset
        topic: 'tongmeng-reid', partition: 0, offset:isNaN(m)?offset:m
    }];
  
    var options = {
       // groupId: 'tongmeng-reid',//consumer group id, default `kafka-node-group`
       sessionTimeoutMs: 30000,
       //消息发送的最长等待时间.需大于session.timeout.ms这个时间 
       requestTimeoutMs:40000,
       //一次从kafka中poll出来的数据条数  
        //max.poll.records条数据需要在在session.timeout.ms这个时间内处理完  
        maxPollRecords:100,  
        // Auto commit config
        autoCommit: true,
        autoCommitMsgCount: 100,
        autoCommitIntervalMs: 1000,
        // Fetch message config
       
        //若是不满足fetch.min.bytes时，等待消费端请求的最长等待时间  
        fetchWaitMaxMs:1000,  
        fetchMaxWaitMs: 1000,
        //server发送到消费端的最小数据，若是不满足这个数值则会等待直到满足指定大小。默认为1表示立即接收。  
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
        console.log("------------- message ------------");
        // var key = message.toString();
        // console.log('key',key);
        if (message.value) {
            // console.log('message',message);
            try {
                dao.add(message);
                // var msg = JSON.parse(message.value);
                // ServiceRouter.dispatch(key, msg);
                // console.log('msg',(message))

                consumer.commit(function(err, data) {
                    console.log("commit------------------------")
                });

            } catch (e) {
                console.log(e)
            }
        } else {
            console.log('message',message)
        }
    });
    consumer.on('offsetOutOfRange', function (topic) {
        // console.log("------------- offsetOutOfRange ------------");
        topic.maxNum = 2;
        offset.fetch([topic], 
        function (err, offsets) {
           console.log('offsets',offsets);
           var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
           consumer.setOffset(topic.topic, topic.partition, min);
       });
    });
    consumer.on('error', function (message) {
        // console.log("------------- error ------------");
        console.log('error',message);
        console.log('kafka error');
    });
};
module.exports = toKafka;