function modelSelectCoklu(topid, id, total, inputid, price_type_simge = 0) {
    $('#modelinputdefault' + topid).remove();
    InputCheck = $('#' + inputid).is(":checked");

    if (InputCheck == false) {
        InputCheckValue = 0;
    } else {
        InputCheckValue = 1;
    }

    ModelSelectPriceKutuCoklu(topid, id, total, InputCheckValue, price_type_simge);
    $('div#product-tabs-installments').fadeOut(50);
}

function ModelSelectPriceKutuCoklu(topid, id, total, InputCheckValue, price_type_simge = 0) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselectpricekutucoklu&topid=' + topid + '&id=' + id + '&total=' + total + '&inputcheck=' + InputCheckValue + '&price_type_simge=' + price_type_simge,
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('div#error').fadeIn(200);
            } else {
                $('span#fiyat_alani').html(rtrn.Price);
                $('span#fiyat_alani').fadeIn(0);

            }
        }
    });
}

function modelSelect(topid, id, total, price_type_simge = 0) {
    var modelvalue = '<input type="hidden" name="model[]" id="model' + topid + '" value="' + id + '" />';
    $('#modelinputdefault' + topid).remove();
    document.getElementById('modelinput' + topid).innerHTML = modelvalue;
    for (i = 1; i <= total; i++) {
        document.getElementById('modelselect' + i + '_' + topid).style.backgroundColor = '#fff';
        document.getElementById('modelselect' + i + '_' + topid).style.color = '#000';
    }
    ModelSelectPriceKutu(topid, id, total, price_type_simge);
    $('div#product-tabs-installments').fadeOut(50);
}

function ModelSelectPriceKutu(topid, id, total, price_type_simge = 0) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselectpricekutu&topid=' + topid + '&id=' + id + '&total=' + total + '&price_type_simge=' + price_type_simge,
        success: function (rtrn) {
            console.log(rtrn);
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('div#error').fadeIn(200);
            } else {
                $('span#fiyat_alani').html(rtrn.Price);
                var totalDiscount = Object.keys(rtrn.paymentTypeTotal).length;
                if (totalDiscount > 0) {
                    Object.entries(rtrn.paymentTypeTotal).forEach(([k, v]) => {
                        $('span#' + k).html(v);
                    });
                }
                $('span#fiyat_alani').fadeIn(0);
            }
        }
    });
}

function modelSelectPriceNormal(topid, modelid, id, total) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselectpricenormal&topid=' + topid + '&modelid=' + modelid + '&id=' + id + '&total=' + total,
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('div#error').fadeIn(200);
            } else {
                $('span#fiyat_alani').html(rtrn.Price);
                $('span#fiyat_alani').fadeIn(0);
            }
        }
    });

    var modelvalue = '<input type="hidden" name="model[]" id="model' + topid + '" value="' + id + '" />';
    $('#modelinputdefault' + topid).remove();
    document.getElementById('modelinput' + topid).innerHTML = modelvalue;
    for (i = 1; i <= total; i++) {
        document.getElementById('modelselect' + i + '_' + topid).style.backgroundColor = '#fff';
        document.getElementById('modelselect' + i + '_' + topid).style.color = '#000';
    }
}

function modelSelectPriceAdetNormal(adet, productid, adetText, price_type_text, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselectpriceadetnormal&adet=' + adet + '&productid=' + productid + '&adetText=' + adetText + '&price_type_text=' + price_type_text + '&lang=' + lang,
        success: function (rtrn) {
           //rtrn = JSON.parse(rtrn);
            $('span#fiyat_alani').html(rtrn.Price);
            $('span#fiyat_alani').fadeIn(0);
        }
    });
}

function modelSelectPriceAdet(adet, price_template, adetText, price_type_text, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselectpriceadet&adet=' + adet + '&price_template=' + price_template + '&adetText=' + adetText + '&price_type_text=' + price_type_text + '&lang=' + lang,
        success: function (rtrn) {
           //rtrn = JSON.parse(rtrn);
            $('#changeprice').html(rtrn.Price);
            $('#changeprice').fadeIn(0);
        }
    });
}

function modelSelectPriceTemplate(topid, id, total) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=modelselect&topid=' + topid + '&id=' + id,
        success: function (rtrn) {
           //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('div#error').fadeIn(200);
            } else {
                $('#changeprice').html(rtrn.Price);
                $('#changeprice').fadeIn(0);
            }
        }
    });
}

function getModelsKilit(Id, mkey, TopId, Total, inputid) {
    InputCheck = $('#' + inputid).is(":checked");
    if (InputCheck == false) {
        InputCheckValue = 0;
    } else {
        InputCheckValue = 1;
    }

    ModelSelectPriceKutuCoklu(TopId, Id, Total, InputCheckValue);
    $('div#product-tabs-installments').fadeOut(50);
    for (i = 1; i <= Total; i++) {
        if (i !== mkey) {
            $("#modelclear_" + i + '_' + TopId).prop("checked", false);
            $('div#' + i + '_' + TopId).slideToggle(50);
        }
    }
}


