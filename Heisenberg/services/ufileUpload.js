var HttpRequest = require('ufile').HttpRequest;
var AuthClient = require('ufile').AuthClient;
var util = require('util');
var path = require('path')
var fs = require('fs')
var mime = require("mime")


var bucket = "fujian";

var method = 'PUT';

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
const getSuffixName = function( fileName ) {
    fileName = fileName.toString();
    let nameList = (fileName+"").split('.')
    return nameList[nameList.length - 1]
  }

module.exports = async function(filepath,key){
    var bucket =  'fujian';
    var key = key;
    var file_path = filepath;
    
    var method = 'PUT';
    var url_path_params = '/' + key;
    var options = {
        'ucloud_public_key':'VvemKyUd35b93ElucSkKyIXqDDqVidGn0sAzVPfkur/O2E2uQIlVBQ==',
        'ucloud_private_key':'765df8aa634ee26965848c4f6ae82ae82d13a350',
        'proxy_suffix':'ufile.ucloud.cn'
    }
    console.log(url_path_params)
    console.log(file_path)
    
    var req = new HttpRequest(method, url_path_params, bucket, key, file_path);
    var client =  new AuthClient(req,options);
    
   
   var raw = "http://"+bucket+options.proxy_suffix+"/"+key;
    return new Promise(res => {
        client.SendRequest(res);
      });
}
