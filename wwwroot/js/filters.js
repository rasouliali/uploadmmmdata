function filtersOpen() {

    $('aside#products-left').slideToggle(300);

}

function removeVariableFromURL(url_string, variable_name) {

    var URL = String(url_string);
    var regex = new RegExp("\\?" + variable_name + "=[^&]*&?", "gi");
    URL = URL.replace(regex, '?');
    regex = new RegExp("\\&" + variable_name + "=[^&]*&?", "gi");
    URL = URL.replace(regex, '&');
    URL = URL.replace(/(\?|&)$/, '');
    regex = null;
    return URL;


}

// form_tc()
function form_tc(Text) {
    return Text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

function sorting(val, productgroup, lang, q) {

    $('div#sortingloading').fadeIn(400);
    var keySearch = $("[name=keysearch]").val();
    var productTypes = "";
    $('input[type="checkbox"]:checked.product-type').each(function () {
        productTypes += "," + $(this).attr("data-value");
    });
    var prodSort = $('#product-sort').val();
    var prodStok = $('#product-in-stock').val();
    $.ajax({

        type: 'POST',
        url: '/filterproduct?productType=' + productTypes + '&keySearch=' + keySearch + '&productgroup='
            + productgroup + '&pricfrom=' + $('[name="sortingprice1"]').val()
            + '&pricto=' + $('[name="sortingprice2"]').val() + '&lang=' + lang + '&sorting=' + val
            + '&stock=' + prodStok,
        success: function (rtrn) {
            $('#filter-data').html(rtrn);

            //$('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            //MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href, 'sorting');
            //url_ = removeVariableFromURL(url_, 'pages');
            //pushStateUrl_ = url_ + '&sorting=' + val;
            //pushStateUrl = pushStateUrl_.replace('&&', '&');
            //pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            //history.pushState('', '', pushStateUrl);

            //window.top.location.href = location.href;

        }

    });

}

function sortingStok(val, productgroup, lang, q) {

    $('div#sortingloading').fadeIn(400);
    var prodSort = $('#product-sort').val();
    var prodStok = $('#product-in-stock').val();
    $('div#sortingloading').fadeIn(400);
    var keySearch = $("[name=keysearch]").val();
    var productTypes = "";
    $('input[type="checkbox"]:checked.product-type').each(function () {
        productTypes += "," + $(this).attr("data-value");
    });
    $.ajax({
        type: 'POST',
        url: '/filterproduct?productType=' + productTypes + '&keySearch=' + keySearch + '&productgroup='
            + productgroup + '&pricfrom=' + $('[name="sortingprice1"]').val()
            + '&pricto=' + $('[name="sortingprice2"]').val() + '&lang=' + lang + '&sorting=' + prodSort +
            '&stock=' + prodStok,
    //$.ajax({

    //    type: 'GET',
    //    url: '../../controller/ProductsController.php?action=sortingstok&sortingstok=' + val + '&catid=' + catid + '&listtype=' + ListType + '&lang=' + lang + '&q=' + q,
        success: function (rtrn) {

            $('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href, 'sortingstok');
            //url_ = removeVariableFromURL(url_, 'pages');
            //pushStateUrl_ = url_ + '&sortingstok=' + val;
            //pushStateUrl = pushStateUrl_.replace('&&', '&');
            //pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            //history.pushState('', '', pushStateUrl);

            //window.top.location.href = location.href;

        }

    });

}

function SortingModel(val, id, catid, ListType, lang, q) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ProductsController.php?action=sortingmodel&sortingmodel=' + encodeURIComponent(val) + '&id=' + id + '&catid=' + catid + '&listtype=' + ListType + '&lang=' + lang + '&q=' + q,
        success: function (rtrn) {

            $('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href , 'sortingmodel');

            /*
            var s = top.location.href.search("sortingmodel="+val);

            if(s==-1){
            pushStateUrl_ = top.location.href+'&sortingmodel='+val;
            }else{
            pushStateUrl_ = top.location.href.replace('&sortingmodel='+val , '');
            }
            */

            var s = decodeURIComponent(top.location.href).search("sortingmodel=" + val + '&sortingid=' + form_tc(val));

            if (s == -1) {
                pushStateUrl_ = top.location.href + '&sortingmodel=' + val + '&sortingid=' + form_tc(val);
            } else {
                pushStateUrl_ = decodeURIComponent(top.location.href).replace('&sortingmodel=' + val + '&sortingid=' + form_tc(val), '');
            }

            pushStateUrl = pushStateUrl_.replace('&&', '&');
            pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            history.pushState('', '', pushStateUrl);

            window.top.location.href = location.href;


        }

    });

}

function SortingAttribute(val, id, catid, ListType, lang, q) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ProductsController.php?action=sortingattribute&sortingattribute=' + encodeURIComponent(val) + '&id=' + id + '&catid=' + catid + '&listtype=' + ListType + '&lang=' + lang + '&q=' + q,
        success: function (rtrn) {

            $('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href , 'sortingmodel');

            /*
            var s = top.location.href.search("sortingmodel="+val);

            if(s==-1){
            pushStateUrl_ = top.location.href+'&sortingmodel='+val;
            }else{
            pushStateUrl_ = top.location.href.replace('&sortingmodel='+val , '');
            }
            */

            var s = top.location.href.search("sortingattribute=" + encodeURIComponent(val));

            if (s == -1) {
                pushStateUrl_ = top.location.href + '&sortingattribute=' + encodeURIComponent(val);
            } else {
                pushStateUrl_ = top.location.href.replace('&sortingattribute=' + encodeURIComponent(val), '');
            }

            pushStateUrl = pushStateUrl_.replace('&&', '&');
            pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            history.pushState('', '', pushStateUrl);

            window.top.location.href = location.href;


        }

    });

}


