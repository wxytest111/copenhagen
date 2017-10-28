var plt_router_ctrl = (function(){
	var __def_page = {
		  error : { url : "error/message/return_url", bar : 0 },
        	 splash : { url : "splash", bar : 1 },
    		catalog : { url : "catalog", bar : 2 },
    		   cart : { url : "cart", bar : 3 },
         	   mine : { url : "mine", bar : 4 }, 
            product_det : { url : "product_det/p_id", bar : 0 },
    		address : { url : "address", bar : 0 },
  	    address_add : { url : "address_add/target_id", bar : 0 },
                  order : { url : "order/type", bar : 0 },
    	   order_create : { url : "order_create", bar : 0 },
    	      order_det : { url : "order_det/order_id", bar : 0 },
    	     order_paid : { url : "order_paid/tran_id", bar : 0 },
    		     me : { url : "me", bar : 0 },
     		    reg : { url : "reg", bar : 0 },
   		   info : { url : "info", bar : 0 },
    		 coupon : { url : "coupon/type", bar : 0 },
             coupon_det : { url : "coupon_det/c_id", bar : 0 },
               scan_pay : { url : "scan_pay", bar : 0 }
	};

	var __history_stack = [];
	var __animate_type = 1;
	var __refresh = false;

	function route(path){
		var arr = path.split("/");
		for(var i=0;i<arr.length;){
			$.trim(arr[i]) == "" ? arr.splice(i,1) : i++;
		}
		if(arr.length == 0){
			return "splash";
		}else{
			var t = arr[0];
			if(__def_page[t] == undefined){
				jump(17, "error/404 Not Found/splash/");
				return "";
			}else{
				if(__def_page[t].url.split("/").length > arr.length){
					jump(17, "error/Missing Parameter/splash/");
					return "";
				}else{
					$("#pt-bar").trigger("showBar", __def_page[t].bar);
					return t;
				}
			}
		}
	}

	function add_tail(path){
		//if(path[path.length - 1] != "/") path += "/";
		return path;
	}

	function init(path){
		path = add_tail(path);
		__history_stack.push(path);
		var target = route(path);
		//$.showLoading();
		$(".pt-page-1").load("tpls/" + target + "/self.html",function(){
			document.body.scrollTop = 0;
			$.getScript("tpls/" + target + "/self.js");
		});
	}

	function jump(ani, path, r){
		if(path == ""){
			path = "splash/";
		}else if(path == "splash"){
			path = "splash/";
		}
		//path = add_tail(path);

		__animate_type = ani;
		if(r != undefined) __refresh = true;
		window.location.href = "#/" + path;
	}

	window.onhashchange = function(){
		$("*").blur();
		$(".pt-popup").fadeOut(function(){
			$(this).remove();
		});

		if(plt_gadget_ctrl.interval != undefined || plt_gadget_ctrl.interval != null){
			clearInterval(plt_gadget_ctrl.interval);	
		}

		var path = window.location.hash.replace("#/","");
		if(path == "") path = "splash/";
		path = add_tail(path);
		var target = route(path);
		if(target == "") return;

		var i = 0, find = false;
		for(i = __history_stack.length-1;i>=0;i--){
			if(__history_stack[i] == path){
				find = true;
				break;
			}
		}
		if(!find){
			path = add_tail(path);
			__history_stack.push(path);
			$.showLoading();
			plt_animate_ctrl.nextPage( __animate_type , function( page_container_cursor ){
				if(__refresh) window.location.reload();
				$(".pt-page-" + (page_container_cursor + 1)).load("tpls/" + target + "/self.html",function(){
					document.body.scrollTop = 0;
					$.getScript("tpls/" + target + "/self.js",function(){
						$(".pt-page-" + page_container_cursor).fadeOut();
					});
				});
			});
		}else{
			var lv = __history_stack.length - i - 1;
			i = lv;
			while(i-- != 0) {
				__history_stack.pop();
			}	
			$.showLoading();
			plt_animate_ctrl.previousPage( 14 , lv, function(){
				if(__refresh) window.location.reload();
				//回退的时候如果页面实现了refresh方法的话则调用
				path = path.split("/");
				$("#tpl_" + path[0]).trigger("refresh");
				setTimeout(function(){
					$.hideLoading();
				},500);
			});
		}
	}


	return { init : init, jump : jump};
})();
