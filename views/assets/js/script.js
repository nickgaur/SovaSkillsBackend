$('ul li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(500);
    }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(500);
});

$('.third-button').on('click', function () {
    $('.animated-icon3').toggleClass('open');
});

$( "nav ul li a.close-menu" ).click(function() {
    $( ".animated-icon3" ).click();
});