function ProductsVitrin(lang){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=productsvitrin&lang='+lang,
success : function(rtrn){

$('div#products-index-box').html(rtrn);
$('div#products-index-box').fadeIn(200);

}

});

}

function ProductsMostSales(lang){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=productsmostsales&lang='+lang,
success : function(rtrn){

$('div#products-index-box').html(rtrn);
$('div#products-index-box').fadeIn(200);

}

});

}

function SubCategoriesOpen(id , lang){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=productssubcategories&id='+id+'&lang='+lang,
success : function(rtrn){

$('div#products-left-box-sub'+id).html(rtrn);
$('div#products-left-box-sub'+id).slideToggle(110);

}

});

}

function TaksitSecenekleri(id , price , lang){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=taksitsecenekleri&id='+id+'&price='+price+'&lang='+lang,
success : function(rtrn){

$('div#window').html(rtrn);
$('div#window').fadeIn(200);

}

});

}


function getBank(id,total){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=getbank&id='+id+'&total='+total,
success : function(rtrn){

$('div#bankDetail').html(rtrn);
$('div#bankDetail').fadeIn(200);

}

});

}


function prComment(id,lang){
	
	$("div#loading_comment").show(0);
	$("input#button_comment").hide(0);
				
	$.ajax({
	
	type:'POST',
	url:'../../controller/ProductsController.php?action=prcomment&id='+id+'&lang='+lang,
	data:$('#prcommentform').serialize(),
	success : function(rtrn){
	
	//alert(rtrn);
	
	rtrn = JSON.parse(rtrn);
			
			
			/*
			var error = rtrn.Message;
				document.getElementById('errormsg').innerHTML = error;
				$('#error').fadeIn(100);
				$("div#loading_comment").hide(0);
				$("input#button_comment").show(0);
				*/
				
		if(rtrn.Status!='ok'){

		var error = rtrn.Message;
		document.getElementById('errormsg').innerHTML = error;
		$('#error').fadeIn(100);
		$("div#loading_comment").hide(0);
		$("input#button_comment").show(0);

		}
		
		if(rtrn.Status=='ok'){
		var error = rtrn.Message;
		document.getElementById('successmsg').innerHTML = error;
		//$('#success').fadeIn(100);
		$("div#loading_comment").hide(0);
		$("input#button_comment").show(0);
		$("div#commentsuccess").fadeIn(0);
		}
				
		
	}
	
	});
	
	}
	
	function star(id , star){
	
	$.ajax({
	
	type:'GET',
	url:'../../controller/ActionController.php?action=prstar&id='+id+'&star='+star,
	success : function(rtrn){
	
	alert(rtrn);
	
	if(rtrn=='ex2'){
	var error = 'Bu ürün için daha önce oy kullanmıştınız. İlginiz için teşekkür ederiz.';
	document.getElementById('errormsg').innerHTML = error;
	$('#error').fadeIn(100);
	}
	
	if(rtrn=='ex3'){
	var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse lütfen bizimle irtibata geçiniz.';
	document.getElementById('errormsg').innerHTML = error;
	$('#error').fadeIn(100);
	}
	
	if(rtrn=='ok'){
	var error = 'Ürünü oyladığınız için teşekkür ederiz.';
	document.getElementById('errormsg').innerHTML = error;
	$('#error').fadeIn(100);
	}
	
	}
	
	});
	
	}
	
