/**
 * url过滤器
 */
content.filter("trustUrl", ['$sce', function ($sce) { 
	return function (recordingUrl) { 
		return $sce.trustAsResourceUrl(recordingUrl); 
	}; 
}]);



/*停止全部媒体播放*/
function stopAllMedia(){
	$('.loading').each(function(){
		var media = $(this)[0];
		console.log(media);
		
		media.load();
	})
	$('.play_ico').show();
	$('.bg-img').removeClass('bottom');
}

/*function newBaiScript(){
	cancelScript();
	setTimeout(function(){
		window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};
		var oHead = document.getElementsByTagName('HEAD').item(0); 
		var oScript= document.createElement("script"); 
		oScript.type = "text/javascript"; 
		oScript.setAttribute("newScript", true); 
		oScript.src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion="+~(-new Date()/36e5); 
		oHead.appendChild(oScript); 
	},1000)
}
function cancelScript(){
	$('head').find('script').each(function(){
		if($(this).attr('newScript')){
			$(this).remove();
		}
	});
}*/