/*
function modelSelect(topid,id,total){

var modelvalue='<input type="hidden" name="model[]" id="model'+topid+'" value="'+id+'" />';
$('#modelinputdefault'+topid).remove();
document.getElementById('modelinput'+topid).innerHTML=modelvalue;
for(i=1;i<=total;i++){
document.getElementById('modelselect'+i+'_'+topid).style.backgroundColor='#fff';
document.getElementById('modelselect'+i+'_'+topid).style.color='#000';}
ModelSelectPriceKutu(topid,id,total); 
$('div#product-tabs-installments').fadeOut(50);
}
    	
function ModelSelectPriceKutu(topid,id,total){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=modelselectpricekutu&topid='+topid+'&id='+id+'&total='+total,
success:function(rtrn){
rtrn=JSON.parse(rtrn);
if(rtrn.status=='ex2'){
var error=rtrn.Message;
document.getElementById('errormsg').innerHTML=error;
$('div#error').fadeIn(200);
}else{
$('span#fiyat_alani').html(rtrn.Price);
$('span#fiyat_alani').fadeIn(0);}}}
);
}
                        	
function modelSelectPriceNormal(topid,modelid,id,total){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=modelselectpricenormal&topid='+topid+'&modelid='+modelid+'&id='+id+'&total='+total,success:function(rtrn){
rtrn=JSON.parse(rtrn);
if(rtrn.status=='ex2'){
var error=rtrn.Message;
document.getElementById('errormsg').innerHTML=error;
$('div#error').fadeIn(200);
}else{
$('span#fiyat_alani').html(rtrn.Price);
$('span#fiyat_alani').fadeIn(0);}}
});
var modelvalue='<input type="hidden" name="model[]" id="model'+topid+'" value="'+id+'" />';
$('#modelinputdefault'+topid).remove();
document.getElementById('modelinput'+topid).innerHTML=modelvalue;
for(i=1;i<=total;i++){
document.getElementById('modelselect'+i+'_'+topid).style.backgroundColor='#fff';
document.getElementById('modelselect'+i+'_'+topid).style.color='#000';
}
}
                                                	
function modelSelectPriceAdetNormal(adet,productid,adetText,price_type_text,lang){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=modelselectpriceadetnormal&adet='+adet+'&productid='+productid+'&adetText='+adetText+'&price_type_text='+price_type_text+'&lang='+lang,
success:function(rtrn){
rtrn=JSON.parse(rtrn);
$('span#fiyat_alani').html(rtrn.Price);
$('span#fiyat_alani').fadeIn(0);}
});
}
                                                            	
function modelSelectPriceAdet(adet,price_template,adetText,price_type_text,lang){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=modelselectpriceadet&adet='+adet+'&price_template='+price_template+'&adetText='+adetText+'&price_type_text='+price_type_text+'&lang='+lang,
success:function(rtrn){
rtrn=JSON.parse(rtrn);
$('#changeprice').html(rtrn.Price);
$('#changeprice').fadeIn(0);}}
);
}
                                                                        	
function modelSelectPriceTemplate(topid,id,total){
$.ajax({
type:'GET',
url:'../../controller/ActionController.php?action=modelselect&topid='+topid+'&id='+id,
success:function(rtrn){
rtrn=JSON.parse(rtrn);
if(rtrn.status=='ex2'){
var error=rtrn.Message;
document.getElementById('errormsg').innerHTML=error;
$('div#error').fadeIn(200);
}else{
$('#changeprice').html(rtrn.Price);
$('#changeprice').fadeIn(0);
}}
});
}
                                                                                            	
function getModelsKilit(Id,mkey,TopId,Total){
for(i=1;i<=Total;i++){
if(i!==mkey){
$("#modelclear_"+i+'_'+TopId).prop("checked",false);$('div#'+i+'_'+TopId).slideToggle(50);
}
}
}

*/

function PrNotesPictures(id, productid, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=prnotespictures&id=' + id + '&productid=' + productid + '&lang=' + lang,
        success: function (rtrn) {

            $('div#window-picture').html(rtrn);
            $('div#window-picture').fadeIn(200);
            $('div#sortingloading').fadeOut(300);

        }

    });

}

function Shopping(id, title, lang, WebPath) {
    $('div#sortingloading').fadeIn(400);
    var adet = $('#orderForms [name="adet"]').val();
    var url = '/Home/GetAndGotoCard?id=' + id + ',lang=' + lang + ',adet=' + adet;
    var encodeUrl = encodeURI(url);
    $.ajax({
        type: 'POST',
        url: '/Home/Shopping?id=' + id + '&lang=' + lang,
        data: $('#orderForms [name="adet"]').serialize(),
        success: function (rtrn) {

            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                window.top.location.href = '/login?returnUrl=' + encodeUrl;
                //window.top.location.href = '/giris/' + lang;
            }
            if (rtrn.status == 'noproduct') {
                document.getElementById('errormsg').innerHTML = "از این محصول فقط " + rtrn.countInStock + " باقیمانده است.";
                $('#error').fadeIn(100);
                return;
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.error;
                document.getElementById('errormsg').innerHTML = error;
                if (WebPath == 'mobile') {
                    $('div#error').animate({
                        'right': '0px'
                    }, 150);
                    $('div#error').animate({
                        'right': '-10%'
                    }, 40);
                    $('div#error').animate({
                        'right': '0px'
                    }, 40);
                    $('div#sortingloading').fadeOut(100);
                }
                if (WebPath == 'web') {
                    $('div#error').fadeIn(200);
                    $('div#sortingloading').fadeOut(100);
                }
            }
            if (rtrn.status == 'ok') {
                getShoppingPopup(id, lang, WebPath);
                $('div#sortingloading').fadeOut(100);
            }
        }
    });
}


function SiparisForm(id, title, lang, WebPath) {

    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=siparisform&id=' + id + '&title=' + title + '&lang=' + lang,
        data: $('#orderForms').serialize(),
        success: function (rtrn) {

            //alert(rtrn);

            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                window.top.location.href = "/login";
                //window.top.location.href = '../../giris/' + lang;
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                if (WebPath == 'mobile') {
                    $('div#error').animate({
                        'right': '0px'
                    }, 150);
                    $('div#error').animate({
                        'right': '-10%'
                    }, 40);
                    $('div#error').animate({
                        'right': '0px'
                    }, 40);
                    $('div#sortingloading').fadeOut(100);
                }
                if (WebPath == 'web') {
                    $('div#error').fadeIn(200);
                    $('div#sortingloading').fadeOut(100);
                }
            }
            if (rtrn.status == 'ok') {
                //getShoppingPopup(id,lang,WebPath);

                getSiparisForm(id, lang, WebPath);


            }
        }
    });
}


