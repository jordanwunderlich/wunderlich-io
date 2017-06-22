function turnEverythingOn() {
    $("h1").addClass("on");
    $(".slide1").addClass("on");
}

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
