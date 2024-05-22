;
(function($) {

    $(document).ready(function() {

        //========== POPUP AREA ============= //
        $(".click-here").on('click', function() {
            $(".custom-model-main").addClass('model-open');
        });
        $(".close-btn, .bg-overlay").click(function() {
            $(".custom-model-main").removeClass('model-open');
        });

        //========== PAGE PROGRESS STARTS ============= // 
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".progress-wrap").addClass("active-progress");
            } else {
                jQuery(".progress-wrap").removeClass("active-progress");
            }
        });
        jQuery(".progress-wrap").on("click", function(event) {
            event.preventDefault();
            jQuery("html, body").animate({
                scrollTop: 0
            }, duration);
            return false;
        });
        //========== PAGE PROGRESS STARTS ============= // 

        //========== VIDEO POPUP STARTS ============= //
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
        //========== VIDEO POPUP ENDS ============= //
        AOS.init;
        AOS.init({
            disable: 'mobile'
        });

        //========== NICE SELECT ============= //
        $('select').niceSelect();

    });
    //========== COUNTER UP============= //
    const ucounter = $('.counter');
    if (ucounter.length > 0) {
        ucounter.countUp();
    };
    //========== TESTIMONIAL AREA ============= //
    // testimonial //
    $('.all-content-testimonial').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        items: 10,
        navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>", ],
        autoplay: true,
        smartSpeed: 2000,
        autoplayTimeout: 4000,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });
    //========== PRELOADER ============= //
    $(window).on("load", function(event) {
        setTimeout(function() {
            $(".preloader-parent").fadeToggle();
        }, 800);
    });
    //========== PRELOADER AREA ============= //

    //========== CURSOR AREA ============= //
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
    })
    document.addEventListener('click', () => {
        cursor.classList.add("expand");
        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500)
    })

    //========== GSAP AREA ============= //

    gsap.registerPlugin(ScrollTrigger, SplitText);
    gsap.config({
        nullTargetWarn: false,
        trialWarn: false
    });

    function pbmit_title_animation() {

        ScrollTrigger.matchMedia({
            "(max-width: 375px)": function() {
                var pbmit_var = $('.pbmit-heading, .pbmit-heading-subheading');
                if (!pbmit_var.length) {
                    return;
                }
                const quotes = document.querySelectorAll(".pbmit-heading .pbmit-title , .pbmit-heading-subheading .pbmit-title");
                quotes.forEach(quote => {
                    var getclass = quote.closest('.pbmit-heading ,.pbmit-heading-subheading').className;
                    var animation = getclass.split('animation-');
                    if (animation[1] == "style4") return

                    quote.split = new SplitText(quote, {
                        type: "lines,words,chars",
                        linesClass: "split-line"
                    });
                    gsap.set(quote, {
                        perspective: 400
                    });
                    if (animation[1] == "style1") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                            y: "90%",
                            rotateX: "-40deg"
                        });
                    }
                    if (animation[1] == "style2") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                            x: "50"
                        });
                    }
                    if (animation[1] == "style3") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                        });
                    }
                    gsap.to(quote.split.chars, {
                        scrollTrigger: {
                            trigger: quote,
                            start: "top 90%",
                        },
                        x: "0",
                        y: "0",
                        rotateX: "0",
                        opacity: 1,
                        duration: 1,
                        ease: Back.easeOut,
                        stagger: .02
                    });
                });
            },
        });
    }



})(jQuery);