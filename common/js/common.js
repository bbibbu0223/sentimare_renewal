$(function () {
    $('header').load('/common/html/inc.html header > div');
    $('footer').load('/common/html/inc.html footer > div');

    $(".slider").slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    });
});

// mouse
$(document).mousemove(function (e) {

    let cursorWidth = $(".cursor").width() / 2;
    let cursorFWidth = $(".cursor").width() / 2;

    gsap.to(".cursor", {
        duration: 0.6,
        left: e.pageX - cursorWidth,
        top: e.pageY - cursorWidth
    });
    gsap.to(".cursor-follower", {
        duration: 1.6,
        left: e.pageX - cursorFWidth,
        top: e.pageY - cursorFWidth
    });
});