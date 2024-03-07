/*
 * Interface enhancements for Spesati template.
 *
 * Load all user data when ready and add event listeners.
 */

$(document).ready(function() {

    // Change event for apple mobile dispositives
    var $ua = navigator.userAgent;
    var $eventTouchstart = ($ua.match(/(iPod|iPhone|iPad)/i)) ? "touchstart" : "click";
    var $eventTouchend = ($ua.match(/(iPod|iPhone|iPad)/i)) ? "touchend" : "click";
    var selector = 'div#menuCategoriesMobile > ul > li > ul > li';
    var documentClick = "";

    $(selector).on($eventTouchstart, function() {
        documentClick = true;
    });
    $(selector).on("touchmove", function() {
        if (($ua.match(/(iPod|iPhone|iPad)/i))) {
            documentClick = false;
        }
    });

    /*
     * Load user details.
     *
     * Will also send relevant variable to perform all server side tagging on the data/cart
     * endpoint. The variable is output provided by the cacheable HTML output.
     */
    var data = {};
    if(window.track !== undefined) {
        data = window.track;
    }
     $.ajax({
         type: "GET",
         beforeSend: function(request) {
             request.setRequestHeader("Accept", "application/json");
             request.setRequestHeader("Server-Tagging", JSON.stringify(data));
         },
         url: "/Home/GetNow?id=0",
         success: function (resdata) {
             var jData = JSON.parse(resdata);
             if (jData.status || jData.Status) {

                 jData= {
                     "guest": false,
                     "total": 0,
                     "netTotal": 0,
                     "products": [],
                     "visited": false,
                     "mailchimp_id": false,
                     "total_discounted": 0,
                     "discount_data": null,
                     "establishment": "Olbia",
                     "address": null,
                     "courrier": true
                 };
             }
             updateCartInterface(jData);
             updateUserInterface(jData);
             updateEstablishmentInterface(jData);
             headerCartSlider(jData);
             voucherApply(jData);
         }
     });

    /*
     * Remember me function for oAuth.
     */
    $("#rememberSocial").click(function() {
        var fUrl = $("#login-facebook").attr("href");
        var gUrl = $("#login-google").attr("href");
        
        if(($("#rememberSocial > input").is(':checked'))) {
            fUrl = fUrl.replace(/&state=live/g, "");
            gUrl = gUrl.replace(/&state=live/g, "");
            $("#login-facebook").attr("href", fUrl + "&state=remember");
            $("#login-google").attr("href", gUrl + "&state=remember");
        } else {
            fUrl = fUrl.replace(/&state=remember/g, "");
            gUrl = gUrl.replace(/&state=remember/g, "");
            $("#login-facebook").attr("href", fUrl + "&state=live");
            $("#login-google").attr("href", gUrl + "&state=live");
        }
    });

    /*
     * Fill menu on scroll.
     */
    navHeight = parseInt($('#menuCategories').css('height'));
    headHeight = parseInt($('#header').css('height'))
    if (isNaN(navHeight)) {
        navHeight = headHeight;
    }

    /*
     * Scroll menu style change.
     */
    $(window).scroll(function() {
        if ($(window).width() > 500) {
            if ($(this).scrollTop() > (navHeight)) {
                $('#header').addClass('scroll');
            } else {
                $('#header').removeClass('scroll');
            }
        }
    });

    /*
     * Ensure session is shared across domains when switching sites.
     */
    $('.switch-site').click(function() {
        var target = $(this).attr("href");
        event.preventDefault();

        // Select correct hostname
        // TODO: make logic dynamic
        var host = window.location.hostname;
        if (host == "www.spesati.com") {
            host = "www.spesati.it";
        } else {
            host = "www.spesati.com";
        }

        // Retrieve ID
        // Send request to session handler
        $.ajax({
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Accept", "application/json");
            },

            url: "/data/switch-site",
            success: function(data) {
                var data = {
                    id: data.id
                };
                // Send request to new host
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("Accept", "application/json");
                        request.setRequestHeader("doCMS-SES", "no-session");
                    },
                    url: "//" + host + "/data/switch-site",
                    data: JSON.stringify(data),
                    success: function(data) {
                        window.location = target;
                    }
                });
            }
        });
    });

    /*
     * Click event for list.
     */
    $('.list h3').click(function() {
        if ($(this).hasClass("black") || $(this).hasClass("red")) {
            $(this).toggleClass('red black');
            $(this).children('i').toggleClass('fa-angle-down fa-angle-up');
            $(this).next().toggle();
        }
    });

    /*
     * Reload order.
     */
    $(".reload").click(function(e) {
        e.preventDefault();

        var reload_notice = $('#js-texts input[name=reload_cart]').val();
        alert(reload_notice);

        var id = $(this).parent().parent().attr("data-id");
        $('#orderReload').val(id);
        document.forms["formReloadOrder"].submit();
        return false;
    });

    /*
     * Reload the last saved cart.
     * The difference with the callback on .reload is that the first involves an
     * existing order, with a given ID, while the second get the order from the
     * "saved carts" table
     */
    $('.reload-last-saved').click(function() {
        loadCart();
    });

    /*
     * Scroll to form address checkout page.
     */

    $("#expandDiv").click(function(e) {
        e.preventDefault();

        $(this).toggleClass('open close');
        $(this).children('i').toggleClass('fa-angle-down fa-angle-up');
        $(this).next().toggle();
        if ($(this).hasClass("open")) {
            $(this).next().css("display", "inline-block");
            $('html, body').animate({
                scrollTop: $(this).next().offset().top - 250
            }, 'slow');
        } else {
            $(this).next().css("display", "none");
        }
    });

    /*
     * Delete customer address.
     */
    $(".delete").click(function(e) {
        e.preventDefault();
        var id = $(this).parent().attr("data-id");
        $('#addressDelete').val(id);
        document.forms["formDeleteAddress"].submit();
        return false;
    });

    /*
     * Delete customer invoicing details.
     */
    $(".deleteInvoice").click(function(e) {
        e.preventDefault();
        var id = $(this).parent().attr("data-id");
        $('#invoiceDelete').val(id);
        document.forms["formDeleteInvoice"].submit();
        return false;
    });

    /*
     * Populates modify address form.
     */
    $(".modify").click(function(e) {
        e.preventDefault();
        var parent = $(this).parent();
        var id = $(this).parent().attr("data-id");

        // Split name
        var name = parent.find('.modifyName').text();
        var i = name.indexOf(" ");
        var firstname = name.substr(0, i);
        var surname = name.substr(i + 1);
        var country = parent.find('.modifyCountry').text();
        var region = parent.find('.modifyState').text();
        var city = parent.find('.modifyCity').text();
        // Populate form
        $('#name').val(firstname);
        $('#surname').val(surname);
        $('#nameAddress').val(parent.find('.modifyDescription').text());
        $('#addressForm').val(parent.find('.modifyStreet1').text());
        $('#addressDetailed').val(parent.find('.modifyStreet2').text());
        $('#postal_code').val(parent.find('.modifyZip').text());
        $('#phone').val(parent.find('.modifyTelephone').text());
        $('#primary').prop('checked', parent.find('.primaryAddress').length != 0);
        $('select#country option[value="' + country + '"]').attr("selected", "selected");
        $('#addressId').val(id);

        // Controll country
        if ((country == 'IT') || ($("select[name=country]").val() == 'IT')) {
            $('#municipality').parent().removeClass("right").addClass("left");
            $('#postal_code').parent().removeClass("left").addClass("right");
            $('#addressForm').parent().removeClass("right").addClass("left");
            $('#addressDetailed').parent().removeClass("left").addClass("right");
            $('#phone').parent().removeClass("right").addClass("left");
            $('select#region').show();
            $('input#administrative_area_level_1').hide();
            $('.province').show();
            $('select#province').show();
            $('input#province_1').hide();
            $('select#municipality').show();
            $('input#municipality_1').hide();

            // Controll if region exist
            if ($('select#region option[value="' + region + '"]').val()) {
                $('select#region option[value="' + region + '"]').attr("selected", "selected");

                // Controll if is sardinia region
                if (region == 'Sardegna') {

                    // Controll if municipality exist
                    if ($('select#municipality option[value="' + city + '"]').val()) {
                        $('select#province').attr('disabled', false);
                        $('select#municipality').attr('disabled', false);
                        $('select#municipality option[value="' + city + '"]').attr("selected", "selected");
                    } else {
                        parent.find('.modifyCity').val("");
                        $('select#municipality').val($("#municipality option:first").val());
                    }
                } else {
                    $('input#municipality_1').val(city);
                    $('select#province').hide();
                    $('input#province_1').show();
                    $('select#municipality').hide();
                    $('input#municipality_1').show();
                }
            } else {
                parent.find('.modifyState').val("");
                $('select#region').val($("#region option:first").val());
                $('select#province').val($("#province option:first").val());
                $('select#municipality').val($("#municipality option:first").val());
                $('select#province').attr('disabled', true);
                $('select#municipality').attr('disabled', true);
            }
        } else {
            $('select#region').hide();
            $('input#administrative_area_level_1').show();
            $('.province').hide();
            $('select#municipality').hide();
            $('input#municipality_1').show();
            $('input#administrative_area_level_1').val(region);
            $('#municipality_1').val(city);
            $('#municipality_1').parent().removeClass("left").addClass("right");
            $('#postal_code').parent().removeClass("right").addClass("left");
            $('#addressForm').parent().removeClass("left").addClass("right");
            $('#addressDetailed').parent().removeClass("right").addClass("left");
            $('#phone').parent().removeClass("left").addClass("right");
        }

        $('#formAddress').fadeIn().css("display", "inline-block");
        $('html,body').animate({
            scrollTop: $("#formAddress").offset().top - 400
        }, 'slow');

        $('.addAddress').hide();
        $('.modifyAddress').show();
    });

    /*
     * Scroll to form address profile page.
     */
    $("#addAddress").click(function(e) {
        e.preventDefault();
        $('#formAddress').fadeIn().css("display", "inline-block");
        $('html, body').animate({
            scrollTop: $("#formAddress").offset().top - 400
        }, 'slow');

        $('.addAddress').show();
        $('.modifyAddress').hide();
    });

    /*
     * Populates modify invoicing form.
     */
    $(".modifyInvoice").click(function(e) {
        e.preventDefault();
        var parent = $(this).parent();
        var id = $(this).parent().attr("data-id");

        // Split name
        var name = parent.find('.modifyName').text();
        var vatNumber = parent.find('.modifyVatNumber').text();
        var pec = parent.find('.modifyPEC').text();
        var destinationCode = parent.find('.modifyDestinationCode').text();
        var street1 = parent.find('.modifyStreet1').text();
        var street2 = parent.find('.modifyStreet2').text();
        var zip = parent.find('.modifyZip').text();
        var city = parent.find('.modifyCity').text();
        var region = parent.find('.modifyState').text();
        var country = parent.find('.modifyCountry').text();
        var phone = parent.find('.modifyTelephone').text();

        // Populate form
        $('#company').val(name);
        $('#companyVatNumber').val(vatNumber);
        $('#companyDestinationCode').val(destinationCode);
        $('#companyAddress1').val(street1);
        $('#companyAddress2').val(street2);
        $('#companyPec').val(pec);
        $('select#companyCountry option[value="' + country + '"]').attr("selected", "selected");
        $('#companyRegion').val(region);
        $('#companyLocality').val(city);
        $('#companyPostalCode').val(zip);
        $('#companyPhone').val(phone);
        $('#invoiceId').val(id);

        $('#invoiceForm').fadeIn().css("display", "inline-block");
        $('html, body').animate({
            scrollTop: $("#invoiceForm").offset().top - 400
        }, 'slow');

        $('.addDetails').hide();
        $('.modifyDetails').show();
    });

    /*
     * Scroll to form invoice profile page.
     */
    $("#addInvoice").click(function(e) {
        e.preventDefault();
        $('#invoiceForm').fadeIn().css("display", "inline-block");
        $('html, body').animate({
            scrollTop: $("#invoiceForm").offset().top - 400
        }, 'slow');

        $('.addDetails').show();
        $('.modifyDetails').hide();
    });

    /*
     * Click event for add to cart button. Adds single product to cart.
     */
    $(document).on('click', '.button.addToCart', function(e) {
        e.preventDefault();
        var p = {
            name: $(this).parents(".product").attr("data-name"),
            id: $(this).parents(".product").attr("data-id"),
            price: $(this).parents(".product").attr("data-price"),
            category: $(this).parents(".product").attr("data-category"),
            quantity: 1,
        }

        //trackAddCart(p);
        alterProduct(p.id, p.quantity);
    });

    /*
     * Click event on plus and minus buttons.
     */
    $(document).on('click', '.removeQuantity, .addQuantity', function() {
        var p = {
            name: $(this).parents(".product, .productSmall, .productRow").attr("data-name"),
            id: $(this).parents(".product, .productSmall, .productRow").attr("data-id"),
            price: $(this).parents(".product, .productSmall, .productRow").attr("data-price"),
            category: $(this).parents(".product, .productSmall, .productRow").attr("data-category"),
            quantity: 1,
        };

        var q = parseInt($(this).siblings("input.number").val());
        if ($(this).hasClass("removeQuantity")) {
            q -= 1;
            trackRemoveCart(p);
        } else {
            q += 1;
            trackAddCart(p);
        }

        alterProduct(p.id, q);
    });

    /*
     * On change event for manual product quantity input.
     */
    $(document).on('change', '.product input.number', function() {
        alterProduct($(this).parents(".product").attr("data-id"), $(this).val());
    });

    /*
     * On change event for manual product quantity input on cart page.
     */
    $(document).on('change', '.productRow input.number', function() {
        alterProduct($(this).parents(".productRow").attr("data-id"), $(this).val());
    });

    /*
     * Remove product from cart slider or checkout cart page.
     */
    $(document).on($eventTouchstart, '.removeProduct', function() {
        alterProduct($(this).parents(".productSmall, .productRow").attr("data-id"), 0);
    });

    /*
     * Menu list scroll down
     */
    $(selector).on($eventTouchend, function() {
        if (documentClick) {
            if ($(this).hasClass("open")) {
                $('i', this).removeClass("fa-angle-up");
                $('i', this).addClass("fa-angle-down");
                $('ul', this).fadeOut('500');
                $(this).removeClass("open");
            } else {
                $(this).addClass("open");
                $('i', this).removeClass("fa-angle-down");
                $('i', this).addClass("fa-angle-up");
                $(this).children().fadeIn('1000').show();
            }
        }
    });

    /*
     * Show menu on burger click
     */
    $('.fa-bars').on('click', function() {
        $("#menuCategoriesMobile").fadeIn('1500').show();
    });

    /*
     * Close menu on burger click
     */
    $('#menuCategoriesMobile .closeMenu').on('click', function() {
        $("#menuCategoriesMobile").fadeOut('1500');
    });

    /*
     * Fade toggle on previous order
     */
    $('.showOrder').on('click', function(e) {
        e.preventDefault();
        var id = $(this).parent().parent().attr("data-id");
        $('tr.' + id).fadeToggle('1500');
    });

    /*
     * Event on country change
     */
    $('select#province').attr('disabled', true);
    $('select#municipality').attr('disabled', true);

    $("select[name='country']").change(function() {
        $('select#province').attr('disabled', true);
        $('select#municipality').attr('disabled', true);
        $('select#region').val($("#region option:first").val());
        $('input#administrative_area_level_1').val('');
        $('select#province').val($("#province option:first").val());
        $('input#province_1').val('');
        $('select#municipality').val($("#municipality option:first").val());
        $('input#municipality_1').val('');
        if ($("select[name=country]").val() == 'IT') {
            $('#municipality').parent().removeClass("right").addClass("left");
            $('#postal_code').parent().removeClass("left").addClass("right");
            $('#addressForm').parent().removeClass("right").addClass("left");
            $('#addressDetailed').parent().removeClass("left").addClass("right");
            $('#phone').parent().removeClass("right").addClass("left");
            $('select#region').show();
            $('input#administrative_area_level_1').hide();
            $('.province').show();
            $('select#province').show();
            $('input#province_1').hide();
            $('select#municipality').show();
            $('input#municipality_1').hide();
        } else {
            $('select#region').hide();
            $('input#administrative_area_level_1').show();
            $('.province').hide();
            $('select#municipality').hide();
            $('input#municipality_1').show();
            $('#municipality_1').parent().removeClass("left").addClass("right");
            $('#postal_code').parent().removeClass("right").addClass("left");
            $('#addressForm').parent().removeClass("left").addClass("right");
            $('#addressDetailed').parent().removeClass("right").addClass("left");
            $('#phone').parent().removeClass("left").addClass("right");
        }
    });

    /*
     * Event on province change
     */
    $("select[name='region']").change(function() {
        $('select#province').attr('disabled', false);
        $('select#municipality').attr('disabled', false);
        $('select#province').val($("#province option:first").val());
        $('input#province_1').val('');
        $('select#municipality').val($("#municipality option:first").val());
        $('input#municipality_1').val('');
        if ($("select[name=region]").val() == 'Sardegna') {
            $('select#province').val($('#province option[value="Sassari"]').val()).attr("selected", "selected");
            $('select#province').show();
            $('input#province_1').hide();
            var Value = $("select[name=province]").val();
            $('select#municipality').val($('#municipality option[value="Olbia"]').val());
            $('select#municipality option[class="' + Value + '"]').show();
            $('select#municipality option[class!="' + Value + '"]').hide();
            $('select#municipality').show();
            $('input#municipality_1').hide();
        } else {
            $('select#province').hide();
            $('input#province_1').show();
            $('select#municipality').hide();
            $('input#municipality_1').show();
        }
    });

    /*
     * Event on municipality change
     */
    $("select[name='province']").change(function() {
        var Value = $("select[name=province]").val();
        $('select#municipality').val($("#municipality option:first").val());
        $('input#municipality_1').val('');
        $('select#municipality option[class="' + Value + '"]').show();
        $('select#municipality option[class!="' + Value + '"]').hide();
    });


    /*
     * Dropdown menu
     */
    $(".account").on($eventTouchstart, function(e) {
        e.preventDefault();
        $('#dropdown').fadeToggle('1000');
        if ($(".account i").hasClass('on')) {
            $(".account i").removeClass('on');
            $('#header header').delay('200').queue(function(next) {
                $(this).css('overflow', 'hidden');
                next();
            });
        } else {
            $(".account i").addClass('on');
            $('#header header').css({
                'overflow': 'inherit'
            });
        }
    });

    /*
     * Form submit
     */
    $('.submitForms').click(function() {
        var id = $(this).parent().parent().attr('id');

        $('#orderId').val($('#orderId' + id).val());
        $('#numReceipt').val($('#numReceipt' + id).val());
        $('#invoicingId').val($('#invoicingId' + id).val());
        $('#username').val($('#username' + id).val());
        $('#createInvoice').submit();
        return true;
    });

    $('.goToCheckout').click(function(e){
        e.preventDefault();
        checkMinAmountInCart();
    });

    $('[data-el-spesati="voucher-apply"]').click(function(e){
        e.preventDefault();
        let data = $('#promoCode').val();
        voucherApplyApi(data);
    });

    $('[data-el-spesati="voucher-delete"]').click(function(e){
        e.preventDefault();
        voucherDeleteApi();
    });
});