function FavorilerimeEkle(id, lang,elem) {
	var isFav = $(elem).find('span').attr("class") == "isfav";
	$(elem).find("span").removeClass(isFav ? "isfav" : "isNotFav");
	$(elem).find("span").addClass(isFav ? "isNotFav" : "isfav");
	isFav = !isFav;
	$(elem).find("span").html(isFav ? "Favorilerime Ekle" :  "Favorilerime kaldır");
	$.ajax({
	
	type:'POST',
		url:'/ToggleFavorite?productId='+id,
		success: function (rtrn) {
			//alert(rtrn);
	
			//rtrn = JSON.parse(rtrn);

			if (rtrn.status == 'ex1') {
				window.location.href = "/login?returnUrl=" + window.location.pathname;
				return;
			}
			if(rtrn.status!='ok'){

				//var error = rtrn.Message;
				document.getElementById('errormsg').innerHTML = "Error";//error;
				$('#error').fadeIn(100);
				$("div#loading").hide(0);
				$("input#button").show(0);

			}
		
			if(rtrn.status=='ok'){
			//var error = rtrn.Message;
				document.getElementById('successmsg').innerHTML = "İsteğiniz başarıyla tamamlandı!";
			$('#success').fadeIn(100);
			$("div#loading").hide(0);
			$("input#button").show(0);
			}

		}
	
	});
	
	}
	
	function FavoriKaldir(product , lang){
		
		$('div#sortingloading').fadeIn(400);
		
		$.ajax({
			
			type:'GET',
			url:'../../controller/ActionController.php?action=deletefavori&product='+product+'&lang='+lang,
			success : function(rtrn){
				
				rtrn = JSON.parse(rtrn);
				if(rtrn.Status!='ok'){

				var error = rtrn.Message;
				document.getElementById('errormsg').innerHTML = error;
				$('#error').fadeIn(100);
				$("div#loading").hide(0);
				$("input#button").show(0);

				}
				
				if(rtrn.Status=='ok'){
				var error = rtrn.Message;
				document.getElementById('successmsg').innerHTML = error;
				$('div#sortingloading').hide(0);
				$('div#favori'+product).slideUp(50);
				}
				
			}
			
		});
		
	}
	
function productnews_(lang , id , Page_){

$('div#sortingloading').fadeIn(400);

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=productnews&id='+id+'&lang='+lang,
success : function(rtrn){

$('div#window-news').html(rtrn);
$('div#window-news').fadeIn(200);
$('div#sortingloading').fadeOut(0);

}

});

}

function ProductNewsForm(lang , id , Page_){

$('div#sortingloading').fadeIn(400);

$.ajax({

type:'POST',
url:'../../controller/ActionController.php?action=productnews&id='+id+'&lang='+lang,
data:$('#ProductNewsForm').serialize(),
success : function(rtrn){

//alert(rtrn);

rtrn = JSON.parse(rtrn);

if(rtrn.Status!='ok'){

		var error = rtrn.Message;
		document.getElementById('errormsg').innerHTML = error;
		$('#error').fadeIn(100);
		$('div#sortingloading').hide(0);


		}
		
		if(rtrn.Status=='ok'){
		var error = rtrn.Message;
		document.getElementById('successmsg').innerHTML = error;
		$('#success').fadeIn(100);
		$('div#sortingloading').hide(0);
		}

}

});

}
	
function paging(catid,lastid,lastprice,listType,lang,q){
   
   $.ajax({
   
   type:'GET',
   url:'../../controller/ProductsController.php?action=paging&catid='+catid+'&lastid='+lastid+'&lastprice='+lastprice+'&listtype='+listType+'&lang='+lang+'&q='+q,
   success : function(rtrn){
   
   //alert(rtrn);
   
   $('a#loadpaging'+lastid).fadeOut(0);
   $('div#loadpaging'+lastid).html(rtrn);
   $('div#loadpaging'+lastid).fadeIn(200);
   
   }
   
   });
	
	}
	
function BedenTablosu(id){

$.ajax({

type:'GET',
url:'../../controller/ProductsController.php?action=bedentablosu&id='+id,
success : function(rtrn){

$('div#window').html(rtrn);
$('div#window').fadeIn(200);

}

});

}

function Yorumlar(){
		$('div#yorumlar').fadeIn(0);
		$('html, body').animate({
        scrollTop: $("#yorumlar").offset().top
    }, 700);
		ProductTabsComments();
	}
	
function Yorumlar_bs(){
		$('span#yorumlar').fadeIn(0);
		$('html, body').animate({
        scrollTop: $("span#yorumlar").offset().top
    }, 700);
		
	}
	
	
function VitrinCokSatanlar(lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=vitrincoksatanlar&lang='+lang,
		success : function(rtrn){
			
			$('div#Vitrin').html(rtrn);
			$('div#Vitrin').fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("vitrincoksatanlar").style.background = "#f27a1a";
			document.getElementById("vitrinenyeniler").style.background = "#4c464f";
			document.getElementById("vitrinindirimdekiler").style.background = "#4c464f";
		}
		
		
	});
}

