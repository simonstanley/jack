$(document).ready(function() {
    $('.project-item a').hover(
        function() {
            $(this).closest('.project-item').css('border-color', '#12e4ff');
            $(this).siblings().css( 'color', '#12e4ff');
        },
        function() {
            $(this).closest('.project-item').css('border-color', '#454545');
            $(this).siblings().css( 'color', '#ffffff');
        }
    );
});
