$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });
    // Typing animation script
    const typed = new Typed(".typing", {
        strings: ["Developer", "Photographer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    })
    const typed2 = new Typed(".typing-2", {
        strings: ["Developer", "Photographer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    })

    // Slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
    })

    // toggle menu/navbar
    $(".menu-btn").click(function () {
        $(".navbar .menu").toggleClass("active");
        $(".navbar i").toggleClass("active");
    });
    // owl carousel
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoPlayTimeout: 2000,
        autoPlayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600:{
            items: 2,
            nav: false
            },
            1000:{
            items: 3,
            nav: false
            },
        }
    })
})