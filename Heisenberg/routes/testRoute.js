

const router = require('koa-router')();
const SKUInfo = require('../services/SKUInfo');
var umqclient = require('umq-nodejs-sdk')
var config = require('../config/uCloudConfig');
var assert = require('assert');

function pub(p) {
    let j = {
      "retCode": 0,
      "Msg": "ok",
      "TransId": "230239",
      "FaceId": "ae1abea6-8eb6-4a16-bff5-d0efb7698640",
      "PersonId": "c8d0335a-bc0c-4e17-69b7-4df196aecfa6",
      "feature": {
          "gender": "男",
          "Age": 34,
          "Emotion": "未知"
      },
      "image": "http://106.75.64.85:8501/api/file/6,0648a9dbbfc2be"
  };  
    //let d = "umq test pubsub" + Date.now();
    let d= JSON.stringify(j);
    p.publishMessage(config.Topic, d).then((msgId) => {
           console.log("send message ", msgId)
           console.log("message is "+d);
    }).catch(err => {
      console.error(err);
    });
}
function testPubSub() {
  let client = umqclient.newUmqClient({
    host: config.Host,
    projectId: config.ProjectId,
    timeout: 10000,
  });
  let p = client.createProducer(config.ProducerId, config.ProducerToken);
  pub(p);
}
router.prefix("/api/test");


router.get('/', async function (ctx, next) {
  testPubSub();
});

module.exports = router;
