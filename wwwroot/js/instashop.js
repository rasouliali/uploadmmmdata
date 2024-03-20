function insgetItem(id , lang){
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ActionController.php?action=insgetitem&lang='+lang+'&id='+id,
		success : function(rtrn){
			$('div#window-product').html(rtrn);
			$('div#window-product').fadeIn(200);
		}
		
	});
	
}