function getSiparisForm(id, lang, WebPath) {

    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=getsiparisform&id=' + id + '&lang=' + lang,
        success: function (rtrn) {

            //alert(rtrn);

            $('div#window-news').html(rtrn);
            $('div#window-news').fadeIn(200);
            $('div#sortingloading').fadeOut(0);

        }

    });

}

function getSiparisAction(lang, id, Page_) {

    $.ajax({

        type: 'POST',
        url: '../../controller/ActionController.php?action=getsiparisaction&id=' + id + '&lang=' + lang,
        data: $('#getSiparisForm').serialize(),
        success: function (rtrn) {

            //alert(rtrn);

            //rtrn = JSON.parse(rtrn);

            if (rtrn.status != 'ok') {

                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').hide(0);


            }

            if (rtrn.status == 'ok') {

                window.top.location.href = location.href + '/&status=ok';

            }

        }

    });

}

function HemenAL(id, title, adet, lang) {
    $('div#sortingloading').fadeIn(400);
    var url = '/Home/GetAndGotoCard?id=' + id + ',lang=' + lang + ',adet=' + adet;
    var encodeUrl = encodeURI(url);
    $.ajax({
        type: 'GET',
        url: '/Home/GetNow?id=' + id + '&lang=' + lang + '&adet=' + adet,
        data: $('#orderForms').serialize(),
        success: function (rtrn) {
            //alert(rtrn);
            if (rtrn.status == 'ex1') {
                window.top.location.href = '/login?returnUrl=' + encodeUrl;
            }

            if (rtrn.status == 'ex2_0_v') {
                $('div#sortingloading').fadeOut(100);
                getProduct(id, lang);
            }

            if (rtrn.status == 'ex2') {
                var error = rtrn.error;
                document.getElementById('errormsg').innerHTML = error;
                $('div#error').fadeIn(200);
                $('div#sortingloading').fadeOut(100);

            }
            if (rtrn.status == 'noproduct') {
                document.getElementById('errormsg').innerHTML = "از این محصول فقط " + rtrn.countInStock + " عدد در انبار موجود است.";
                $('#error').fadeIn(100);
            }
            if (rtrn.status == 'ok') {
                var card = JSON.parse(rtrn.card);
                ShoppingQuantity(card);
                getHemenALSuccessByCard(card, lang);
            }
        }
    });
}


function getHemenALSuccessByCard(card, lang) {
    var dialog =
        '<div class="hemenalpopup">' +
        '  <div class="column1 column-left padding-clear" style="position: relative; overflow: auto; height: 85%;">' +
        '    <div class="hemenalpopupline">' +
        '      <a href="#" onclick="HemenALClose(); return false;">' +
        '        <img src="/views/tema1/img/next_sepet_box.png" class="hemenalpopupline-close" alt="" />' +
        '      </a>' +
        '    </div>';
    var totalprice = 0;
    for (var i = 0; i < card.length; i++) {
        totalprice += card[i].TotalPrice;
        dialog +=
            '    <div class="column1 column-left padding-clear" id="hemenalpopupline20422" style="border-bottom: 2px #eeeff4 solid; position: relative;">' +
            '      <div class="hemenalpopupline-img">' +
            '        <img src="/images/' + card[i].ImagePath + '" alt="" />' +
            '      </div>' +
            '      <div class="hemenalpopupline-right">' +
            '        <div class="hemenalpopupline-title">' + card[i].Name + '</div>' +
            '        <div class="hemenalpopupline">' +
        '          <span class="hemenalpopupline-adet">' + card[i].Count + ' عدد</span> , <span class="hemenalpopupline-price"> ' + (Math.round(card[i].TotalPrice * 100) / 100).toLocaleString()+ ' تومان </span>' +
            '        </div>' +
            '      </div>' +
            '      <a href="#" onclick="DeleteShoppingHemenAL(' + card[i].ProductId + ' , \'tr\' , \'undefined\'); return false;" class="column-right sepet_sil_x" style="position: absolute; right: 0px; top: 7px;">X</a>' +
            '    </div>';
    }
    dialog += '    <div class="column1 column-left padding-clear" style="border-bottom: 2px #eeeff4 solid; position: relative; padding: 20px 0px 20px 0px;">' +
        '      <div class="hemenalpopupline"> مجموع سبد : ' + (Math.round(totalprice * 100) / 100).toLocaleString() + ' تومان </div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="hemenalpopupline" style="height: auto; position: absolute; left: 0px; bottom: 50px; background: #fff; padding: 20px 10px 20px 10px;">' +
        '    <a href="/shopping/tr" class="hemenalpopupline-sepet-button">به سبد برو</a>' +
        '    <a href="/adress/tr" class="hemenalpopupline-adress-button">پرداخت کن</a>' +
        '  </div>' +
        '</div>';
    $('div#hemenalsuccess').html(dialog);
    $('div#hemenalsuccess').fadeIn(50);
    $('div#sortingloading').fadeOut(0);

    //$.ajax({
    //	type:'GET',
    //	url:'../../controller/ActionController.php?action=gethemenalsuccessalert&id='+id+'&shoppingid='+shoppingid+'&lang='+lang+'&webpage='+webpage,
    //	success : function(rtrn){
    //		//alert(rtrn);
    //		$('div#hemenalsuccess').html(rtrn);
    //		$('div#hemenalsuccess').fadeIn(50);
    //	}

    //});
}

