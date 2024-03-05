/*
 * Lightslider functionality for product page
 */

$(function(){
    $('#lightSlider').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        thumbItem: 3,
        enableDrag: false,
        currentPagerPosition:'left',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '#lightSlider .lslide'
            });
        }
    }); 
});