$("#banner-slider").owlCarousel({
    loop: false,
    rewind: true,
    margin: 10,
    responsiveClass: true,
    items: 1,
    dots: true,
    nav: true,

    responsive: {
        0: {
            nav: false,
        },
        768: {
            nav: true,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});

// product slide
$("#slider_1").owlCarousel({
    loop: false,
    rewind: true,
    margin: 27,
    responsiveClass: true,
    dots: false,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },
        480: {
            items: 2,
            nav: true,
        },
        768: {
            items: 3,
            nav: true,
        },
        1200: {
            items: 4,
            nav: true,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});

// product slide
$("#slider_2").owlCarousel({
    loop: false,
    rewind: true,
    margin: 25,
    responsiveClass: true,
    dots: false,
    nav: true,

    responsive: {
        0: {
            items: 1,
        },
        480: {
            items: 2,
            nav: true,
        },
        768: {
            items: 3,
            nav: true,
        },
        1200: {
            items: 4,
            nav: true,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});

// product slide
$("#slider_3").owlCarousel({
    loop: false,
    rewind: true,
    margin: 25,
    responsiveClass: true,
    dots: false,

    responsive: {
        0: {
            items: 1,
        },
        480: {
            items: 2,
            nav: true,
        },
        768: {
            items: 3,
            nav: true,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});

// centered-banner__testimonials
$("#testimonials").owlCarousel({
    loop: false,
    rewind: true,
    margin: 25,
    responsiveClass: true,
    items: 1,
    dots: false,
    nav: true,
    responsive: {
        0: {
            nav: false,
        },
        768: {
            nav: true,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});

// company-logo
$("#company-slider").owlCarousel({
    loop: true,
    responsiveClass: true,
    dots: false,
    responsive: {
        0: {
            nav: false,
            items: 2,
            margin: 20,
        },
        768: {
            items: 4,
            nav: true,
            margin: 25,
        },
        992: {
            items: 5,
            nav: true,
            margin: 40,
        },
        1200: {
            items: 6,
            nav: true,
            margin: 50,
        },
    },
    navText: ["<img src='assets/img/icons/prev.png'>", "<img src='assets/img/icons/next.png'>"],
});