function getHemenALSuccess(id, title, adet, shoppingid, lang, webpage) {
    if (id == 0)
        HemenAL(id, title, adet, lang);
}

function HemenALClose() {
    $('div#hemenalsuccess').fadeOut(50);
}


function getShoppingPopup(id, lang, WebPath) {
    var data = '<div class="windowDetail" style="width: 50%;">' +
        '  <a href="/shopping/tr" class="windowclose"></a>' +
        '  <div style="float: left; width: 90%; text-align: center; font-size: 22px; padding: 10px; margin: 20px 0px 20px 0px;">' +
        '    <div style="float: left; width: 100%; text-align: center; margin: 10px 0px 10px 0px;">' +
        '      <img src="img/tick.png" alt="" style="margin: auto;" />' +
        '    </div> محصول به سبد شما افزوده شد. به سبد می روید یا به خرید ادامه میدهید؟' +
        '  </div>' +
        '  <a href="#" id="close-goto-card" class="column-left button urun-detay-button">به خرید ادامه می دهم »</a>' +
        '  <a href="/shopping/tr" class="column-right button urun-detay-button">« به سبد می روم </a>' +
        '  <div style="float: left; width:100%; padding: 10px; box-sizing: border-box;" id="shopping-popup-combin-phone"></div>' +
        '  <div class="clear"></div>' +
        '</div>';
    $('div#window').html(data);
    $('#close-goto-card').on('click', function () {
        $('div#window').fadeOut(100);
        setTimeout(function () {
            $('div#window').html('');
        }, 200);
    });
    if (WebPath == 'mobile') {
        $('div#window').animate({
            'right': '0px'
        }, 150);
        $('div#window').animate({
            'right': '-10%'
        }, 40);
        $('div#window').animate({
            'right': '0px'
        }, 40);
        $('div#sortingloading').fadeOut(100);
    }
    if (WebPath == 'web') {
        $('div#window').fadeIn(200);
        $('div#window-product').hide(0);
        $('div#sortingloading').fadeOut(100);
    }
    //$.ajax({
    //	type: 'GET', url: '../../controller/ActionController.php?action=getshoppingpopup&id=' + id + '&lang=' + lang,
    //	success: function (rtrn) {
    //		if (WebPath == 'mobile') {
    //			$('div#window').animate({ 'right': '0px' }, 150);
    //			$('div#window').animate({ 'right': '-10%' }, 40);
    //			$('div#window').animate({ 'right': '0px' }, 40);
    //			$('div#sortingloading').fadeOut(100);
    //		} if (WebPath == 'web') {
    //			$('div#window').fadeIn(200);
    //			$('div#window-product').hide(0);
    //			$('div#sortingloading').fadeOut(100);
    //		}
    //	}
    //});
}

function ShoppingBayi(id, title, lang, WebPath) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=shoppingbayi&id=' + id + '&title=' + title + '&lang=' + lang,
        data: $('#orderForms').serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                Giris();
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(400);
            }
            if (rtrn.status == 'ok') {
                $('div#sortingloading').fadeOut(400);
                windowclose_product();
                $('img#line_ok' + id).fadeIn(250);
            }
        }
    });
}


function DeleteShopping(id, lang) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'GET',
        url: '/Home/DelFromCard?id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status != 'ok') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(100);
            }
            if (rtrn.status == 'ex1') {
                window.top.location.href = location.href;
            }
            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function DeleteShoppingHemenAL(id, lang, webpage) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'GET',
        url: '/Home/DelFromCard?id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            if (rtrn.status != 'ok') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(100);
            }
            if (rtrn.status == 'ex1') {
                window.top.location.href = location.href;
            }
            if (rtrn.status == 'ok') {
                var card = JSON.parse(rtrn.card);

                //if (webpage == 'shopping') {

                //	window.top.location.href = location.href;

                //}

                //if (webpage == 'payment') {

                //	window.top.location.href = location.href;

                //}


                //$('div#hemenalpopupline' + id).slideUp(100);
                //$('div#sepet-list-box' + id).slideUp(100);
                //$('div#sepet-genel-toplam-satir').slideUp(100);
                //$('div#sortingloading').fadeOut(100);
                getHemenALSuccessByCard(card, lang);
                ShoppingQuantity(card);

            }
        }
    });
}


