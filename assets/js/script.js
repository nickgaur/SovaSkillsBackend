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

// on scroll add and remove class
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        console.log("hsgdchj");
        $("nav").addClass("fixed-nav");
    } else {
        $("nav").removeClass("fixed-nav");
        console.log("qwe");
    }
});

$('#school-slider').owlCarousel({
    loop: true,
    center: true,
    items: 4,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    responsive: {
        0: {
          items: 1
        },
        768: {
          items: 3
        },
        1170: {
          items: 4
        }
    }
});