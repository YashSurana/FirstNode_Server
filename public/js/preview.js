
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
$(document).ready(function(){
	myvar = getURLParameter('Page');
	console.log(myvar);
	$.ajax({ 
	type:"GET",
	url:"http://10.13.69.39:9003/ups-mongo-service/resource/retailer/"+myvar,
	crossDomain : false,
	complete: function( data ){
		var jsondata=JSON.parse(data.responseText);
		console.log(jsondata.promotionHtml);
		var styleNode = document.createElement('style');
		styleNode.type = "text/css";
		head = document.head || document.getElementsByTagName('head')[0];
		$('header').html(decodeURIComponent(escape(window.atob(jsondata.headerHtml))));
		$('aside').html(decodeURIComponent(escape(window.atob(jsondata.promotionHtml))));
		$('footer').html(decodeURIComponent(escape(window.atob(jsondata.footerHtml))));
		var styleText = document.createTextNode(decodeURIComponent(escape(window.atob(jsondata.css))));
		styleNode.appendChild(styleText);
		 document.getElementsByTagName('head')[0].appendChild(styleNode);
		},
	contentType: "application/json"
	});
});