function DeleteShoppingBayi(id) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=deleteshoppingbayi&id=' + id,
        success: function (rtrn) {
            if (rtrn == 'ex1_1') {
                var error = 'شما در منطقه فروشنده هستید! شما نمی توانید در این بخش خرید کنید. لطفاً از سیستم خارج شوید و دوباره به عنوان کاربر وارد شوید.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(0);
            }
            if (rtrn == 'ex1') {
                var error = 'لطفا وارد شوید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(0);
            }
            if (rtrn == 'ex2') {
                var error = 'این محصول برای شما نیست !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(0);
            }
            if (rtrn == 'ex3') {
                var error = 'در حین عملیات خطایی رخ داد. اگر خطا ادامه داشت لطفا به ما اطلاع دهید.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(0);
            }
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function DeleteShoppingBayi_old(id) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=deleteshoppingbayi&id=' + id,
        success: function (rtrn) {
            if (rtrn == 'ex1_1') {
                var error = 'شما در منطقه فروشنده هستید! شما نمی توانید در این بخش خرید کنید. لطفاً از سیستم خارج شوید و دوباره به عنوان کاربر وارد شوید.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#loading").hide(0);
                $("input#button").show(0);
            }
            if (rtrn == 'ex1') {
                var error = 'لطفا وارد شوید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2') {
                var error = 'این محصول برای شما نیست !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex3') {
                var error = 'در حین عملیات خطایی رخ داد. اگر خطا ادامه داشت لطفا به ما اطلاع دهید.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function UpdateShopping(id, lang) {
    var adet = $('#updateshoppingform' + id + " input[name='adet']").val();
    $.ajax({
        type: 'POST',
        url: '/updateshopping?id=' + id + '&lang=' + lang + "&adet="+adet,
        //data: $('#updateshoppingform' + id + " input[name='adet']").serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                Giris();
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    }

    );
}

function UpdateShoppingBayi(id, title_tr, lang) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=updateshoppingbayi&id=' + id + '&title=' + title_tr + '&lang=' + lang,
        data: $('#orderForms' + id).serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status != 'ok') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(0);
            }
            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function UpdateShoppingBayi_old(adet, id) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=updateshoppingbayi&adet=' + adet.value + '&id=' + id,
        success: function (rtrn) {
            if (rtrn == 'ex1_1') {
                var error = 'شما در منطقه فروشنده هستید! شما نمی توانید در این بخش خرید کنید. لطفاً از سیستم خارج شوید و دوباره به عنوان کاربر وارد شوید.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#loading").hide(0);
                $("input#button").show(0);
            }
            if (rtrn == 'ex1') {
                var error = 'لطفا ابتدا وارد شوید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2') {
                var error = 'این محصول در انبار موجود نیست !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2_0') {
                var error = 'شما مقدار را مشخص نکردید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2_2') {
                var error = 'این اندازه خارج از موجودی است. می توانید سایز متفاوتی را انتخاب کنید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2_3') {
                var error = 'این کالا کمتر از مقدار انتخابی شما موجود است. لطفا تعداد کمتری انتخاب کنید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex2_4') {
                var error = 'این مدل در انبار از تعداد انتخابی شما کمتر  باقیمانده است. سعی کنید تعداد کمتری انتخاب کنید !';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ex3') {
                var error = 'در حین عملیات خطایی رخ داد! اگر مشکل همچنان ادامه داشت، لطفا با ما تماس بگیرید..';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
            }
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function selectCountry(id, lang) {
    if (id == 'turkiye') {
        $('#city_county_label_f').fadeIn(200);
        $('#city_county_label_t').fadeIn(200);
    }
    if (id != 'turkiye') {
        $('#city_county_label_f').fadeOut(200);
        $('#city_county_label_t').fadeOut(200);
    }
    getCountryT(id, lang);
}

function getCountryT(id, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=selectcountry&id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            $('div#country_t').html(rtrn);
            $('div#country_t').fadeIn(200);
        }
    });
}

function selectCountryT(id, lang) {
    if (id == 'turkiye') {
        $('#city_county_label_t').fadeIn(200);
    }
    if (id != 'turkiye') {
        $('#city_county_label_t').fadeOut(200);
    }
}

function selectCounty(id, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=selectcounty&id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            $('div#ilce_f').html(rtrn);
            $('div#ilce_f').fadeIn(200);
            selectCountyILT(id, lang);
        }
    });
}

function selectCountyILT(id, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=selectcity&id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            $('div#il_t').html(rtrn);
            $('div#il_t').fadeIn(0);
            selectCountyT(id, lang);
        }
    });
}
function SelectProvince(id, lang) {
    $('#CityId').html('<option value="">انتخاب شهرستان</option>');
    $.ajax({
        type: 'GET',
        url: '/Home/GetCityByProviceId?id=' + id + '&lang=' + lang,
        success: function (dataJson) {
            var cityHtml = '<option value="">انتخاب شهرستان</option>';
            for (var i = 0; i < dataJson.length; i++) {
                cityHtml += "<option value='" + dataJson[i].cityId + "'>" + dataJson[i].name + (dataJson[i].cityNote ? " (" + dataJson[i].cityNote+")":"") + "</option>";
            }
            $('#CityId').html(cityHtml);
            if (selectedCityId)
                $('#CityId').val(selectedCityId);
            $('div#ilce_f').fadeIn(0);
            //selectCountyT(id, lang);
        }
    });
}
function submitPaymentForm() {
    if ( $('#creditcardform')[0].checkValidity()) {
        /* submit the form */
        $('div#sortingloading').fadeIn(300);
        $('#orderForms input[type=submit]').attr("disabled", "");
        return true;
    }
    return false;
}
function SelectProvince_Delivery(id, lang) {
    $('#CityId_Delivery').html('<option value="">انتخاب استان</option>');
    $.ajax({
        type: 'GET',
        url: '/Home/GetCityByProviceId?id=' + id + '&lang=' + lang,
        success: function (dataJson) {
            var cityHtml = '<option value="">انتخاب استان</option>';
            for (var i = 0; i < dataJson.length; i++) {
                cityHtml += "<option value='" + dataJson[i].cityId+"'>" + dataJson[i].name + "</option>";
            }
            $('#CityId_Delivery').html(cityHtml);
            if (selectedCityId_Delivery)
                $('#CityId_Delivery').val(selectedCityId_Delivery);
            $('div#ilce_t').fadeIn(0);
            //selectCountyT(id, lang);
        }
    });
}

function selectCountyT(id, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=selectcountyT&id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            $('div#ilce_t').html(rtrn);
            $('div#ilce_t').fadeIn(200);
        }
    });
}

function selectGetCounty(id, lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=selectgetcounty&id=' + id + '&lang=' + lang,
        success: function (rtrn) {
            $('div#ilce_t').html(rtrn);
            $('div#ilce_t').fadeIn(0);
        }
    });
}

function newAdressForm(WebPath) {
    if (WebPath == 'web') {
        $('div#newadressbar').fadeIn(200);
    }
    if (WebPath == 'mobile') { }
}