function VitrinIndirimdekiler(lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=vitrinindirimdekiler&lang='+lang,
		success : function(rtrn){
			
			$('div#Vitrin').html(rtrn);
			$('div#Vitrin').fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("vitrinindirimdekiler").style.background = "#f27a1a";
			document.getElementById("vitrinenyeniler").style.background = "#4c464f";
			document.getElementById("vitrincoksatanlar").style.background = "#4c464f";
		}
		
		
	});
}

function VitrinEnYeniler(lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=vitrinenyeniler&lang='+lang,
		success : function(rtrn){
			
			$('div#Vitrin').html(rtrn);
			$('div#Vitrin').fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("vitrinenyeniler").style.background = "#f27a1a";
			document.getElementById("vitrinindirimdekiler").style.background = "#4c464f";
			document.getElementById("vitrincoksatanlar").style.background = "#4c464f";
		}
		
		
	});
}
	
function KategoriCokSatanlar(id , lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=kategoricoksatanlar&id='+id+'&lang='+lang,
		success : function(rtrn){
			
			$('div#Kategori'+id).html(rtrn);
			$('div#Kategori'+id).fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("kategoricoksatanlar"+id).style.background = "#f27a1a";
			document.getElementById("kategoriindirimdekiler"+id).style.background = "#4c464f";
			document.getElementById("kategorienyeniler"+id).style.background = "#4c464f";
		}
		
		
	});
}

function KategoriIndirimdekiler(id , lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=kategoriindirimdekiler&id='+id+'&lang='+lang,
		success : function(rtrn){
			
			$('div#Kategori'+id).html(rtrn);
			$('div#Kategori'+id).fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("kategoriindirimdekiler"+id).style.background = "#f27a1a";
			document.getElementById("kategoricoksatanlar"+id).style.background = "#4c464f";
			document.getElementById("kategorienyeniler"+id).style.background = "#4c464f";
		}
		
		
	});
}

function KategoriEnYeniler(id , lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=kategorienyeniler&id='+id+'&lang='+lang,
		success : function(rtrn){
			
			$('div#Kategori'+id).html(rtrn);
			$('div#Kategori'+id).fadeIn(0);
			$('div#sortingloading').hide(0);
			document.getElementById("kategorienyeniler"+id).style.background = "#f27a1a";
			document.getElementById("kategoricoksatanlar"+id).style.background = "#f27a1a";
			document.getElementById("kategoriindirimdekiler"+id).style.background = "#f27a1a";
		}
		
		
	});
}

function ProductTabsDetail(PTAB , PTCB , PTTS){
	
	$('div#product-tabs-detail').show(0);
	$('div#product-tabs-detail').show(0);
	$('div#product-tabs-quastion').hide(0);

	if(PTAB==1){
	$('div#product-tabs-attributes').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#eeeff4";
	}
	
	if(PTCB==1){
	$('div#product-tabs-comments').hide(0);	
	document.getElementById("product-tabs-comments-button").style.background = "#eeeff4";
		document.getElementById("product-tabs-quastion-button").style.background = "#eeeff4";
	}
	
	if(PTTS==1){
	$('div#product-tabs-shipping').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#eeeff4";
	}
	
	$('div#product-tabs-installments').hide(0);
	
	
	document.getElementById("product-tabs-detail-button").style.background = "#fff";
	//document.getElementById("product-tabs-installments-button").style.background = "#eeeff4";
	
	
	
	
}

function ProductTabsAttributes(PTAB , PTCB , PTTS){
	
	$('div#product-tabs-attributes').show(0);
	$('div#product-tabs-detail').hide(0);
	
	if(PTCB==1){
	$('div#product-tabs-comments').hide(0);	
	document.getElementById("product-tabs-comments-button").style.background = "#eeeff4";
	}
	
	if(PTTS==1){
	$('div#product-tabs-shipping').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#eeeff4";
	}
	
	$('div#product-tabs-installments').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#fff";
	document.getElementById("product-tabs-detail-button").style.background = "#eeeff4";
	//document.getElementById("product-tabs-installments-button").style.background = "#eeeff4";
	
}

