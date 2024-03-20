function AllCategories(){
	$('div#nav-menu-content-box').slideToggle(10);
}

function AllCategories_Bs(){
	$('div.content-menu-left-top-all-categories-drop').slideToggle(10);
}

function PopupAction(pagename , popupid){
//$.ajax({
//type:'GET',
//url:'../../controller/ActionController.php?action=popupaction&pagename='+pagename+'&id='+popupid,
//success : function(rtrn){
//$('div#popup').html(rtrn);
//$('div#popup').fadeIn(200);
//}
//});
}
function ShoppingQuantityFromCookie() {
	//$.ajax({
	//	type: 'GET',
	//	url: '../../controller/ActionController.php?action=shoppingquantity',
	//	success: function (rtrn) {

	//		rtrn = JSON.parse(rtrn);
	//		$('span#shoppingquantity').html(rtrn.ShoppingQuantity);
	//		$('span#shoppingquantity').fadeIn(200);
	//		ShoppingTime(rtrn.ShoppingTime);
	//		function ShoppingTime(ShoppingTime) {
	//			$('span#shoppingtime').html(ShoppingTime);
	//			$('span#shoppingtime').fadeIn(200);
	//		}
	//	}
	//});
	if (document.cookie.indexOf(' sepet=') > 0) {
		var sebet = document.cookie.substring(document.cookie.indexOf('sepet') + 6);

		sebet = sebet.substring(0, sebet.indexOf(';'))
		sebet = decodeURI(sebet).split('%3A').join(':').split('%2C').join(',');
		sebet = JSON.parse(sebet);
		ShoppingQuantity(sebet);
	} else
		$.get("/Home/GetNow?id=0&lang=tr&adet=0", '', function (dataRes) {
			ShoppingQuantity(JSON.parse(dataRes.card));
		});
}
function ShoppingQuantity(data) {
	if (data == undefined) {
		//ShoppingQuantityFromCookie();
		return;
	}
	var quantity = 0;
		for (var i = 0; i < data.length; i++) {
			quantity += data[i].Count;
		}
	$('span#shoppingquantity').html(quantity);
	$('span#shoppingquantity').fadeIn(200);

	//$.ajax({
	//	type: 'GET',
	//	url: '../../controller/ActionController.php?action=shoppingquantity',
	//	success: function (rtrn) {

	//		rtrn = JSON.parse(rtrn);
	//		$('span#shoppingquantity').html(rtrn.ShoppingQuantity);
	//		$('span#shoppingquantity').fadeIn(200);
	//		ShoppingTime(rtrn.ShoppingTime);
	//		function ShoppingTime(ShoppingTime) {
	//			$('span#shoppingtime').html(ShoppingTime);
	//			$('span#shoppingtime').fadeIn(200);
	//		}
	//	}
	//});
}
function alogin(){
$("div#loading").show(0);
$("input#button").hide(0);
$.ajax({
type:"POST",
url:"controller/ActionController.php?action=alogin",
data:$("#loginform").serialize(),
success : function(login_c){
if(login_c=='notfound_function'){
alert("İşlem fonksiyonu çağrılamadı! Sistem yöneticisi ile irtibata geçiniz.");
$("div#loading").hide(0);
$("input#button").show(0);
}
if(login_c=="ex1"){
alert("Zaten login olmuşsunuz ! Kontrol paneline yönlendirileceksiniz !");
window.top.location.href="panel/index.php";
$("div#loading").hide(0);
$("input#button").show(0);
}
if(login_c=="ex2"){
alert("Lütfen e-posta adresi ve poralayı boş bırakmayınız");
$("div#loading").hide(0);
$("input#button").show(0);
}
if(login_c=="ex3"){
alert("E-Posta veya Parolayı Yanlış girdiniz ! Lütfen tekrar deneyiniz !");
$("div#loading").hide(0);
$("input#button").show(0);
}
if(login_c=="ok"){
window.top.location.href="panel/index.php";
$("div#loading").hide(0);
$("input#button").show(0);
}
}
});
}

function psh(){
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		type:'POST',
		url:'controller/ActionController.php?action=psh',
		data:$('#pshForm').serialize(),
		success : function(rtrn){
			rtrn = JSON.parse(rtrn);

			if(rtrn.Status=='ex2'){
				alert(rtrn.Message);
				$('div#sortingloading').fadeOut(400);
				captchaRefresh();
			}

			if(rtrn.Status=='ok'){
				window.top.location.href=location.href+'?status=ok';
			}
		}
	});
}