/*
 * Monitor document changes.
 */
$(document).on("change", "#orderProd", function() {
    var sortingMethod = $(this).val();
    if (sortingMethod == 'nameAsc') {
        sortProductsNameAscending();
    } else if (sortingMethod == 'nameDes') {
        sortProductsNameDescending();
    } else if (sortingMethod == 'priceHigh') {
        sortProductsPriceDescending();
    } else if (sortingMethod == 'priceLow') {
        sortProductsPriceAscending();
    } else if (sortingMethod == 'available') {
        sortProductsAvailable();
    } else if (sortingMethod == 'soldAsc') {
        sortProductsBestSelling();
    }
});

/*
 * Sort products by name ascending.
 */
function sortProductsNameAscending() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(a).data("name").localeCompare($(b).data("name"));
    });
    $(".containerProduct").html(products);
}

/*
 * Sort products by name descending.
 */
function sortProductsNameDescending() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(b).data("name").localeCompare($(a).data("name"));
    });
    $(".containerProduct").html(products);
}

/*
 * Sort products by price ascending.
 */
function sortProductsPriceAscending() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(a).data("price") - $(b).data("price");
    });
    $(".containerProduct").html(products);
}

/*
 * Sort products by price descending.
 */
function sortProductsPriceDescending() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(b).data("price") - $(a).data("price");
    });
    $(".containerProduct").html(products);
}

