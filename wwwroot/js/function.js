function windowclose() {
    $('div.windowbox').remove();
    $('div#window').fadeOut(0);
    $('div#windowpicture').fadeOut(0);
}

function windowclose_product() {
    $('div#window-product').fadeOut(0);
    $('div#windowpicture').fadeOut(0);
}

function windowclosepicture() {
    $('div#window-product').fadeOut(0);
    $('div#windowpicture').fadeOut(0);
}

function windowclose_picture() {
    $('div#window-picture').fadeOut(0);
}

function windowclose_news() {
    $('div#window-news').fadeOut(0);
}

function windowcloseVaryant() {
    //window.top.location.href=location.href;
    $('#windowVaryant').fadeOut(0);
}



function msgClose() {
    $('div#error').fadeOut(0);
    $('div#success').fadeOut(0);
}

function errorclose() {
    $('div#error').fadeOut(100);
    $('div#success').fadeOut(100);
}

function popupclose() {
    $('div#popup').fadeOut(100);
}


function PhoneMenu() {

    $('div#phone-menu-box').slideToggle(80);

}

function CategoriesPhone() {
    $('div#categories-phone').slideToggle(80);
}

function CategoriesPhoneOpen() {
    //alert('test');
    $('div#categories-phone').slideToggle(50);
}


function CategoriesPhoneClose() {
    $('div#c_p').fadeOut(200);
}

function MobileErrorClose_V4() {

    $('div#error').animate({
        'right': '-100%'
    }, 150);

    $('div#error').animate({
        'right': '-90%'
    }, 40);

    $('div#error').animate({
        'right': '-100%'
    }, 40);

}

function MobileWindowClose_V4() {

    $('div#window').animate({
        'right': '-100%'
    }, 150);

    $('div#window').animate({
        'right': '-90%'
    }, 40);

    $('div#window').animate({
        'right': '-100%'
    }, 40);

}

function MobileNewAdressBarClose_V4() {

    $('div#newadressbar').animate({
        'right': '-100%'
    }, 150);

    $('div#newadressbar').animate({
        'right': '-90%'
    }, 40);

    $('div#newadressbar').animate({
        'right': '-100%'
    }, 40);

}

function MobileMenuOpen() {
    $('ul#navmenu-web').slideToggle(50);
}

function MobileMenu_V4(lang) {

    $('div#mobile-menu').animate({
        'left': '0px'
    }, 150);
}

function MobileListing_V4(lang) {

    $('div#mobile-listing').animate({
        'left': '0px'
    }, 150);
}

function MobileListingClose_V4(lang) {

    $('div#mobile-listing').animate({
        'left': '-70%'
    }, 150);
}


function MobileMenuClose_V4(lang) {

    $('div#mobile-menu').animate({
        'left': '-70%'
    }, 150);
}

function MobileCategories_V4(lang) {

    $('div#mobile-categories').slideToggle(200);

}

function MobileSubPages(id, lang) {

    $.ajax({

        type: 'GET',
        url: '../../controller/ActionController.php?action=mobilesubpages&id=' + id + '&lang=' + lang,
        success: function (rtrn) {

            $('div#mobile-sub-pages' + id).html(rtrn);
            $('div#mobile-sub-pages' + id).slideToggle(200);

        }

    });

}

function SayiKontrol(e) {
    olay = document.all ? window.event : e;
    tus = document.all ? olay.keyCode : olay.which;
    if (tus < 48 || tus > 57) {
        if (document.all) {
            olay.returnValue = false;
        } else {
            olay.preventDefault();
        }
    }
}

function HarfKontrol(e) {
    olay = document.all ? window.event : e;
    tus = document.all ? olay.keyCode : olay.which;
    if (tus >= 48 && tus <= 57) {
        if (document.all) {
            olay.returnValue = false;
        } else {
            olay.preventDefault();
        }
    }
}

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        errorclose();
        $('div#window-product').fadeOut(0);
    }
});