function selectAdress(lang) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=selectadress&lang=' + lang,
        data: $('#selectadressform').serialize(),
        success: function (rtrn) {
            if (rtrn == 'ex1') {
                window.top.location.href = "/login";
            }
            if (rtrn == 'ex2') {
                var error = 'Lütfen fatura ve teslimat adresinizi belirtiniz. Listede adresiniz yoksa yeni bir adres ekleyiniz.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(300);
            }
            if (rtrn == 'ex3') {
                var error = 'İşlem sırsında bir sorun oluştu ! Sorun devam ederse lütfen bizimle irtibata geçiniz.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(300);
            }
            if (rtrn == 'ok') {
                window.top.location.href = "../../payment/0/" + lang;
            }
        }
    });
}

function faturaTipi(val) {
    if (val == 'bireysel') {
        $('div#kurumsalfatura').hide(0);
        $('div#bireyselfatura').show(0);
        $('#CompanyName').removeAttr('required');
        $('#TaxCompany').removeAttr('required');
        $('#TaxCode').removeAttr('required');
    }
    if (val == 'kurumsal') {
        $('#CompanyName').attr('required', '');
        $('#TaxCompany').attr('required', '');
        $('#TaxCode').attr('required', '');
        $('div#bireyselfatura').hide(0);
        $('div#kurumsalfatura').show(0);
    }
}

function gonderim_tarihi_form_(lang) {
    $('div#gonderimtarihiform').slideToggle(50);
}

function extra_notes_form_(lang) {
    $('div#sortingloading').fadeIn(10);

    $('#OrderNoteDiv').show(30);
    $('div#sortingloading').fadeOut(50);
}

function extra_notes_action_(lang) {
    $('div#sortingloading').fadeIn(10);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=extra_notes_action&lang=' + lang,
        data: $('#ExtraNotesForm').serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#sortingloading").hide(0);
            }
            if (rtrn.status == 'ok') {
                $('div#extra_notes_success').fadeIn(100);
                $("div#sortingloading").hide(0);
            }
        }
    });
}

function fatura_document_(lang) {
    $('div#sortingloading').fadeIn(10);
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=fatura_document&lang=' + lang,
        success: function (rtrn) {
            $('div#window').html(rtrn);
            $('div#window').fadeIn(200);
            $('div#sortingloading').fadeOut(300);
        }
    });
}

function cargo_company_select(elem) {
    var cargoId = $(elem).val();
    $('[name="CargoId"]').val(cargoId);
    //$.ajax({
    //    type: 'POST',
    //    url: '../../controller/ActionController.php?action=cargoselect&zoneprice=' + ZonePrice + '&zonepricetype=' + ZonePriceType,
    //    data: $('#cargo_select_form').serialize(),
    //    success: function (rtrn) {
    //        if (rtrn == 'ex1') {
    //            var error = 'Lütfen giriş yapınız';
    //            document.getElementById('errormsg').innerHTML = error;
    //            $('#error').fadeIn(100);
    //            $("div#loading").hide(0);
    //            $("input#button").show(0);
    //        }
    //        if (rtrn == 'ex2') {
    //            var error = 'Seçim yapmadınız';
    //            document.getElementById('errormsg').innerHTML = error;
    //            $('#error').fadeIn(100);
    //            $("div#loading").hide(0);
    //            $("input#button").show(0);
    //        }
    //        if (rtrn == 'ex3') {
    //            var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse bizimle irtibata geçiniz.';
    //            document.getElementById('errormsg').innerHTML = error;
    //            $('#error').fadeIn(100);
    //            $("div#loading").hide(0);
    //            $("input#button").show(0);
    //        }
    //        if (rtrn == 'ok') {
    //            window.top.location.href = location.href;
    //        }
    //    }
    //});
}

function CargoCode(ZonePrice, ZonePriceType) {
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=cargocode',
        data: $('#CargoCodeForm').serialize(),
        success: function (rtrn) {
            if (rtrn == 'ex1') {
                var error = 'Lütfen giriş yapınız';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#loading").hide(0);
                $("input#button").show(0);
            }
            if (rtrn == 'ex2') {
                var error = 'Anlaşmalı kargo kodunuzu belirtiniz';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#loading").hide(0);
                $("input#button").show(0);
            }
            if (rtrn == 'ex3') {
                var error = 'İşlem sırasında bir sorun oluştu. Sorun devam ederse bizimle irtibata geçiniz.';
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $("div#loading").hide(0);
                $("input#button").show(0);
            }
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}


function DiscountCouponsOpen() {
    $('div#discountcoupons').slideToggle(100);
}

function PartnerCouponsOpen() {
    $('div#partnercoupons').slideToggle(100);
}

function PartnerCode(lang, WebPath) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=partnercode&lang=' + lang,
        data: $('#partnerForm').serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                window.top.location.href = "/login";
                //window.top.location.href = "../../giris/" + lang;
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                if (WebPath == 'mobile') {
                    $('div#error').animate({
                        'right': '0px'
                    }, 150);
                    $('div#error').animate({
                        'right': '-10%'
                    }, 40);
                    $('div#error').animate({
                        'right': '0px'
                    }, 40);
                    $('div#sortingloading').fadeOut(300);
                }
                if (WebPath == 'web') {
                    $('#error').fadeIn(100);
                    $('div#sortingloading').fadeOut(300);
                }
            }
            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function DeletePartnerCode() {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=deletepartnercode',
        success: function (rtrn) {
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function discountCoupons(lang, WebPath, id) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=discountcoupons&lang=' + lang,
        data: $('#discountForm' + id).serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                Giris();
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                if (WebPath == 'web') {
                    $('#error').fadeIn(100);
                    $('div#sortingloading').fadeOut(300);
                }
                if (WebPath == 'mobile') {
                    $('div#error').animate({
                        'right': '0px'
                    }, 150);
                    $('div#error').animate({
                        'right': '-10%'
                    }, 40);
                    $('div#error').animate({
                        'right': '0px'
                    }, 40);
                    $('div#sortingloading').fadeOut(300);
                }
            }
            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function discountCouponsForm(lang, WebPath) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '/discount?lang=' + lang,
        data: $('#discountFormForm').serialize(),
        success: function (rtrn) {
            //rtrn = JSON.parse(rtrn);
            if (rtrn.status == 'ex1') {
                Giris();
            }
            if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
                var error = rtrn.desc;
                document.getElementById('errormsg').innerHTML = error;
                if (WebPath == 'web') {
                    $('#error').fadeIn(100);
                    $('div#sortingloading').fadeOut(300);
                }
                if (WebPath == 'mobile') {
                    $('div#error').animate({
                        'right': '0px'
                    }, 150);
                    $('div#error').animate({
                        'right': '-10%'
                    }, 40);
                    $('div#error').animate({
                        'right': '0px'
                    }, 40);
                    $('div#sortingloading').fadeOut(300);
                }
            }
            if (rtrn.status == 'ok') {
                $('div#sortingloading').fadeOut(300);

                $('#CopounPrice').html('Toplam İndirim : <span style="float: right;">' + rtrn.discountAmount+' TL</span><br />');
                $('#total-price').html(rtrn.newTotalAmount);
            }
        }
    });
}


