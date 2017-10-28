var index_ctrl = (function() {
	$.ajaxSetup({
		cache : false 
	});

	function init(){
		$("*").on("touchmove",function(e){
			e.preventDefault();
		});

		FastClick.attach(document.body);

		$.showLoading();
	
		var hash = window.location.hash.replace("#/","");
		if(hash == "") hash = "splash/";
		plt_router_ctrl.init(hash);
	}

	init();

	return {};
})();

(function(doc, win){
	var docEI = doc.documentElement;
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function(){
	var clientWidth = docEI.clientWidth;
	if(!clientWidth) return;
	if(clientWidth > 750){
		docEI.style.fontSize = '100px';
	}else{
		docEI.style.fontSize =  100 * (clientWidth / 750) + 'px';
	}
	};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
