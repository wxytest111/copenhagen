var plt_wechat_ctrl = (function(){
	var __api_list =["startRecord","stopRecord","onVoiceRecordEnd","playVoice","pauseVoice","stopVoice","onVoicePlayEnd","uploadVoice","downloadVoice","previewImage","translateVoice","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]; 
	var __api_list = ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','chooseImage','uploadImage','downloadImage','scanQRCode'];

	var __share_info = []; 
	__share_info['default'] = {
		'title' : '',
    		'desc' : '',
    		'img' : plt_gadget_ctrl.domain + '/res/platform/wechat/share.png',
    		'link' : plt_gadget_ctrl.domain,
    		'type' : 'link',
    		'data' : ''
	};

	function init(cb){
		var d = {};
		d.url = encodeURIComponent(location.href.split('#')[0]);
		plt_xhr_ctrl.send("wechat","config",JSON.stringify(d),function(e){
			var e = JSON.parse(e);
			if(e.result == "success"){
				wx.config({
					debug : false,
					appId : e.info.appid,
					timestamp: e.info.t,
					nonceStr: e.info.n,
					signature: e.info.s,
					jsApiList : __api_list
				});

				wx.ready(function () {
					cb();
				});

				wx.error(function (res) {
					//plt_router_ctrl.jump(18,"error/WeChat Config Error/R/");
				});
			}else{
				//router_ctrl.jump(24,"error/WeChat Config Error/R/");
			}
		});
	}

	//根据当前页面hash获得分享信息
	//需要重新注入
	function get_href(spec){
		var href = location.href.split("#")[1];
		if(href == undefined) {
			href = 'default';
		}else {
			href = href.split("/")[1];
			if(href == undefined) href = 'default';
		}
		if(spec != undefined) href = spec;
		return href;
	}

	//分享给好友
	//默认会获取当前页面hash值来获得对应分享信息
	//也可通过spec变量指定
	//找不到对应分享信息的话默认调用default对应值
	function onMenuShareAppMessage(cb,cb_fail,spec){
		var href = get_href(spec);
		if(__share_info[href] == undefined) href = 'default';

		wx.onMenuShareAppMessage({ 
			title: __share_info[href].title, //分享标题 
			desc: __share_info[href].desc, //分享描述 
			link: __share_info[href].link, //分享链接 
			imgUrl: __share_info[href].img, //分享图标 
			type: __share_info[href].type, //分享类型,music、video或link，不填默认为link 
			dataUrl: __share_info[href].data, //如果type是music或video，则要提供数据链接，默认为空 
			success: function (res) { //用户确认分享后执行的回调函数 
				cb(res);
			}, 
			cancel: function (res) { //用户取消分享后执行的回调函数 
				cb_fail(res);
			} 
		});
	}

	//分享到朋友圈
	function onMenuShareTimeline(cb,cb_fail,spec){
		var href = get_href(spec);
		if(__share_info[href] == undefined) href = 'default';

		wx.onMenuShareTimeline({ 
			title: __share_info[href].title, //分享标题 
			link: __share_info[href].link, //分享链接 
			imgUrl: __share_info[href].img, //分享图标 
			success: function (res) { //用户确认分享后执行的回调函数 
				cb(res);
			}, 
			cancel: function (res) { //用户取消分享后执行的回调函数 
				cb_fail(res);
			} 
		});
	}

	//分享到qq
	function onMenuShareQQ(cb,cb_fail,spec){
		var href = get_href(spec);
		if(__share_info[href] == undefined) href = 'default';

		wx.onMenuShareQQ({ 
			title: __share_info[href].title, //分享标题 
			desc: __share_info[href].desc, //分享描述
			link: __share_info[href].link, //分享链接
			imgUrl: __share_info[href].img, //分享图标 
			success: function (res) { //用户确认分享后执行的回调函数 
				cb(res);
			}, cancel: function (res) { //用户取消分享后执行的回调函数 
				cb_fail(res);
			} 
		});
	}

	function onMenuShareWeibo(cb,cb_fail,spec){
		var href = get_href(spec);
		if(__share_info[href] == undefined) href = 'default';

		wx.onMenuShareWeibo({ 
			title: __share_info[href].title, //分享标题 
			desc: __share_info[href].desc, //分享描述
			link: __share_info[href].link, //分享链接
			imgUrl: __share_info[href].img, //分享图标 
			success: function (res) { //用户确认分享后执行的回调函数 
				cb(res);
			}, cancel: function (res) { //用户取消分享后执行的回调函数 
				cb_fail(res);
			} 
		});
	}

	function onMenuShareQZone(cb,cb_fail,spec){
		var href = get_href(spec);
		if(__share_info[href] == undefined) href = 'default';

		wx.onMenuShareQZone({ 
			title: __share_info[href].title, //分享标题 
			desc: __share_info[href].desc, //分享描述
			link: __share_info[href].link, //分享链接
			imgUrl: __share_info[href].img, //分享图标 
			success: function (res) { //用户确认分享后执行的回调函数 
				cb(res);
			}, cancel: function (res) { //用户取消分享后执行的回调函数 
				cb_fail(res);
			} 
		});
	}

	//调摄像头
	function chooseImage(cb,cfg){
		if(cfg == undefined) cfg = {};
		wx.chooseImage({ 
			count : cfg.img_count == undefined ? 9 : cfg.img_count, //9 
			sizeType : cfg.size_type == undefined ? ['original', 'compressed'] : cfg.size_type, //原图或压缩 
			sourceType : cfg.source_type == undefined ? ['album', 'camera'] : cfg.source_type, //可以指定来源是相册还是相机 
			success : function (res) { 
				cb(res);
			} 
		});
	} 

	//上传图片
	function uploadImage(cb,cfg){
		if(cfg == undefined) return;
		wx.uploadImage({ 
			localId: cfg.localId, //需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) { 
				cb(res);
			}
		});
	}

	//下载图片 
	function downloadImage(cb,cfg){
		if(cfg == undefined) return;
		wx.downloadImage({ 
			serverId: cfg.serverId, //需要下载的图片的服务器端ID，由uploadImage接口获得
			isShowProgressTips: 1, //默认为1，显示进度提示
			success: function (res) { 
				cb(res); 
			} 
		});
	}

	function scanQRCode(cb){
		wx.scanQRCode({
		    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
		    success: function (res) {
			    cb(res.resultStr);
		    }
		});
	}

	return { init : init, onMenuShareAppMessage : onMenuShareAppMessage, onMenuShareTimeline : onMenuShareTimeline, onMenuShareQQ : onMenuShareQQ, onMenuShareQQ : onMenuShareQQ, onMenuShareQZone : onMenuShareQZone, chooseImage : chooseImage, uploadImage : uploadImage, downloadImage : downloadImage, scanQRCode : scanQRCode};
})();
