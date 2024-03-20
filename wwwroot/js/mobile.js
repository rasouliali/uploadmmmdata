
function newMenuWindowOpen(){
	
	$('div#new-mobile-window').animate({
	'right': '0px'
	},150);	
	
	$('a#newMenuWindowOpenActive').hide();
	$('a#newMenuWindowOpenPasive').show();
	
	$('div#new-mobile-account-drop').animate({
	'right': '-70%'
	},150);	
	
	$('div.new-mobile-window-fix').fadeIn(0);
	
	Up();
}



function newMenuWindowClose(){
	//$('div#new-mobile-window').slideToggle(500);
	
	$('div#new-mobile-window').animate({
	'right': '-70%'
	},150);	
	
	$('a#newMenuWindowOpenPasive').hide();
	$('a#newMenuWindowOpenActive').show();
	
	$('div.new-mobile-window-fix').fadeOut(0);
	
	
}

function newMenuAccountOpen(){
	
	$('div#new-mobile-account-drop').show(0);
	
	$('div#new-mobile-account-drop').animate({
	'right': '0px'
	},150);	
	
	$('a#newMenuAccountOpenActive').hide();
	$('a#newMenuAccountOpenPasive').show();
	
	$('div#new-mobile-window').animate({
	'right': '-70%'
	},150);
	
	$('div.new-mobile-account-fix').fadeIn(0);
	
	Up();
	
}

function newMenuAccountClose(){
	
	$('div#new-mobile-account-drop').animate({
	'right': '-70%'
	},150);	
	
	$('a#newMenuAccountOpenPasive').hide();
	$('a#newMenuAccountOpenActive').show();
	$('div#new-mobile-account-drop').hide(50);
	$('div.new-mobile-account-fix').fadeOut(0);
}

function newMenuFiltreOpen(){
	
	$('div.urunler-left').animate({
	'left': '0px'
	},150);	
	
	$('a#newMenuFiltreOpenActive').hide();
	$('a#newMenuFiltreOpenPasive').show();
	
}

function newMenuFiltreClose(){
	
	$('div.urunler-left').animate({
	'left': '-85%'
	},150);	
	
	$('a#newMenuFiltreOpenPasive').hide();
	$('a#newMenuFiltreOpenActive').show();	
}

function newMenuSearchOpen(){
	
	$('div#header-search').slideToggle(100);
	
	Up();
	
}

/*
function NewMenuCategoryMobileSub(id , lang){
	$('div#new-mobile-window-line_'+id).slideToggle(0);
}
*/


function NewMenuCategoryMobileSub(id , lang){

	//$.ajax({
	//	type:'GET',
	//	url:'../../controller/ActionController.php?action=mobilesubcategory&id='+id+'&lang='+lang,
	//	success : function(rtrn){
			//alert(rtrn);
			//$('div#new-mobile-window-line_'+id).html(rtrn);
			$('div#new-mobile-window-line_'+id).slideToggle(0);
	//	}
	//});
}

function NewMenuPagesMobileSub(id , lang){
	$('div#new-mobile-window-pages-line_'+id).slideToggle(0);
}