/*
 * Sort products by availability.
 */
function sortProductsAvailable() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(b).data("available").localeCompare($(a).data("available"));
    });
    $(".containerProduct").html(products);
}

function sortProductsBestSelling() {
    var products = $('.product');
    products.sort(function(a, b) {
        return $(b).data("bestselling") - $(a).data("bestselling");
    });
    $(".containerProduct").html(products);
}

/*
 * Generates button for product quantity in the product preview format.
 */
function generateProductButtons(val) {
    return '<span class="bgDarkerGrey white fa-stack fa-lg removeQuantity">' +
        '<i class="fa fa-minus" aria-hidden="true"></i>' +
        '</span>' +
        '<input class="number" type="text" onkeypress="return isNumber(event)" value="' + val + '">' +
        '<span class="bgRed white fa-stack fa-lg addQuantity">' +
        '<i class="fa fa-plus" aria-hidden="true"></i>' +
        '</span>';
}

/*
 * Generates button to add product to cart.
 */
function generateAddProductButton() {
    return '<a class="button bgRed white addToCart" href="#">' + addText + '</a>';
}

/*
 * Generates product preview for cart slider.
 */
function generateProductSliderPreview(id, q, preview, link, category) {
    if (preview == "") {
        preview = "missing-image/missing-image.jpg";
    }
    return '<li>' +
        '<div class="productSmall" data-id="' + id + '" data-category="' + category + '">' +
        '<a href="' + link + '">' +
        '<div style="background-image: url(' + preview + ')"></div>' +
        '</a>' +
        '<div class="cross removeProduct">' +
        '<span class="fa-stack fa-lg bgRed"><i class="fa fa-times" aria-hidden="true"></i></span>' +
        '</div>' +
        '<div class="addcart">' +
        '<span class="minus fa-stack fa-lg removeQuantity bgDarkerGrey"><i class="fa fa-minus" aria-hidden="true"></i></span>' +
        '<input class="number" type="text" onkeypress="return isNumber(event)" value="' + q + '">' +
        '<span class="plus fa-stack fa-lg addQuantity bgRed"><i class="fa fa-plus" aria-hidden="true"></i></span>' +
        '</div>' +
        '</div>' +
        '</li>';
}

