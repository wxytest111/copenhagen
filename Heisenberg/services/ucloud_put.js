module.exports = function (file, key) {
    var fs = require('fs');
    var crypto = require('crypto');
    var util = require('util');
    var http = require('http');
    var request = require('request');


    Base64 = function (content) {
        return new Buffer(content).toString('base64');
    }

    HmacSha1 = function (secretKey, content) {
        var hmac = crypto.createHmac('sha1', secretKey);
        hmac.update(content);
        return hmac.digest();
    }

    //file stat
    //var path = 'ustorage.jpg';
    // var stats = fs.statSync(path);
    // var fileSize = stats.size;

    var UCloudPublicKey = "VvemKyUd35b93ElucSkKyIXqDDqVidGn0sAzVPfkur/O2E2uQIlVBQ==";
    var UCloudPrivateKey = "765df8aa634ee26965848c4f6ae82ae82d13a350";
    var HTTPVerb = "PUT";
    var ContentMD5 = "";
    var ContentType = "application/octet-stream";
    var MyDate = new Date().getTime();
    var CanonicalizedUCloudHeaders = "";
    var bucket = "fujian";
    //var key = "ustorage";
    var CanonicalizedResource = "/" + bucket + "/" + key;
    var StringToSign = HTTPVerb + "\n" + ContentMD5 + "\n" + ContentType + "\n" + MyDate + "\n" +
        CanonicalizedUCloudHeaders +
        CanonicalizedResource;

        console.log(StringToSign)

    var Signature = Base64(HmacSha1(UCloudPrivateKey, StringToSign));
    var Authorization = "UCloud" + " " + UCloudPublicKey + ":" + Signature;


    var urlstr = 'http://' + bucket + '.ufile.ucloud.cn/' + key;
    var options = {
        url: urlstr,
        method: 'PUT',
        headers: {
            'Authorization': Authorization,
            //'Content-Length': file
        }
    };

    function callback(err, response, body) {
        console.log("err"+JSON.stringify(err))
        console.log("err"+JSON.stringify(response))
        console.log("err"+JSON.stringify(err))
        if (err) {
            return console.error("upload failed:", err);
        }
        console.log(response.caseless);
        return urlstr;
    }

    file.pipe(request.put(options, callback));
}