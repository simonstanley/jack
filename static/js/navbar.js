/*
/* Navbar js
/* Assumes one navbar on page.
*/
$(document).ready(function() {

    var nav_change_duration = 500;

    function init() {
        // Make sure everything is closed on page load.
        var $content = $('.dropdown-content');
        closeDropdown($content, 1);
        if ($('html').hasClass('small')) {
            var $menu = $('.nav-menu');
            closeMenu($menu, 1);
        }
    }

    // EVENTS //
    function showMenu($menu, duration) {
        $menu.removeClass('hidden');
        $menu.animate({
                opacity: 1,
            }, duration
        );
    }
    function closeMenu($menu, duration) {
        $menu.animate({
                opacity: 0,
            }, {
                duration: duration,
                complete: function () {
                    $(this).addClass('hidden');
                }
            }
        );
    }
    function toggleMenu() {
        var $menu = $('#navbar').find('.nav-menu');
        if ($menu.hasClass('hidden')) {
            showMenu($menu, nav_change_duration);
        } else {
            closeMenu($menu, nav_change_duration);
        }
    }
    $('#navbar .expander-button').click(toggleMenu);


    function showDropdown($content, duration) {
        if (!$content.hasClass('hidden')) {
            window.setTimeout(
                showDropdown,
                nav_change_duration,
                $content,
                nav_change_duration
            );
        } else {
            $content.removeClass('hidden');
            $content.animate({
                    'opacity': 1,
                }, duration
            );
        }
    }
    function closeDropdown($content, duration) {
        if ($content.hasClass('hidden')) {
            window.setTimeout(
                closeDropdown,
                nav_change_duration,
                $content,
                nav_change_duration
            );
        } else {
            $content.animate({
                    'opacity': 0,
                }, {
                    'duration': duration,
                    'complete': function () {
                        $(this).addClass('hidden');
                    }
                }
            );
        }
    }
    $('#navbar .dropdown').hover(
        function() {
            // Only for big screen
            if (!$('html').hasClass('small')) {
                var $content = $(this).find('.dropdown-content');
                showDropdown($content, nav_change_duration);
            }
        },
        function() {
            // Only for big screen
            if (!$('html').hasClass('small')) {
                var $content = $(this).find('.dropdown-content');
                closeDropdown($content, nav_change_duration);
            }
        }
    );

    function toggleDropdown() {
        // Only for small screen
        if ($('html').hasClass('small')) {
            var $dropdown = $(this).closest('.dropdown');
            var $content = $dropdown.find('.dropdown-content');
            // Check if dropdown is already open.
            if (!$content.hasClass('hidden')) {
                closeDropdown($content, nav_change_duration);
            } else {
                showDropdown($content, nav_change_duration);
            }
         }
     }
    $('#navbar .dropdown-header').click(toggleDropdown);


    function handleNavLinkClick() {
        if ($('html').hasClass('small')) {
            var $menu = $('#navbar').find('.nav-menu');
            closeMenu($menu, 1);
            $('#navbar .dropdown-content').addClass('hidden');
        }
    }
    $('#navbar .nav-link').click(handleNavLinkClick);

    function navSetToSmallScreen() {
        $('#navbar .expander-button').removeClass('hidden');
        $('#navbar .dropdown-content').addClass('hidden');
        $('#navbar .nav-menu').addClass('hidden');
        $('#navbar .dropdown-content').addClass('hidden');

    }
    $(document).on('small-screen', navSetToSmallScreen);
    function navSetToNormalScreen() {
        $('#navbar .expander-button').addClass('hidden');
        $('#navbar .dropdown-content').addClass('hidden');
        $('#navbar .nav-menu').removeClass('hidden').css('opacity', 1);
        $('#navbar .dropdown-content').addClass('hidden');
    }
    $(document).on('normal-screen', navSetToNormalScreen);

    init();
});
