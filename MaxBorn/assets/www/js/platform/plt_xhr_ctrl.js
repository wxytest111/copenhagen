var plt_xhr_ctrl = (function(){
	var api_site = "./";
	//var api_site = "http://baopeng.yanyu2015.com/";

	function send(url,cb_suc,cb_err,dat){
		$.ajax({
			type : dat == undefined ? "get" : "post",
			//url : "foo.php?c=" + encodeURIComponent(api_site + url),
			url : api_site + url,
			dataType : "json",
			contentType : dat == undefined ? "" : "application/json",
			data : dat == undefined ? "" : dat,
			success : function(json){		
				surccresult(cb_suc,json)
			},
			error : function(json){
				errorresult(cb_err,json);
			}
		});
	}
	
	function sendPost(url,cb_suc,dat){
		if(dat == undefined){
			$.post(api_site + url,function(json){
				surccresult(cb_suc,json)
			});
		}else{
			$.post(api_site + url,dat,function(json){
				surccresult(cb_suc,json)
			});
		}
		
	}
	function send2(url,cb_suc,cb_err,dat){
		$.ajax({
			type : "post",
			url : api_site + url,
			data : dat,
			success : function(json){		
				surccresult(cb_suc,json)
			},
			error : function(json){
				errorresult(cb_err,json);
			}
		});
	}
	function surccresult(cb_suc,json){
		if(json.code == 0){
			cb_suc(json);
		}else if(json.code == 400){	
			if(cb_err == undefined){
				plt_router_ctrl.jump(17,"error/" + JSON.stringify(json.message) + "/R/");
			}else{
				cb_err(json);
			}
		}else if(json.code == 302){
			plt_router_ctrl.jump(17,json.data);
		}else if(json.code == 305){
			plt_router_ctrl.jump(8,"reg/");
		}
	}
	function errorresult(cb_err,json){
		if(cb_err == undefined){
			plt_router_ctrl.jump(17,"error/" + JSON.stringify(json) + "/R/");
		}else{
			cb_err(json);
		}
	}
	return { send : send, send2 : send2,sendPost : sendPost};
})();