function captchaRefresh(){
	document.getElementById('captcha').src = 'securimage/securimage_show.php?' + Math.random();
}

function passMaxLength(val){
	
  var mesaj = document.getElementById("password");
  var karakter = document.getElementById("karakter");

  var karakterSiniri = 16;

  mesaj.onkeyup = karakterKontrol;
  mesaj.onkeydown = karakterKontrol;

  function karakterKontrol() {
    var mesajUzunluk = this.value.length;

    if (karakterSiniri >= mesajUzunluk) {
      var kalan = karakterSiniri - mesajUzunluk;
      karakter.innerHTML = kalan + " karakter kaldı";

    } else {
      this.value = this.value.substr(0, karakterSiniri);
    }
  }
  
}

function pshAction(){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		type:'POST',
		url:'controller/ActionController.php?action=pshaction',
		data:$('#aRememberform').serialize(),
		success : function(rtrn){
			
			//alert(rtrn);
			
			rtrn = JSON.parse(rtrn);

			if(rtrn.Status=='ex2'){
				alert(rtrn.Message);
				$('div#sortingloading').fadeOut(400);
			}

			if(rtrn.Status=='ok'){
				window.top.location.href=location.href+'&status=ok';
			}
		}
	});
}


function Giris(lang){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=login_page&lang='+lang,
success : function(rtrn){
$('div#window').html(rtrn);
$('div#window').fadeIn(200);
}
});
}
function Kayit_Sozlesme(lang , WebPath){
//$.ajax({
//type:'GET',
//url:'../../controller/ActionController.php?action=kayit_sozlesme&lang='+lang,
//success : function(rtrn){
//$('div#window').html(rtrn);
//if(WebPath=='web'){
//$('div#window').fadeIn(100);
//}
//if(WebPath=='mobile'){
//$('div#window').animate({
//'right': '0px'
//},150);
//$('div#window').animate({
//'right': '-10%'
//},40);
//$('div#window').animate({
//'right': '0px'
//},40);
//}
//}
//});
}

function Onay_Buton(lang , id){
	$.ajax({
		type:'GET',
		url:'../../controller/ActionController.php?action=Onay_Buton&lang='+lang+'&id='+id,
		success : function(rtrn){
			$('div#window').html(rtrn);
			$('div#window').fadeIn(100);
		}
		});
}