/*
 * Google tracking. Implements only +1 add to cart.
 * TODO: Manual nquantity umber input tracking.
 */
function trackAddCart(p) {
    // TODO: server side for better parameter list
    //gtag("event", "add_to_cart", {
    //  currency: "EUR",
    //  value: p.price,
    //  items: [
    //    {
    //      item_id: p.id,
    //      item_name: p.name,
    //      item_category: p.category,
    //      price: p.price,
    //      quantity: 1
    //    }
    //  ]
    //});
}

/*
 * Google tracking. Implements only -1 add to cart.
 * TODO: Manual nquantity umber input tracking.
 */
function trackRemoveCart(p) {
    //gtag("event", "remove_from_cart", {
    //  currency: "EUR",
    //  value: p.price,
    //  items: [
    //    {
    //      item_id: p.id,
    //      item_name: p.name,
    //      item_category: p.category,
    //      price: p.price,
    //      quantity: 1
    //    }
    //  ]
    //});
}

/*
 * Given a product ID and a quantity will update the cart.
 */
function alterProduct(id, q) {
    var data = {
        id: parseInt(id),
        q: parseInt(q)
    }
    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Accept", "application/json");
        },
        url: '/Home/GetNow?id=' + id + '&lang=tr&adet=' + q,
        data: JSON.stringify(data),
        success: function (resdata) {
            var jdata = JSON.parse(resdata);

            if (jData.status || jData.Status) {
                return;
            }
            headerCartSlider(jdata);
            updateCartInterface(jdata);
            voucherApply(jdata);
        }
    });
}

