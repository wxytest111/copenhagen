const DB = require('../models/db');
const router = require('koa-router')();
const request = require('request');
const rp = require('request-promise');
const statisticsInfo = require('../services/StatisticsInfo');
const ResInfo = require('../services/ResInfo');
const FeatureInfo = require('../services/FeatureInfo');
var statisticsDao = require('../services/StatisticsRepo');

router.prefix("/identify");


router.get('/', async function (ctx, next) {
  var dao = new statisticsDao();
  var params = ctx.query;
  // params.sensor = 1428026400;
  // console.log('params',params)
  var options = {
    uri: 'http://140.143.177.99:11222/identify',
    qs: {
      // faceId:'b04f16be-8f57-4b99-b6bb-f274861360fb',
      // sensor:'1426822161',
      faceId:params.faceId,
      sensor:params.sensor,
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

  await rp(options).then(function (res) {
    
    if(res.retCode==0){
      var info = new statisticsInfo();
      info.FaceId = params.faceId;
      info.PosNo = params.posNo;
      info.Sensor = params.sensor;
      info.StoreNo = params.storeNo;
      info.TransId = params.tranId;
      info.Ts = Number.parseInt(params.ts);

      if(res.person){
        info.PersonId = res.person.pid;
        info.Gender = res.person.attribute.gender;
        info.Age = res.person.attribute.age;
        info.Image = res.person.images[0].uri;
        info.StartTime = res.person.start;
      }

      dao.create(info);
    }

    var resInfo = new ResInfo();
    resInfo.RetCode = res.retCode;
    resInfo.RetMessage = res.retMessage;

    if(res.person){
      var feature = new FeatureInfo();
      feature.Gender = res.person.attribute.gender==1?"男":res.person.attribute.gender==2?"女":"其他";
      feature.Age = res.person.attribute.age;
      feature.Emotion = "未知";
  
      resInfo.TransId = params.tranId;
      resInfo.FaceId = params.faceId;
      resInfo.PersonId = res.person.pid;
      resInfo.Feature = feature;
    }
    ctx.body = resInfo;
    console.log('res---------------', res);
  })
  .catch(function (err) {
    console.log(err)
  });


  // request('http://140.143.177.99:11222/identify?faceId=b04f16be-8f57-4b99-b6bb-f274861360fb&sensor=1426822161', function (error, response, body) {
  //     console.log('error:', error); // Print the error if one occurred
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //     console.log('body:', body); // Print the HTML for the Google homepage.
  //     //  result = data(body);
  //      result = body;
  //     console.log("result：",result)
  //   });
  
  
  // var http = require('http');
  // var querystring = require('querystring');
  //     var data = { 
  //       faceId: 'b04f16be-8f57-4b99-b6bb-f274861360fb', 
  //       sensor: 1426822161};//这是需要提交的数据 
         
         
  //     var content = querystring.stringify(data); 
  // var options = {
    
  //         host: '140.143.177.99', // 这个不用说了, 请求地址
  //         port:11222,
  //         path:'/identify?' + content, // 具体路径, 必须以'/'开头, 是相对于host而言的
  //         method: 'GET', // 请求方式, 这里以post为例
  //         headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
  //             'Content-Type': 'application/json'
  //         }
  //     };
  //      http.get(options, function(res) {
  //         var resData = "";
  //         res.on("data",function(data){
  //             resData += data;
  //         });

  //         res.on("end", function() {
  //           var rr =  JSON.parse(resData);  
  //           console.log('rr-------',JSON.stringify(rr))
  //           ctx.body= rr;
  //         });

        
      // })

// console.log('result:::',result)

    // ctx.body = {
    //   "retCode": 0,
    //   "retMessage": "ok",
    //   "transId": "230239",
    //   "faceId": "12cb7da1-f714-4840-9294-25214d5a5823",
    //   "personId": "3abdd699-6304-456c-b6c7-b2aa9fa52939",
    //   "feature": {
    //       "gender": "男",
    //       "age": 29,
    //       "emotion": "未知"
    //   }
    // };
    
  })




module.exports = router;
