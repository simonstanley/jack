var size_threshold = 730;

$.fn.rotate = function(startAngle, endAngle, duration, easing, complete) {
    return this.each(function() {
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now){
                elem.css({
                  '-moz-transform':'rotate('+now+'deg)',
                  '-webkit-transform':'rotate('+now+'deg)',
                  '-o-transform':'rotate('+now+'deg)',
                  '-ms-transform':'rotate('+now+'deg)',
                  'transform':'rotate('+now+'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

function init() {
    // RESPONSIVE //
    $(window).resize(function() {
        // This will execute whenever the window is resized
        if ($(window).width() < size_threshold) {
            if (!$('html').hasClass('small')) {
                $('html').addClass('small');
                $(document).trigger('small-screen');
            }
        } else {
            if ($('html').hasClass('small')) {
                $('html').removeClass('small');
                $(document).trigger('normal-screen');
            }
        }
    });
    if ($(window).width() < size_threshold) {
        $('html').addClass('small');
        $(document).trigger('small-screen');
    }
}
$(window).on('load', function() {
    init();
});