async function saveCart() {
    let save_button = $('#shipping-cart-options .save-cart');
    save_button.prop('disabled', true);

    return $.ajax({
        url: save_button.attr('data-endpoint-auth'),
        method: 'GET',
        dataType: 'JSON',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        accepts: {
            json: 'application/json'
        },
        success: function() {
            let color = save_button.css('background-color');
            save_button.css('background-color', '#387452');
            setTimeout(function() {
                save_button.css('background-color', color);
            }, 1000);
        },
        done: function() {
            save_button.prop('disabled', false);
        }
    });
}

function loadCart() {
    var reload_notice = $('#js-texts input[name=reload_cart]').val();
    alert(reload_notice);

    let load_button = $('#shipping-cart-options .load-cart');
    load_button.prop('disabled', true);

    $.ajax({
        url: load_button.attr('data-endpoint-auth'),
        method: 'GET',
        dataType: 'JSON',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        accepts: {
            json: 'application/json'
        },
        success: function(data) {
            if (data.status == 'ok') {
                window.location = $('#shipping-cart-options').find('.goto-cart').attr('href');
            }
        },
        done: function() {
            load_button.prop('disabled', false);
        }
    });
}

function checkMinAmountInCart() {
    let goToCheckout_button = $('.goToCheckout');

    return $.ajax({
        url: goToCheckout_button.attr('data-endpoint-auth'),
        method: 'GET',
        dataType: 'JSON',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        accepts: {
            json: 'application/json'
        },
        success: function(data) {
            if(data["status"] === "ko") {
                alert(goToCheckout_button.attr('data-min-message'));
            } else if(data["status"] === "ok") {
                window.location = goToCheckout_button[0].href;
            }
        }
    });
}

