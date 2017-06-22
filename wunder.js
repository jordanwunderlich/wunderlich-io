$(document).ready(function() {
    $(window).resize();
    $(window).scroll();
});

$(window).resize(function() {
    $(".slide1").css("height", $(window).height() + "px");
});

$(window).scroll(function() {
    if($(".row.one").isOnScreen(200)){
        setTimeout(function(){
            $(".col.one").removeClass("hidden");
        }, 200);
        setTimeout(function(){
            $(".col.two").removeClass("hidden");
        }, 800);
        setTimeout(function(){
            $(".col.three").removeClass("hidden");
        }, 1400);
    }

    if($(".row.two").isOnScreen(200)){
        setTimeout(function(){
            $(".col.four").removeClass("hidden");
        }, 200);
        setTimeout(function(){
            $(".col.five").removeClass("hidden");
        }, 800);
        setTimeout(function(){
            $(".col.six").removeClass("hidden");
        }, 1400);
    }
});

(function( $ ){
    $.fn.isOnScreen = function( fromBottom ) {
        if(fromBottom === undefined)
            fromBottom = 0;

        if(this.offset().top > $(window).scrollTop() && this.offset().top + fromBottom < $(window).scrollTop() + $(window).height())
            return true;
        return false;
    };
}( jQuery ));