function ProductTabsComments(PTAB , PTCB , PTTS){
	
	$('div#product-tabs-comments').show(0);
	$('div#product-tabs-detail').hide(0);
	$('div#product-tabs-quastion').hide(0);

	if(PTAB==1){
	$('div#product-tabs-attributes').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#eeeff4";
	}
	
	if(PTTS==1){
	$('div#product-tabs-shipping').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#eeeff4";
	}

	document.getElementById("product-tabs-quastion-button").style.background = "#eeeff4";
	$('div#product-tabs-installments').hide(0);
	document.getElementById("product-tabs-comments-button").style.background = "#fff";
	//document.getElementById("product-tabs-installments-button").style.background = "#eeeff4";
	document.getElementById("product-tabs-detail-button").style.background = "#eeeff4";
	
}

function ProductTabsQuastion(PTAB , PTCB , PTTS){
	
	$('div#product-tabs-comments').hide(0);
	$('div#product-tabs-quastion').show(0);
	$('div#product-tabs-detail').hide(0);
	
	if(PTAB==1){
	$('div#product-tabs-attributes').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#eeeff4";
	}
	document.getElementById("product-tabs-quastion-button").style.background = "#fff";
	
	if(PTTS==1){
	$('div#product-tabs-shipping').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#eeeff4";
	}
	
	document.getElementById("product-tabs-comments-button").style.background = "#eeeff4";
	//document.getElementById("product-tabs-installments-button").style.background = "#eeeff4";
	document.getElementById("product-tabs-detail-button").style.background = "#eeeff4";
	
}

function ProductTabsInstallments(PTAB , PTCB , PTTS , id){
	
	$.ajax({
		
		type:'GET',
		url:'../../controller/ProductsController.php?action=getproductinstallment&id='+id,
		success : function(rtrn){
			$('div#product-tabs-installments').html(rtrn);
			$('div#product-tabs-installments').fadeIn(200);
		}
		
	});
	
	
	$('div#product-tabs-detail').hide(0);

	if(PTAB==1){
	$('div#product-tabs-attributes').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#eeeff4";
	}
	
	if(PTCB==1){
	$('div#product-tabs-comments').hide(0);	
	document.getElementById("product-tabs-comments-button").style.background = "#eeeff4";
	}
	
	if(PTTS==1){
	$('div#product-tabs-shipping').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#eeeff4";
	}
	
	//document.getElementById("product-tabs-installments-button").style.background = "#fff";
	document.getElementById("product-tabs-detail-button").style.background = "#eeeff4";

}	

function ProductTabsShippingInfo(PTAB , PTCB , PTTS){
	
	$('div#product-tabs-shipping').show(0);
	$('div#product-tabs-detail').hide(0);

	if(PTAB==1){
	$('div#product-tabs-attributes').hide(0);
	document.getElementById("product-tabs-attributes-button").style.background = "#eeeff4";
	}
	
	if(PTCB==1){
	$('div#product-tabs-comments').hide(0);	
	document.getElementById("product-tabs-comments-button").style.background = "#eeeff4";
	}
	
	$('div#product-tabs-installments').hide(0);
	document.getElementById("product-tabs-shipping-button").style.background = "#fff";
	//document.getElementById("product-tabs-installments-button").style.background = "#eeeff4";
	document.getElementById("product-tabs-detail-button").style.background = "#eeeff4";

}

function dynamicSearchDelay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

		
		$('#header-search-input').keyup(dynamicSearchDelay(function (e) {
			
			val = this.value;
			lang = this.lang;
			
			if(val.length>=3){

				$('div#sortingloading').fadeIn(400);
				$.ajax({

				type:'GET',
				url:'../../controller/ProductsController.php?action=dynamicSearch&q='+val+'&lang='+lang,
				success : function(rtrn){
				//alert(rtrn);
				$('div.dynamicSearchResult').html(rtrn);
				$('div.dynamicSearchResult').fadeIn(0);
				$('div.dynamicSearchResultWindow').fadeIn(0);
				$('div#sortingloading').fadeOut(0);

				}

				});
			}else{
				dynamicSearchClose();
			}
			
		}, 1000));
		
	



function dynamicSearchClose(){
	$('div.dynamicSearchResult').fadeOut(0);
	$('div.dynamicSearchResultWindow').fadeOut(0);
}
	
function Mobile_ProductInfo_V4(Str){

$('div#urun-bilgisi').hide();
$('div#teslimat').hide();
$('div#iade-degisim').hide();
$('div#yorumlar').hide();

$('div#'+Str).fadeIn(100);
$("html, body").animate({ scrollTop: $('#mobile-to-bottom').offset().top }, 500);

}