function voucherApplyApi(data) {
    let voucherApply_button = $('[data-el-spesati="voucher-apply"]');
    return $.ajax({
        type: "POST",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(request) {
            request.setRequestHeader("Accept", "application/json");
        },
        url: voucherApply_button.attr('data-endpoint-auth'),
        data: JSON.stringify(data),
        success: function(data) {
            if(data["status"] === "ok") {
                voucherApply(data['cart']);
                document.location.reload();
            } else {
                if(voucherApply_button.attr('data-error-message')) {
                    alert(voucherApply_button.attr('data-error-message'));
                } else if(typeof(data["message"])) {
                    alert(data["message"]);
                }
            }
        }
    });
}

function voucherDeleteApi() {
    let voucherDelete_button = $('[data-el-spesati="voucher-delete"]');

    return $.ajax({
        url: voucherDelete_button.attr('data-endpoint-auth'),
        method: 'GET',
        dataType: 'JSON',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        accepts: {
            json: 'application/json'
        },
        success: function(data) {
            if(data["status"] === "ok") {
                voucherDelete();
                document.location.reload();
            } else {
                if(voucherDelete_button.attr('data-error-message')) {
                    alert(voucherDelete_button.attr('data-error-message'));
                }
            }
        }
    });
}

function voucherApply(cart) {
    const header_price = $('#cartTotal');
    const cart_price_disc = $('#cartTotaldiscounted');
    const header_clone = header_price.clone(true, true);
    const cart_total = $('#cartTotalCheckout');
    const header_price_parent = header_price.parent();
    if (cart.total !== 0 &&
        cart["total_discounted"] < cart.total
    ) {
        if(cart["discount_data"] !== null && typeof cart["discount_data"]["cartDiscounted"] !== undefined && cart["discount_data"]["cartDiscounted"] >= 0 && cart["discount_data"]["voucherCode"]) {
            if(header_price.hasClass("priceDiscounted")) {
                header_price.parent().children('p').remove();
                header_clone.clone(true, true).attr("id", "totalDiscounted").appendTo(header_price_parent).text(`€${cart["discount_data"]["cartDiscounted"]}`).removeClass("priceDiscounted");
                header_clone.appendTo(header_price_parent).addClass("priceDiscounted");
            } else {
                header_clone.appendTo(header_price.parent()).addClass("priceDiscounted");
                header_price.attr("id", "totalDiscounted").text(`€${cart["discount_data"]["cartDiscounted"]}`);
            }
            if(cart_price_disc.length) {
                cart_price_disc.text(`€${cart["discount_data"]["cartDiscounted"]}`);
            }
        } else {
            header_price.parent().children('p').remove();
            cart_price_disc.closest('p').remove();
            header_clone.appendTo(header_price_parent).removeClass("priceDiscounted");
            cart_total.removeClass("priceDiscounted");
        }
    } else {
        header_price.parent().children('p').remove();
        cart_price_disc.closest('p').remove();
        header_clone.appendTo(header_price_parent).removeClass("priceDiscounted");
        cart_total.removeClass("priceDiscounted");
    }
}