function SortingColor(productgroup, lang, q) {

    $('div#sortingloading').fadeIn(400);
    var prodSort = $('#product-sort').val();
    var prodStok = $('#product-in-stock').val();
    var keySearch = $("[name=keysearch]").val();
    var productTypes = "";
    var keySearch = $("[name=keysearch]").val();
    $('input[type="checkbox"]:checked.product-type').each(function () {
        productTypes += "," + $(this).attr("data-value");
    });
    $.ajax({

        type: 'POST',
        url: '/filterproduct?productType=' + productTypes + '&keySearch=' + keySearch+'&productgroup='
            + productgroup + '&pricfrom=' + $('[name="sortingprice1"]').val()
            + '&pricto=' + $('[name="sortingprice2"]').val() + '&lang=' + lang + '&sorting=' + prodSort +
            '&stock=' + prodStok,
        //url: '../../controller/ProductsController.php?action=sortingcolor&sortingcolor=' + val + '&catid=' + catid + '&listtype=' + ListType + '&lang=' + lang + '&q=' + q,
        success: function (rtrn) {
            $('#filter-data').html(rtrn);
            //$('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href , 'sortingcolor');

            //var c = decodeURIComponent(top.location.href).search("sortingcolor=" + val);

            //if (c == -1) {
            //    pushStateUrl_ = decodeURIComponent(top.location.href) + '&sortingcolor=' + val;
            //} else {
            //    pushStateUrl_ = decodeURIComponent(top.location.href).replace('&sortingcolor=' + val, '');
            //}

            //pushStateUrl = pushStateUrl_.replace('&&', '&');
            //pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            //history.pushState('', '', pushStateUrl);

            //window.top.location.href = location.href;

        }

        //});

    });
}

function SortingBrand(val, brandid, catid, ListType, lang, q) {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ProductsController.php?action=sortingbrand&sortingbrand=' + val + '&brandid=' + brandid + '&catid=' + catid + '&listtype=' + ListType + '&lang=' + lang + '&q=' + q,
        success: function (rtrn) {

            $('#filtersresult').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href , 'sortingbrand');

            var b = decodeURIComponent(top.location.href).search("sortingbrand=" + val);

            if (b == -1) {
                pushStateUrl_ = top.location.href + '&sortingbrand=' + val;
            } else {
                pushStateUrl_ = decodeURIComponent(top.location.href).replace('&sortingbrand=' + val, '');
            }

            pushStateUrl = pushStateUrl_.replace('&&', '&');
            pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            history.pushState('', '', pushStateUrl);

            window.top.location.href = location.href;

        }

    });

}

function SortingPriceBetween(catid, productgroup, lang, q) {

    $('div#sortingloading').fadeIn(400);

    var prodSort = $('#product-sort').val();
    var prodStok = $('#product-in-stock').val();
    var keySearch = $("[name=keysearch]").val();
    var productTypes = "";
    $('input[type="checkbox"]:checked.product-type').each(function () {
        productTypes += "," + $(this).attr("data-value");
    });
    $.ajax({

        type: 'POST',
        url: '/filterproduct?productType=' + productTypes + '&keySearch=' + keySearch + '&productgroup=' + productgroup
            + '&pricfrom=' + $('[name="sortingprice1"]').val() + '&pricto='
            + $('[name="sortingprice2"]').val() + '&lang=' + lang
            + '&sorting=' + prodSort +
                '&stock=' + prodStok,
        //data:$('#sortingpriceform').serialize(),
        success: function (rtrn) {

            $('#filter-data').html(rtrn);
            $('div#sortingloading').fadeOut(400);
            $('#filtersresult').fadeIn(1000);
            //$("html,body").stop().animate({ scrollTop: "170" }, 500);
            $('div#products-left_').fadeIn(400);

            MobileListingClose_V4(lang);

            //url_ = removeVariableFromURL(top.location.href, 'sortingprice1');
            //url_ = removeVariableFromURL(url_, 'sortingprice2');

            //pushStateUrl_ = url_ + '&' + $('#sortingpriceform').serialize();
            //pushStateUrl = pushStateUrl_.replace('&&', '&');
            //pushStateUrl = pushStateUrl.replace('?gclid=', '&gclid=');
            //history.pushState('', '', pushStateUrl);

            //window.top.location.href = location.href;

        }

    });

}

function ClearFilters() {

    $('div#sortingloading').fadeIn(400);

    $.ajax({

        type: 'GET',
        url: '../../controller/ProductsController.php?action=clearfilters',
        success: function (rtrn) {

            if (rtrn == 'ok') {

                url_1 = removeVariableFromURL(top.location.href, 'listtype');
                url_2 = removeVariableFromURL(url_1, 'sorting');
                url_3 = removeVariableFromURL(url_2, 'sortingmodel');
                url_4 = removeVariableFromURL(url_3, 'sortingcolor');
                url_5 = removeVariableFromURL(url_4, 'sortingstok');
                url_6 = removeVariableFromURL(url_5, 'sortingbrand');
                url_7 = removeVariableFromURL(url_6, 'sortingprice1');
                url_ = removeVariableFromURL(url_7, 'sortingprice2');

                window.top.location.href = url_;

            }
        }

    });

}