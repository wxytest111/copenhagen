(function(){
	var res_path = plt_gadget_ctrl.getPath({"target" : "res", "page_index" : "tpls/splash/"});
	var path = plt_gadget_ctrl.getPath({"target" : "img"});

	var scroller = null;

	// function create_node(dat){
	// 	var node = $(".tmp_tpl_splash_node").clone().removeClass("tmp_tpl_splash_node").show();
	// 	node.off("tap").on("tap",function(){
	// 		plt_router_ctrl.jump(8,"product_det/" + $(this).data("p_id"));
	// 	});
	// 	return node;
	// }

	function send_request(callback){
		callback();
	}

	function initTableData(){

	}

	function init(){
		$("#tpl_splash").css("min-height",document.body.clientHeight);
		$("#tpl_splash .scroller").css("min-height",document.body.clientHeight + 1);

		scroller = new IScroll("#tpl_splash",{ 
			mouseWheel: true,
			 tap : true,
			 probeType : 2
		});
		initTableData();
		send_request(function(){
			$.hideLoading();
			$("#tpl_splash").css("visibility","visible");
			setTimeout(function(){
				scroller.refresh();
			},0);
		});
	}

	init();
})();