function voucherDelete() {
    const header_price = $('#cartTotal');
    const cart_price_disc = $('#cartTotaldiscounted');
    const header_clone = header_price.clone(true, true);
    const cart_total = $('#cartTotalCheckout');
    const header_price_parent = header_price.parent();

    header_price.parent().children('p').remove();
    cart_price_disc.closest('p').remove();
    header_clone.appendTo(header_price_parent).removeClass("priceDiscounted");
    cart_total.removeClass("priceDiscounted");
}

function delayedCloseCartOptions() {
    setTimeout(function() {
        if ($('#shipping-cart-options:hover').length == 0) {
            $('#shipping-cart-options').css('display', 'none');
        }
    }, 500);
}

/*
 * Given cart data will update interface with correct values.
 */
function updateCartInterface(cart) {
    let options = $('#shipping-cart-options');

    if (options.attr('data-inited') == 'false') {
        /*
            Setups buttons for saved carts interactions
        */

        if (cart.guest) {
            options.find('.load-cart').remove();

            options.find('.save-cart').click(function() {
                window.location = $(this).attr('data-endpoint-noauth');
            });
        }
        else {
            options.find('.load-cart').click(function() {
                loadCart();
            });

            options.find('.save-cart').click(function() {
                saveCart();
            });
        }

        /*
            Warning: the popover with cart options have to be kept opened even
            when it is in hover, not only the cart main button
        */

        $('#shipping-cart-button').hover(function() {
            options.css('display', 'block');

            const button = document.querySelector('#shipping-cart-button');
            const tooltip = document.querySelector('#shipping-cart-options');

            FloatingUIDOM.computePosition(button, tooltip, {
                placement: 'bottom',
            }).then(({
                x,
                y
            }) => {
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            });
        }, function() {
            delayedCloseCartOptions();
        });

        $('#shipping-cart-options').hover(function() {
            $(this).css('display', 'block');
        }, function() {
            delayedCloseCartOptions();
        });

        options.attr('data-inited', 'true');
    }

    var q = 0;
    $("#cartTotal, #cartTotalCheckout").html("تومان" + cart.total);
    for (var id in cart.products) {
        $(".product[data-id='" + id + "']").find('.button').replaceWith(
            generateProductButtons(cart.products[id].quantity)
        );
        $(".product[data-id='" + id + "']").find('input.number').val(
            cart.products[id].quantity
        );
        q += cart.products[id].quantity;

        // Update cart slider
        var pSmall = $(".productSmall[data-id='" + id + "']");
        if (pSmall.length) {
            pSmall.find('input.number').val(cart.products[id].quantity);
        } else {
            // Allow for category field to be missing during deployment
            // TODO remove this check after categoy tracking logic has
            // been deployed for some time
            var category = "";
            if (typeof cart.products[id].category !== 'undefined') {
                category = cart.products[id].category;
            }
            $('#cartSlider').prepend(generateProductSliderPreview(
                id, cart.products[id].quantity,
                cart.products[id].preview, cart.products[id].link, category
            ));
        }

        // Update cart page rows (should never need to add)
        var pRow = $(".productRow[data-id='" + id + "']");
        if (pRow.length) {
            pRow.find('input.number').val(cart.products[id].quantity);
        }
    }

    // Loop over products on cart slider
    $('#cartSlider li').each(function() {
        var id = $(this).find('.productSmall').attr("data-id");
		try{
			if (typeof cart.products[id] === 'undefined') {
				$(this).remove();
			}
		}catch(e){
		}
    });

    // Loop over products on page
    $('.product').each(function() {
        var id = $(this).attr("data-id");
		try{
			if (typeof cart.products[id] === 'undefined' &&
				!$(this).find('.button').length) {
				$(this).find('.contButton').html(generateAddProductButton());
			}
		}catch(e){
		}
    });

    // Loop over cart page rows
    $('#cart tr').each(function() {
		var id = $(this).attr("data-id");
		try{
			if (typeof cart.products[id] === 'undefined') {
				$(this).remove();
			}
		}catch(e){
		}
    });

    $("#cartQuantity").html(q);
    if ($('#previewCart').length) {
			slider.refresh();
    }
}