function DeleteDiscountCoupons() {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=deletediscountcoupons',
        success: function (rtrn) {
            if (rtrn == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function selectBank(id, paymentsystem, total, lang, webpath) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=getinstallments&id=' + id + '&paymentsystem=' + paymentsystem + '&total=' + total + '&lang=' + lang + '&webpath=' + webpath,
        success: function (rtrn) {
            $('div#getinstallment').html(rtrn);
            $('div#getinstallment').fadeIn(200);
            $(document).ready(function () {
                $('html, body').animate({
                    scrollTop: $("div#selectBank").offset().top
                }, 300);
            });
        }
    });
}

function SelectBankForm(Bank, installment, paymentsystem, getTotal, lang, webpath) {

    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=getbankform&bank=' + Bank + '&installment=' + installment + '&paymentsystem=' + paymentsystem + '&getTotal=' + getTotal + '&lang=' + lang + '&webpath=' + webpath,
        success: function (rtrn) {

            $('div#selectbankform').html(rtrn);
            $('div#selectbankform').fadeIn(100);
        }
    });
}

function sozlesme2(lang, PAYMENT_SYSTEM, WebPath) {
    $.ajax({
        type: 'GET',
        url: '/Home/GetContract',
        success: function (rtrn) {
            $('div#window').html(rtrn);
            if (WebPath == 'web') {
                $('div#window').fadeIn(200);
            }
            if (WebPath == 'mobile') {
                $('div#window').animate({
                    'right': '0px'
                }, 150);
                $('div#window').animate({
                    'right': '-10%'
                }, 40);
                $('div#window').animate({
                    'right': '0px'
                }, 40);
            }
        }
    });
}

function PaymentProductControl(lang) {

    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=paymentproductcontrol&lang=' + lang,
        success: function (rtrn) {

            if (rtrn == 'ex1') {
                PaymentProductControlAction(lang);
            }

        }
    });
}

function PaymentProductControlPayment(lang, Total) {

    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=paymentproductcontrol&total=' + Total + '&lang=' + lang,
        success: function (rtrn) {
            //alert(rtrn);	

            /*
            if(rtrn=='ex1'){
                PaymentProductControlAction(lang);
            }
            */

            if (rtrn == 'exTotal') {
                window.top.location.href = location.href;
            }

        }
    });
}

function PaymentProductControlAction(lang) {
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=paymentproductcontrolaction&lang=' + lang,
        success: function (rtrn) {
            $('div#window').html(rtrn);
            $('div#window').fadeIn(200);
            //window.top.location.href="../../shopping/"+lang;
        }
    });
}


function IyzicoSozlesme(val) {
    var CheckVal = val.checked;
    if (CheckVal == true) {
        $('div#iyzicosozlesme').show(0);
    }
    if (CheckVal == false) {
        $('div#iyzicosozlesme').hide(0);
        $("html,body").stop().animate({
            scrollTop: "0"
        }, 500);
    }
}

//function orders(lang, WebPath) {
//    $('div#sortingloading').fadeIn(400);
//    $.ajax({
//        type: 'POST',
//        url: '/orders?lang=' + lang,
//        data: $('#creditcardform').serialize(),
//        success: function (rtrn) {


//            /*
//            $('div#window').html(rtrn);
//            $('div#window').fadeIn(200);
//            $('div#sortingloading').hide(0);
//            */

//           //rtrn = JSON.parse(rtrn);
//            if (rtrn.status == 'ex1') {
//                window.top.location.href = '../../giris/' + lang;
//            }

//            if (rtrn.status == '3ds') {
//                //alert(decodeURIComponent(JSON.stringify(rtrn.URL_3DS)));
//                var url_3d = decodeURIComponent(JSON.stringify(rtrn.URL_3DS));
//                window.top.location.href = url_3d.replace('"', '');

//            } else {

//                if (rtrn.status != 'ok' && rtrn.status != 'ex1') {
//                    var error = rtrn.Message;
//                    document.getElementById('errormsg').innerHTML = error;
//                    if (WebPath == 'mobile') {
//                        $('div#error').animate({
//                            'right': '0px'
//                        }, 150);
//                        $('div#error').animate({
//                            'right': '-10%'
//                        }, 40);
//                        $('div#error').animate({
//                            'right': '0px'
//                        }, 40);
//                    }
//                    if (WebPath == 'web') {
//                        $('#error').fadeIn(100);
//                    }
//                    $('div#sortingloading').fadeOut(300);
//                }