function uRegister(lang , WebPath){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=uregister&lang='+lang,
data:$('#uRegisterForm').serialize(),
success : function(rtrn){
//alert(rtrn);
rtrn = JSON.parse(rtrn);
if(rtrn.Status!='ok'){
var error = rtrn.Message;
document.getElementById('errormsg').innerHTML = error;
if(WebPath=='web'){
$('#error').fadeIn(100);
}
if(WebPath=='mobile'){
$('div#error').animate({
'right': '0px'
},150);
$('div#error').animate({
'right': '-10%'
},40);
$('div#error').animate({
'right': '0px'
},40);
}
$('div#sortingloading').fadeOut(400);
}
if(rtrn.Status=='ok'){
//window.top.location.href=location.href;
window.top.location.href="../../register_thanks";
}
}
});
}
function uLogin(lang , WebPath){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=ulogin&lang='+lang,
data:$('#LoginForm').serialize(),
success : function(return_c){
return_c = JSON.parse(return_c);
if(return_c.Status!='ok'){
var error = return_c.Message;
document.getElementById('errormsg').innerHTML = error;
if(WebPath=='web'){
$('#error').fadeIn(100);
}
if(WebPath=='mobile'){
$('div#error').animate({
'right': '0px'
},150);
$('div#error').animate({
'right': '-10%'
},40);
$('div#error').animate({
'right': '0px'
},40);
}
$('div#sortingloading').fadeOut(400);
}
if(return_c.Status=='ex1'){
window.top.location.href=location.href;
}
if(return_c.Status=='ok'){
window.top.location.href=return_c.RedirectUrl;
}
}
});
}
function rememberPass(lang , WebPath){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=rememberpass&lang='+lang+'&webpath='+WebPath,
success : function(rtrn){
$('div#window').html(rtrn);
if(WebPath=='web'){
$('div#window').fadeIn(200);
}
if(WebPath=='mobile'){
$('div#window').animate({
'right': '0px'
},150);
$('div#window').animate({
'right': '-10%'
},40);
$('div#window').animate({
'right': '0px'
},40);
}
}
});
}
function uRememberPass(lang , WebPath){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=rememberaction&lang='+lang+'&webpath='+WebPath,
data:$('#rememberForm').serialize(),
success : function(rtrn){
rtrn = JSON.parse(rtrn);
var error = rtrn.Message;
document.getElementById('errormsg').innerHTML = error;
if(WebPath=='web'){
$('#error').fadeIn(100);
}
if(WebPath=='mobile'){
$('div#error').animate({
'right': '0px'
},150);
$('div#error').animate({
'right': '-10%'
},40);
$('div#error').animate({
'right': '0px'
},40);
}
$('div#sortingloading').fadeOut(100);
if(rtrn=='ex1'){
window.top.location.href="../../giris/"+lang;
}
if(rtrn.Status=='ok'){
setTimeout(function(){
window.top.location.href=location.href;
}, 9000);
}
}
});
}
function invite(){
$("div#loading").show(0);
$("input#button").hide(0);
$.ajax({
type:'POST',
url:'../../controller/actioncontrollers.php?page=invite',
data:$('#inviteForm').serialize(),
success : function (rtrn){
if(rtrn=='notfound_function'){
var error = 'İşlem fonksiyonu bulunamadı. Sistem yöneticisi ile irtibata geçiniz.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading").hide(0);
$("input#button").show(0);
}
if(rtrn=='ex1'){
window.top.location.href="../login/giris";
}
if(rtrn=='ex2'){
var error = 'Boş alan bırakmayınız';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading").hide(0);
$("input#button").show(0);
}
if(rtrn=='ex2_1'){
var error = 'Bu hesap sistemde kayıtlı.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading").hide(0);
$("input#button").show(0);
}
if(rtrn=='ex3'){
var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse sistem yöneticisine bildiriniz.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading").hide(0);
$("input#button").show(0);
}
if(rtrn=='ok'){
alert('Davetiniz başaryıla gönderildi. Arkadaşınızı davet ettiğiniz için teşekkür ederiz');
window.top.location.href=location.href;
}
}
});
}
function UpdateAccount(lang){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=updateaccount&lang='+lang,
data:$('#accountUpdateForm').serialize(),
success : function(rtrn){

rtrn = JSON.parse(rtrn);

if(rtrn.Status=='ex2'){
var error = rtrn.Message;
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(400);
}

if(rtrn.Status=='ex1'){
window.top.location.href="../../giris/"+lang;
}
if(rtrn.Status=='ok'){
window.top.location.href=location.href+'&status=ok';
}
}
});
}