function doLogout() {
    window.location = '/logout';
}

/*
    This function acts as a wrapper for FancyBox: generates all the required
    elements in the DOM, triggers the modal, and destroys everything once the
    modal itself is closed
*/
function doModal(title, text, buttons) {
    var temp = $('<div>');
    temp.prop('hidden', true);
    $('body').append(temp);

    var trigger = $('<a>');
    trigger.attr('href', '#temp-modal');
    trigger.addClass('trigger');
    temp.append(trigger);

    var modal = $('<div>');
    modal.attr('id', 'temp-modal');
    modal.append('<h2>' + title + '</h2>');
    modal.append('<p>' + text + '</p>');
    temp.append(modal);

    if (buttons.length) {
        var buttons_container = $('<div>');
        buttons_container.addClass('modal-buttons');
        modal.append(buttons_container);

        buttons.forEach(function(button) {
            var b = $('<a>');
            b.text(button.label);
            b.addClass('button bgRed white');
            b.click(button.callback);
            buttons_container.append(b);
        });
    }

    trigger.fancybox({
        modal: true,
        maxWidth: 500,
        overlay: {
            closeClick: true
        },
        scrolling: "no",
        onClosed: function() {
            temp.remove();
        }
    });

    trigger.click();
}

/*
    To close a temporary modal created with doModal()
*/
function closeModal() {
    $.fancybox.close();
}

/*
 * Given cart data update user interface if logged in.
 */
function updateUserInterface(cart) {
    if(!cart.guest) {
        $('.log-in, .sign-up').hide();
        $('.log-out, .profile').css("display", "inline-block");

        $('.log-out').click(function(e) {
            e.preventDefault();
            $('#frm-sign-out').submit();
            //$(this).prop('disabled', true);

            //if (parseInt($('#cartQuantity').text()) != 0) {
            //    var text = $('#js-texts input[name=save_cart_notice]').val();
            //    var title = $('#js-texts input[name=save_cart_notice_title]').val();

            //    doModal(title, text, [{
            //            label: $('#js-texts input[name=save_cart_ok]').val(),
            //            callback: function() {
            //                saveCart().then(doLogout);
            //            },
            //        }, {
            //            label: $('#js-texts input[name=save_cart_ko]').val(),
            //            callback: doLogout,
            //        }
            //    ]);
            //} else {
            //    doLogout();
            //}
        });
    }
}

/*
 * Given cart data update establishment selection UI.
 */
function updateEstablishmentInterface(cart) {
    var baseLink = "/" + cart.establishment.toLowerCase();
    $("#establishment").text(cart.establishment);
    $("#establishment").attr("href", baseLink);

    // If courrier point back to home page
    if(cart.courrier) {
        $("#establishment").attr("href", "/");
    }

    if(!cart.guest && cart.address) {
        $("#estAddress").text($("#estAddress").text() + " " + cart.address);
        $("#estAddress").show();
    }

    // If we are on a product page
    if(typeof pageEstablishment !== 'undefined') {

        // If we are browsing an establishment URL show controls
        if(!estDefaultPages) {
            $("#establishmentControls").show();
        }

        // Show controls if we are shopping on a different establishment
        if(pageEstablishment != cart.establishment) {
            $("#establishmentControls").show();
            $(".establishmentWarning").show();
        }
    }

    // If we are logged in always show establishment bar
    if(!cart.guest) {
        $("#establishmentControls").show();
    }

    // Update all links on static pages only if not on a product or category page
    if(!$(".containerCategories").length && !$(".product").length) {
        // And if we are not doing default by choice
        if(!cart.courrier) {
            $('.estDynamic').each(function(i, obj) {
                // Check that url does not already contain establishment relative link
                if(!$(this).attr("href").startsWith(baseLink)) {
                    $(this).attr("href", baseLink + $(this).attr("href"));
                }
            });
        }
    }
}

/*
 * Enforeces numbers only are inserted into the relevant input form.
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

/*
 * Modify height of header and create chart slider in header.
 */
function headerCartSlider(cart) {
    if(cart.total == 0) {
        $('#header header').removeClass('productOn');
        $('.first').removeClass('productOn');
        $('#previewCart > i').removeClass('darkerGrey');
        $('#header header').addClass('productOff');
        $('.first').addClass('productOff');
        $('#previewCart > i').addClass('yellow');
    } else {
        $('#header header').removeClass('productOff');
        $('.first').removeClass('productOff');
        $('#previewCart > i').removeClass('yellow');
        $('#header header').addClass('productOn');
        $('.first').addClass('productOn');
        $('#previewCart > i').addClass('darkerGrey');
    }
}

/*
    This is to register a dummy service worker, required to make the website
    "installable". It must stay on the document root to match the "scope" of the
    application and be globally available
*/
// if('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(registration) {
        // // dummy
    // });
// }
