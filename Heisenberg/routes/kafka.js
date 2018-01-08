const Kafka = require("no-kafka");
const consumer = new Kafka.SimpleConsumer({connectionString:'140.143.115.48:9092'});
const EventEmitter = require("events");
var RTDataDao = require('../services/RTDataRepo');

module.exports = new EventEmitter();

// 解析kafka推送的信息，适应前端
function parse(ms) {
	let data = {
		message: {
			code: 200,
		}
	};
  let type = ms.type;

  switch (type) {
    case "add":
    	data.type = "add";
      data.message["data"] = {};
      data.message.data["age"] = ms["attribute"]["age"];
      data.message.data["first_time"] = ms["cover"]["time"];
      data.message.data["gender"] = ms["attribute"]["gender"];
      data.message.data["group_id"] = ms["gid"];
      data.message.data["image_uri"] = ms["cover"]["uri"];
      data.message.data["is_new"] = ms["new"];
      data.message.data["person_id"] = ms["pid"];
      data.message.data["shop_id"] = ms["shop"];
      data.message.data["ts"] = ms["time"];
      data.message.data["sensor"] = ms["Sensor"];
      data.message.data["count"] = ms["count"];
      data.message.data["tag"] = ms["tag"] || undefined;
      break;
    case "delete":
    	data.type = "delete";
      data.message["person_id"] = ms["pid"];
      data.message["group_id"] = ms["gid"];
      data.message["time"] = ms["time"];
      data.message["duration"] = ms["duration"];
      break;
    case "tag":
    	data.type = "alarm";
      data.message["person_id"] = ms["pid"];
      data.message["group_id"] = ms["gid"];
      data.message["time"] = ms["time"];
      data.message["tag"] = ms["tags"];
      break;
    case "update":
    	data.type = "update";
      data.message["person_id"] = ms["pid"];
      data.message["group_id"] = ms["gid"];
      data.message["image_uri"] = ms["img"]["uri"];
      break;
  }
  return data;
}

// 对推送来的信息做聚类缓存处理
// function clusterProcess(action, obj) {
//   if (action === undefined || obj === null) {
//     return;
//   }
//   let personId = obj.pid,
//       shopId = obj.shop,
//       clusterKey = personId + shopId,
//       dateString = (new Date(obj.time)).toLocaleDateString(),
//       timeString = (new Date(obj.time)).toLocaleTimeString(),
//       uts = (new Date(obj.time)).toLocaleString();
//   if (action === "new") { 
//     // redis.hmget("cluster", clusterKey).then((res) => {
//     //   if (res[0] === null) {
//     //     // 某person之前没有聚类保存信息
//     //     let cluster = [],
//     //         firstClusterFaceItem = {};
//     //     firstClusterFaceItem.dateString = dateString;
//     //     firstClusterFaceItem.image_uri = obj.cover.uri;
//     //     firstClusterFaceItem.group_id = obj.gid;
//     //     firstClusterFaceItem.glass = obj.attribute.glass;
//     //     firstClusterFaceItem.uts = uts;
//     //     firstClusterFaceItem.hat = obj.attribute.hat;
//     //     firstClusterFaceItem.all = [];
//     //     cluster.push(firstClusterFaceItem);
//     //     // console.log("========add cluster========");
//     //     // console.log(cluster);
//     //     // console.log("===========================");
//     //     redis.hmset("cluster", clusterKey, JSON.stringify(cluster));
//     //   } else {
//     //     // 之前有聚类信息
//     //     let parsedRes = JSON.parse(res);
//     //     let clusterFaceItem = {};
//     //     clusterFaceItem.dateString = dateString;
//     //     clusterFaceItem.image_uri = obj.cover.uri;
//     //     clusterFaceItem.group_id = obj.gid;
//     //     clusterFaceItem.glass = obj.attribute.glass;
//     //     clusterFaceItem.uts = uts;
//     //     clusterFaceItem.hat = obj.attribute.hat;
//     //     clusterFaceItem.all = [];
//     //     parsedRes.push(clusterFaceItem);
//     //     redis.hmset("cluster", clusterKey, JSON.stringify(parsedRes));
//     //   }
//     // })
//   } else if (action === "update") {
//     // redis.hmget("cluster", clusterKey).then((res) => {
//     //   if (res[0] !== null) {
//     //         let parsedRes = JSON.parse(res),
//     //             latestClusterFaceItem = parsedRes[parsedRes.length-1];
//     //         // console.log("==========update========");
//     //         // console.log(parsedRes);
//     //         // console.log("========================");
//     //         let updateItem = {};
//     //         updateItem.image_uri = obj.img.uri;
//     //         updateItem.uts = uts;
//     //         latestClusterFaceItem.all.push(updateItem);
//     //         redis.hmset("cluster", clusterKey, JSON.stringify(parsedRes));}
//     // })
//   }
// }

// data handler function can return a Promise
let dataHandler = function (messageSet, topic, partition) {
    var dao = new RTDataDao();
    messageSet.forEach(function (m) {
    //   let curTime = (new Date()).getTime();
    let cur = JSON.parse(m.message.value.toString('utf8'));
    // console.log('-------------m--------',m)
    dao.add(m);
    //   if (cur.type === "add") {
    //     clusterProcess("new", cur);
    //   } else if(cur.type === "update") {
    //     clusterProcess("update", cur);
    //   }
    	// 解析kafka推送来的原始数据
    	// console.log(cur);
      // 推送比当前时间早，不处理
      // if (curTime > cur.time) {
      //   return;
      // }
    	let parsedData = parse(cur);
    	// 存入redis
    	// let type = parsedData.type,
    			// message = parsedData.message,
    			// id = message.person_id || message.data.person_id;
    	// if (type === "add") {
    		// redis.hmset("people", id, JSON.stringify(message.data));
    	// } else if (type === "delete") {
    		// redis.hdel("people", id);
    	// } 
      // 放弃更新图片，Update消息作为聚类结构保存起来
     //  else if (type === "update") {
    	// 	redis.hmget("people", id).then((res) => {
     //      if (res !== null || res[0] !== null) {
     //        console.log(res);
     //        let toModify = JSON.parse(res);
     //        toModify.image_uri = message.image_uri;
     //        redis.hmset("people", id, JSON.stringify(toModify));
     //      }
    	// 	})
    	// } 
    //   else if (type === "alarm") {
    		// 更新报警
    		// redis.hmget("people", message.person_id).then((res) => {
    		// 	let toModify = JSON.parse(res);
    		// 	toModify.tag = message.tag;
    		// 	redis.hmset("people", id, JSON.stringify(toModify));
    		// })
    	// }
    	module.exports.emit("push", parsedData);
    });
};
 
return consumer.init().then(function () {
    // Subscribe partitons 0 and 1 in a topic:
    return consumer.subscribe('tongmeng-reid', dataHandler);
});