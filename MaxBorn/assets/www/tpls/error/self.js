(function(){
	function init(){
		$("#tpl_error").css("height",document.body.clientHeight);
		
		var hash = window.location.hash.replace("#/","");
		hash = hash.split("/");
		if(hash[1] != undefined) $(".tpl_error_lab2").html(decodeURIComponent(hash[1]));
		else $(".tpl_error_lab2").hide();
	
		if(hash[2] != undefined){
			$("#tpl_error").click(function(){
				plt_router_ctrl.jump(8,"splash");
				return;
				if(hash[2] != "R"){
					var url = "";
					for(var i=2;i<hash.length;i++){
						if(hash[i] == "") break;
						url += hash[i] + "/";
					}
					plt_router_ctrl.jump(17, url);
				}else{	
					if($(".tpl_error_lab2").html().indexOf("readyState") != -1){
						history.back();
					}else{
						plt_router_ctrl.jump(8,"splash",1);
					}
				}
			});
		}else{
			plt_router_ctrl.jump(8,"splash",1);
		} 

		$.hideLoading();
		$("#tpl_error").fadeIn();
	}

	init();
})(); 
