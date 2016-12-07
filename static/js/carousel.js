//
// Carousel js
//
$(document).ready(function() {

    var car_change_duration = 700;
    var car_poll_time = 4000;

    var _poll_refresh = false;

    // EVENTS //
    function displayImg($carousel, img_id, duration) {
        var $old_active_img = $carousel.find('.carousel-image.active');
        var $old_active_link = $carousel.find('.carousel-link.active');
        var $new_active_img = $carousel.find('#carousel-image'+img_id);
        var $new_active_link = $carousel.find('#carousel-link'+img_id);
        $old_active_img.animate({
                opacity: 0,
            }, {
                duration: duration,
                complete: function () {
                    $(this).removeClass('active');
                }
            }
        );
        $old_active_link.removeClass('active');
        $new_active_img.animate({
                opacity: 1,
            }, {
                duration: duration,
                complete: function () {
                    $(this).addClass('active');
                }
            }
        );
        $new_active_link.addClass('active');
    }
    function handleCarLinkClick() {
        var $carousel = $(this).closest('.carousel');
        if (!$(this).hasClass('active')) {
            var img_id = $(this).data('img-id');
            displayImg($carousel, img_id, car_change_duration);
        }
        _poll_refresh = true;
    }
    $('.carousel-link').click(handleCarLinkClick);

    function handleCarArrowClick() {
        var $carousel = $(this).closest('.carousel');
        var img_id = $carousel.find('.carousel-link.active').data('img-id');
        var num_imgs = $carousel.find('.carousel-link').length;
        if ($(this).hasClass('carousel-left')) {
            if (img_id == 1) {
                img_id = num_imgs;
            } else {
                img_id -= 1;
            }
        } else {
            if (img_id == num_imgs) {
                img_id = 1;
            } else {
                img_id += 1;
            }
        }
        displayImg($carousel, img_id, car_change_duration);
        _poll_refresh = true;
    }
    $('.carousel-arrow').click(handleCarArrowClick);

    function CarImageRight() {
        if (!_poll_refresh) {
            // Start all carousels auto changing.
            var $carousel = $('.carousel');
            $carousel.each(function() {
                var img_id = $(this).find('.carousel-link.active').data('img-id');
                var num_imgs = $(this).find('.carousel-link').length;
                if (img_id == num_imgs) {
                    img_id = 1;
                } else {
                    img_id += 1;
                }
                displayImg($(this), img_id, car_change_duration);
            });
        } else {
            _poll_refresh = false;
        }
        setTimeout(CarImageRight, car_poll_time);
    }
    setTimeout(CarImageRight, car_poll_time);
});