function newAdress(lang , pageType , WebPath){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=newadress&lang='+lang,
data:$('#newadressform').serialize(),
success : function(rtrn){
	//alert(rtrn);
rtrn = JSON.parse(rtrn);
if(rtrn.Status=='ex1'){
window.top.location.href='../../giris/'+lang;
}
if(rtrn.Status!='ok' && rtrn.Status!='ex1'){
var error = rtrn.Message;
document.getElementById('errormsg').innerHTML = error;
if(WebPath=='web'){
$('div#error').fadeIn(200);
$('div#sortingloading').fadeOut(300);
}
if(WebPath=='mobile'){
$('div#error').animate({
'right': '0px'
},150);
$('div#error').animate({
'right': '-10%'
},40);
$('div#error').animate({
'right': '0px'
},40);
$('div#sortingloading').fadeOut(300);
}
}
if(rtrn.Status=='ok'){
if(pageType=='adress'){
window.top.location.href='../../index.php?pagename=tadress&lang='+lang;
}else{
window.top.location.href='../../index.php?pagename=payment&system=0&lang='+lang;
}
}
}
});
}
function newAdressForm2(){
$('div#newAdress').slideToggle(100);
}
function myAdressForm(id,lang,WebPath){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=myadressform&id='+id+'&lang='+lang+'&webpath='+WebPath,
success : function(rtrn){
$('#window').html(rtrn);
if(WebPath=='web'){
$('#window').fadeIn(200);
}
if(WebPath=='mobile'){
$('div#window').animate({
'right': '0px'
},150);
$('div#window').animate({
'right': '-10%'
},40);
$('div#window').animate({
'right': '0px'
},40);
}
}
});
}
function AdressUpdateAction(id,lang,WebPath){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=myadressupdateaction&id='+id+'&lang='+lang,
data:$('#AdressUpdateForm').serialize(),
success : function(rtrn){
rtrn = JSON.parse(rtrn);
if(rtrn.Status=='ex1'){
window.top.location.href='../../giris/'+lang;
$('div#sortingloading').fadeOut(300);
}
if(rtrn.Status!='ok' && rtrn.Status!='ex1'){
var error = rtrn.Message;
document.getElementById('errormsg').innerHTML = error;
if(WebPath=='web'){
$('#error').fadeIn(100);
}
if(WebPath=='mobile'){
$('div#error').animate({
'right': '0px'
},150);
$('div#error').animate({
'right': '-10%'
},40);
$('div#error').animate({
'right': '0px'
},40);
}
$('div#sortingloading').fadeOut(300);
}
if(rtrn.Status=='ok'){
window.top.location.href=location.href;
}
}
});
}
function deleteAdress(id){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=deleteadress&id='+id,
success : function(rtrn){
if(rtrn=='notfound_function'){
var error = 'İşlem fonksiyonu bulunamadı. Sistem yöneticisi ile irtibata geçiniz.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ex3'){
var error = 'İşlem sırasında bir sorun oluştu! Lütfen bizimle irtibata geçiniz.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ok'){
window.top.location.href=location.href;
}
}
});
}
function contact(){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=contact',
data:$('#contactForm').serialize(),
success : function(rtrn){
if(rtrn=='notfound_function'){
var error = 'İşlem fonksiyonu bulunamadı. Sistem yöneticisi ile irtibata geçiniz.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ex2'){
var error = 'Formda boş alan bırakmayınız.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ex3'){
var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse bizimle irtibata geçiniz';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ok'){
alert('Mesajınız tarafımıza ulaştı. İlgili departmanımız en kısa sürede sizinle iletişime geçecektir.');
window.top.location.href=location.href;
}
}
});
}

function form_contact(id , formid , formtitle , lang){
	
	$('div#sortingloading').fadeIn(400);
	
	$.ajax({
		
		type:'POST',
		url:'../../controller/ActionController.php?action=form_contact&id='+id+'&formid='+formid+'&formtitle='+formtitle+'&lang='+lang,
		data:$('#form_contact').serialize(),
		success : function(rtrn){
			
			//alert(rtrn);
			
			rtrn = JSON.parse(rtrn);
			
			if(rtrn.Status!='ok'){
				var error = rtrn.Message;
				document.getElementById('errormsg').innerHTML = error;
				$('#error').fadeIn(100);
				$('div#sortingloading').fadeOut(300);
			}
			
			if(rtrn.Status=='ok'){
				window.top.location.href=location.href+'&status=ok';
			}
			
		}
		
	});
	
	
}

function HavaleBildirimi(){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=havalebildirimi',
data:$('#HavaleForm').serialize(),
success : function(rtrn){
if(rtrn=='ex2'){
var error = 'Formda boş alan bırakmayınız.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ex3'){
var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse bizimle irtibata geçiniz';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ok'){
alert('Mesajınız tarafımıza ulaştı. İlgili departmanımız en kısa sürede sizinle iletişime geçecektir.');
window.top.location.href=location.href;
}
}
});
}
function Talep(){
$('div#sortingloading').fadeIn(400);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=talep',
data:$('#talepForm').serialize(),
success : function(rtrn){
if(rtrn=='ex2'){
var error = 'Formda boş alan bırakmayınız.';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ex3'){
var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse bizimle irtibata geçiniz';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$('div#sortingloading').fadeOut(300);
}
if(rtrn=='ok'){
window.top.location.href=location.href+'&status=ok';
}
}
});
}
function EmailAdd(){
$("div#loading_emailadd").show(0);
$("input#button_emailadd").hide(0);
$.ajax({
type:'POST',
url:'../../controller/ActionController.php?action=emailadd',
data:$('#emailaddform').serialize(),
success : function(rtrn){
//alert(rtrn);
if(rtrn=='ex2'){
var error = 'Email Adresi Belirtiniz !';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading_emailadd").hide(0);
$("input#button_emailadd").show(0);
}
if(rtrn=='ex2_1'){
var error = 'Bu Email Adresi Daha Önce Kaydedilmiş !';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading_emailadd").hide(0);
$("input#button_emailadd").show(0);
}
if(rtrn=='ex2_2'){
var error = 'Geçersiz Email Adresi - Lütfen Kontrol Ediniz !';
document.getElementById('errormsg').innerHTML = error;
$('#error').fadeIn(100);
$("div#loading_emailadd").hide(0);
$("input#button_emailadd").show(0);
}
if(rtrn=='ok'){
$('div#emailaddform_').hide(0);
$('div#emailaddsuccess').fadeIn(200);
}
}
});
}
function getProduct(id,lang){
$.ajax({
type:'GET',
url:'/Home/GetProduct?id='+id+'&lang='+lang,
success : function(rtrn){
$('div#window-product').html(rtrn);
$('div#window-product').fadeIn(200);
}
});
}