//            }

//            if (rtrn.status == 'ok') {
//                window.top.location.href = "../../thanks/" + lang;
//            }


//        }
//    });

//}

function AllDiscountCoupons(lang) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=alldiscountcoupons&lang=' + lang,
        success: function (rtrn) {
            $('div#window').html(rtrn);
            $('div#window').fadeIn(200);
            $('div#sortingloading').hide(0);
        }
    });
}

function ortakOdemeForm(lang) {
    $('div#sortingloading').fadeIn(400);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=ortakodemeform&lang=' + lang,
        data: $('#ortakodemeform').serialize(),
        success: function (rtrn) {

            //alert(rtrn);

            //rtrn = JSON.parse(rtrn);

            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(300);
            }

            if (rtrn.status == 'ok') {
                window.top.location.href = location.href + '&3dform=ok';
            }
        }
    });
}

function OO_SelectInstallment(val, bank) {

    $('div#sortingloading').fadeIn(10);

    $.ajax({
        type: 'GET',
        url: '../../controller/ActionController.php?action=ooselectinstallment&val=' + val + '&bank=' + bank,
        success: function (rtrn) {

            //alert(rtrn);

            //rtrn = JSON.parse(rtrn);

            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(300);
            }

            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }
    });
}

function getIparaTaksitler(id, total, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=getiparataksitler&id=' + id + '&total=' + total + '&lang=' + lang,
        success: function (rtrn) {
            $('div#iparaTaksitler').html(rtrn);
            $('div#iparaTaksitler').fadeIn(100);
            $('div#sortingloading').hide(0);
        }

    });


}

function getMokaTaksitler(id, total, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=getmokataksitler&id=' + id + '&total=' + total + '&lang=' + lang,
        success: function (rtrn) {
            $('div#iparaTaksitler').html(rtrn);
            $('div#iparaTaksitler').fadeIn(100);
            $('div#sortingloading').hide(0);
        }

    });


}

function getPttTaksitler(id, total, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=getptttaksitler&id=' + id + '&total=' + total + '&lang=' + lang,
        success: function (rtrn) {
            $('div#iparaTaksitler').html(rtrn);
            $('div#iparaTaksitler').fadeIn(100);
            $('div#sortingloading').hide(0);
        }

    });


}

function getPttTaksitSec(taksit, bankid, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=getptttaksitSec&taksit=' + taksit + '&bankid=' + bankid + '&lang=' + lang,
        success: function (rtrn) {
            //alert(rtrn);
            $('div#sortingloading').hide(0);
        }

    });

}

function getMailOrderTaksitler(id, total, lang) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=getmailordertaksitler&id=' + id + '&total=' + total + '&lang=' + lang,
        success: function (rtrn) {
            $('div#mailorderTaksitler').html(rtrn);
            $('div#mailorderTaksitler').fadeIn(100);
            $('div#sortingloading').hide(0);
        }

    });


}


function SmsKalanSure(Baslangic) {

    //alert(Baslangic);

    if (Baslangic > 0) {
        Baslangic = Baslangic - 1;

        $('span#SmsKalanSure').html('Kalan Süre : ' + Baslangic);
        $('span#SmsKalanSure').fadeIn(0);


        setTimeout(function () {
            SmsKalanSure(Baslangic);
        }, 1000);




    }

    if (Baslangic == 0) {
        $('span#SmsKalanSure').html('Süre Bitti, yeni kod talep edebilirsiniz');
        $('span#SmsKalanSure').fadeIn(0);
        $('div#SmsDogrulamaKodAlani').hide(0);
        $('div#SmsDogrulamaYeniKod').show(0);
    }

}

function SmsDogrulama() {
    $.ajax({

        type: 'POST',
        url: '../../controller/ActionController.php?action=smsdogrulama',
        data: $('#sms_dogrulama').serialize(),
        success: function (rtrn) {

            //rtrn = JSON.parse(rtrn);

            if (rtrn.status == 'ex2') {
                var error = rtrn.Message;
                document.getElementById('errormsg').innerHTML = error;
                $('#error').fadeIn(100);
                $('div#sortingloading').fadeOut(300);
            }

            if (rtrn.status == 'ok') {
                window.top.location.href = location.href;
            }
        }

    });
}


function YKBOrder() {

    $('div#ykbOrderSubmit').fadeIn(200);
    $.ajax({
        type: 'POST',
        url: '../../payments/yapikredi/submit.php',
        data: $('#ykbPaymentForm').serialize(),

        success: function (rtrn) {
            $("#ykbOrderSubmitResult").html(rtrn);

        }
    });
}

function YKBOrder_bs() {

    $('div#ykbOrderSubmit').fadeIn(200);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=ykbPostbs',
        data: $('#ykbPaymentForm').serialize(),

        success: function (rtrn) {
            $("#ykbOrderSubmitResult").html(rtrn);

        }
    });
}

function ykbOrderSubmitClose() {
    $('div#ykbOrderSubmit').hide(0);
}

function PTTOrder() {

    $('div#pttOrderSubmit').fadeIn(200);
    $.ajax({
        type: 'POST',
        url: '../../payments/ptt-akilli-esnaf/submit.php',
        data: $('#pttPaymentForm').serialize(),

        success: function (rtrn) {
            $("#pttOrderSubmitResult").html(rtrn);

        }
    });
}

function PTTOrder_bs() {

    $('div#pttOrderSubmit').fadeIn(200);
    $.ajax({
        type: 'POST',
        url: '../../controller/ActionController.php?action=pttPostbs',
        data: $('#pttPaymentForm').serialize(),

        success: function (rtrn) {
            $("#pttOrderSubmitResult").html(rtrn);

        }
    });
}