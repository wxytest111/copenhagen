var plt_gadget_ctrl = (function(){
	var domain = "http://192.168.1.120/workspace/baopeng/";
	//var domain = "http://wap.seeker-online.com/";

	//静态资源
	var res_path = "./res/"; 
	var oss_res_path = "";//"http://seeker-res.oss-cn-shanghai.aliyuncs.com/"; 
	var img_path = "http://bo-pal.com/";
	
	var isLogin = false;

	var localStorage = (function(){
		return function(args, ready){
			if(!window.localStorage){
				ready.call(false);
				return;
			}
			var method = args.method;
			if(method == "get"){
				var keys = args.keys;
				var kv = [];
				for(var i=0;i<keys.length;i++){
					kv.push(window.localStorage.getItem(keys[i]));
				}
				ready.call(kv);
			}else if(method == "set"){
				var keys = args.keys;
				var vals = args.vals;
				if(keys.length != vals.length){
					ready.call(false);
				}else{
					for(var i=0;i<keys.length;i++){
						try{
							window.localStorage.setItem(keys[i],vals[i]);
						}catch(_){		
						}
					}
					ready.call(true);
				}
			}else if(method == "remove"){
				var keys = args.keys;
				for(var i=0;i<keys.length;i++){
					window.localStorage.removeItem(keys[i]);
				}
				ready.call(true);
			}else{
				ready.call(false);
			}
		}
	})();

	var isWeixin = (function () {
		return function(args,ready){
			var ua = navigator.userAgent.toLowerCase(); 
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
			} else {
				return false;
			}
		}
	})();

	var isIOS = (function () {
		return function(args,ready){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf("iphone") != -1) {
				return true;
			} else {
				return false;
			}
		}
	})();

	var getPath = (function(){
		return function(args){
			switch(args.target){
				case 'res':
					return oss_res_path == "" ? res_path + args.page_index : oss_res_path;
				case 'img':
					return img_path;
			}
		}
	})();

	return { domain : domain, localStorage : localStorage, isWeixin : isWeixin, isIOS : isIOS, isLogin : isLogin, getPath : getPath };
})();
