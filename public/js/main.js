var openFile = function(event,txtout,assetID,fileID) {
        var input = event.target;
	$(assetID).val($(fileID).val());
        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
         $(txtout).val(text);
        };
        reader.readAsText(input.files[0]);
      };
$(document).ready(function () {
      
	});
    function retailer(a){
	if($(a).val() =='yes'){
		$('#ryes').addClass('hide');
		$('#rno').removeClass('hide');
		 $.ajax({ 
	type:"GET",
	url:"/retailer",
	crossDomain : false,
	complete: function( data ){
		var jsondata=JSON.parse(data.responseText);
		console.log(jsondata.length);
		$.each(jsondata, function( key, val ) {
		console.log('this i working');
		$('select[name="retname"]').append('<option value="'+val.id+'">'+val.name+'</option>');
		});},
	contentType: "application/json"
	});
	}
	else{
		$('#rno').addClass('hide');
		$('#ryes').removeClass('hide');
	}
    }
    
    function preview(){
	var retname=$('select[name="retname"] option:selected').val();
	window.location.href="preview.html?Page="+retname;
}
function ret_save(){
	var d_headerHtml=$('#header-html').val();
	var d_footerHtml=$('#footer-html').val();
	var d_promotionHtml=$('#promo-html').val();
	var d_css=$('#page-css').val();
	var name=$('#rName').val();
	var headerHtml = window.btoa(unescape(encodeURIComponent((d_headerHtml)))); // encode a string
	var footerHtml = window.btoa(unescape(encodeURIComponent((d_footerHtml))));
	var promotionHtml = window.btoa(unescape(encodeURIComponent((d_promotionHtml))));
	var css = window.btoa(unescape(encodeURIComponent((d_css))));
	
	var data1 = { name : name ,headerHtml: headerHtml, footerHtml: footerHtml , promotionHtml : promotionHtml, css: css};
	var retname=$('select[name="retname"] option:selected').val();
	if( retname != 'default'){
		data1.id =retname; 
	}
	console.log(data1);
	$.ajax({ 
	type:"POST",
	url:"/retailer/add",
	data: JSON.stringify(data1),
	dataType: "text",
	success:function(data) {
	var jsondata=data;
	console.log('hi'+jsondata);
	console.log(data.indexOf('success'));
		if(data.resText.indexOf('success'))
		{		
			console.log(data.responseText );
			$('#divmsg').removeClass('hide').html('Record Saved');
			$('#header-html').val("");
			$('#footer-html').val("");
			$('#promo-html').val("");
			$('#page-css').val("");
			$('select[name="retname"]').val('default');
		}
		else{
			
			$('#divmsg').html('Some Error occured');
		}
	},
	contentType: "application/json"
	
	});
	
	//var decodedData = window.atob(encodedData); // decode the string
}
function getRetailerData(Id){
	var retId=$(Id).val();
	$.ajax({ 
	type:"GET",
	url:"http://10.13.69.39:9003/ups-mongo-service/resource/retailer/"+retId,
	crossDomain : false,
	complete: function( data ){
		var jsondata=JSON.parse(data.responseText);
		console.log(jsondata.promotionHtml);
		$('#header-html').val(decodeURIComponent(escape(window.atob(jsondata.headerHtml))));
		$('#promo-html').val(decodeURIComponent(escape(window.atob(jsondata.promotionHtml))));
		$('#footer-html').val(decodeURIComponent(escape(window.atob(jsondata.footerHtml))));
		$('#page-css').val(decodeURIComponent(escape(window.atob(jsondata.css))));
		},
	contentType: "application/json"
	});
}
 