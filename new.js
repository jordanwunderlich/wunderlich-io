$(document).ready(function() {
    $(window).resize();
    $(window).scroll();

    $("h1").addClass("on");
    $(".slide1").addClass("on");
});

$(window).resize(function() {
    $(".slide1").css("height", $(window).height() + "px");
});

$(window).scroll(function() {
    /*
    $(".slide1").slideBackgroundColor({
        topColor: "#ecf0f1",
        bottomColor: "16a085",
        endChange: 300
    });
    */
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
        /*var settings = $.extend({
            fromBottom: 0
        }, options );*/
        if(fromBottom === undefined)
            fromBottom = 0;

        if(this.offset().top > $(window).scrollTop() && this.offset().top + fromBottom < $(window).scrollTop() + $(window).height())
            return true;
        return false;
    };
}( jQuery ));

(function( $ ){

    $.fn.slideBackgroundColor = function( options ) {
        // Default values
        var settings = $.extend({
            topColor: "#ffffff",
            bottomColor: "#000000", 
            startChange: 0,                                          // Top of the page
            endChange: $(document).height() - $(window).height(),    // Bottom of the page
            property: "background-color"
        }, options );

        settings.topColor = settings.topColor.replace("#", "");
        settings.bottomColor = settings.bottomColor.replace("#", "");

        try {
            var regex = /[0-9A-Fa-f]{6}/;
            if(!regex.test(settings.topColor) || settings.topColor.length != 6) 
                throw "Top color is not a valid six digit hexidecimal number\n";
            if(!regex.test(settings.bottomColor) || settings.bottomColor.length != 6) 
                throw "Bottom color is not a valid six digit hexidecimal number\n";
            if(!$.isNumeric(settings.startChange))
                throw "Start change is not a number.\n"
            if(!$.isNumeric(settings.endChange))
                throw "End change is not a number.\n"
        } catch(err) {
            console.log(err);
            return;
        }

        var topArray = parseColor(settings.topColor);
        var bottomArray = parseColor(settings.bottomColor);
        var percentScrolled = ($(window).scrollTop() + settings.startChange) / settings.endChange;
        if(percentScrolled > 1)
            percentScrolled = 1;
        var displayed = [];
        for(var i = 0; i < topArray.length; i++) {
            var bottomPercent = percentScrolled * bottomArray[i];
            var topPercent = (1 - percentScrolled) * topArray[i];
            displayed.push(bottomPercent + topPercent);
        }
        var output = "#";
        for(var i = 0; i < displayed.length; i++) {
            output += Math.round(displayed[i]).toString(16);
        }

        return this.css(settings.property, output);

        function parseColor(color) {
            var i = 0;
            var destination = [];
            while(i < 6){
                var seg = color.charAt(i++);
                seg += color.charAt(i++);
                destination.push(parseInt(seg, 16));
            }
            return destination;
        }
    };

}( jQuery ));