function getProduct_b2b(id,lang){
$.ajax({
type:'GET',
url:'../../controller/ProductsController.php?action=getproduct_b2b&id='+id+'&lang='+lang,
success : function(rtrn){
$('div#window-product').html(rtrn);
$('div#window-product').fadeIn(200);
}
});
}

function PictureDetail(picture , lang){
	//$('div#sortingloading').fadeIn(400);
	//$.ajax({
	//	type: 'GET',
	//	url: '../../controller/ProductsController.php?action=picturedetail&picture=' + picture + '&lang=' + lang,
	//	success: function (rtrn) {
	//		$('div#window-picture').html(rtrn);
	//		$('div#window-picture').fadeIn(100);
	//		$('div#sortingloading').fadeOut(0);
	//	}
	//});



	//$('div#sortingloading').fadeIn(400);
	//$.ajax({
	//	type: 'GET',
	//	url: '../../controller/ProductsController.php?action=picturedetail&picture=' + picture + '&lang=' + lang,
	//	success: function (rtrn) {
	var rtrn = '<div class="windowDetail" style="max-width:50%;">' +
		'<a href="/#" class="windowclose" onclick="windowclose_picture(); return false;"></a>' +
		'<div style="float: left; width: 90%; text-align: center; font-size: 22px; padding: 10px; margin: 20px 0px 20px 0px;">' +
		'<img src="' + picture+'" alt="" style="width: 100%;" />' +
		'</div>' +
		'<div class="clear"></div>' +
		'</div>';
			$('div#window-picture').html(rtrn);
			$('div#window-picture').fadeIn(100);
	//		$('div#sortingloading').fadeOut(0);
	//	}
	//});
}
function getOrder(id , lang){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=getorder&id='+id+'&lang='+lang,
success : function(rtrn){
$('div#getorder'+id).html(rtrn);
$('div#getorder'+id).slideToggle(100);
}
});
}
function getAnswer(id){
$('#getanswer'+id).slideToggle(100);
}
$(window).scroll(function() {
var uzunluk = $(document).scrollTop();
if (uzunluk > 160) $(".Up").fadeIn(1100);
else { $(".Up").fadeOut(800); 
}
});

function ChangePriceType(val){
	$.ajax({
		type:'GET',
		url:'../../controller/ActionController.php?action=changepricetype&pricetype='+val,
		success : function(rtrn){
			if(rtrn=='ok'){
			window.top.location.href=location.href;
			}
		}
	});
}

function CodeMirrorSave(Dosya , FileName , Tema , Mode){
	
	$('img#editorloading').fadeIn(400);
	$('img#editorsuccess').hide(0);
	
	editor.save();
    var content = editor.getValue();
	var path = $("#CodeMirrorSave").text();
	
	$.ajax({
		
		type:'POST',
		url:'../../controller/ActionController.php?action=codemirrorsave&dosya='+Dosya+'&filename='+FileName,
		data: $('#CodeMirrorSave').serialize(),
        dataType: 'text',
		success : function(rtrn){
			
			//alert(rtrn);
			
			if(rtrn=='ok'){
				$('img#editorloading').hide(0);
				$('img#editorsuccess').fadeIn(400);
			}
			
			if(rtrn!='ok'){
				alert('Hata Oluştu');
				window.location.href=location.href;
			}
		}
		
	});
}

function Up(){
$("html,body").stop().animate({ scrollTop: "0" }, 500);
}