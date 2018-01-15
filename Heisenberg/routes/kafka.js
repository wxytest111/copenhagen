const Kafka = require("no-kafka");
const EventEmitter = require("events");
var RTDataDao = require('../services/RTDataRepo');
var EquipmentDao = require('../services/EquipmentRepo');

const consumer = new Kafka.SimpleConsumer({connectionString:'140.143.115.48:9092'});

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
      data.message.data["id"] = ms["id"];
      data.message.data["age"] = ms["attribute"]["age"];
      data.message.data["createdAt"] = ms["cover"]["time"];
      data.message.data["gender"] = ms["attribute"]["gender"];
      data.message.data["gid"] = ms["gid"];
      data.message.data["image"] = ms["cover"]["uri"];
      data.message.data["news"] = ms["new"];
      data.message.data["pid"] = ms["pid"];
      data.message.data["shop_id"] = ms["shop"];
      data.message.data["ts"] = ms["time"];
      data.message.data["sensor"] = ms["Sensor"];
      data.message.data["count"] = ms["count"];
      data.message.data["tag"] = ms["tag"] || undefined;
      break;
    case "delete":
      data.type = "delete";
      data.message["data"] = {};
      data.message["pid"] = ms["pid"];
      data.message["gid"] = ms["gid"];
      data.message.data["shop_id"] = ms["shop"];
      data.message["time"] = ms["time"];
      data.message["duration"] = ms["duration"];
      break;
    case "tag":
    	data.type = "alarm";
      data.message["pid"] = ms["pid"];
      data.message["gid"] = ms["gid"];
      data.message["time"] = ms["time"];
      data.message["tag"] = ms["tags"];
      break;
    case "update":
    	data.type = "update";
      data.message["pid"] = ms["pid"];
      data.message["gid"] = ms["gid"];
      data.message["image"] = ms["img"]["uri"];
      break;
  }
  return data;
}


// data handler function can return a Promise
 let dataHandler = function (messageSet, topic, partition) {
    var dao = new RTDataDao();
    messageSet.forEach(async function (m) {
    let cur = JSON.parse(m.message.value.toString('utf8'));
    if(cur.type === 'add'){
    var equ = await new EquipmentDao().getBySensor(cur.cover.sensor);
      if(equ){
        cur.shop = equ.shop_id;
      }
      var pcount = await dao.pCount(cur.pid,cur.shop);
      if(pcount){
        cur.count = pcount;
      } else {
        cur.count = 1;
      }
    }
    var info = await dao.add(m,cur);
    if(cur.type === 'add'){
      cur.id = info.id;
    }
    let parsedData = parse(cur);
    module.exports.emit("push", parsedData);
    });
};
 
return consumer.init().then(function () {
    return consumer.subscribe('tongmeng-reid', dataHandler);
});