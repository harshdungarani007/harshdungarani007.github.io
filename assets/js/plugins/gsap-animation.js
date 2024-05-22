gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});
/*----  Functions  ----*/
function pbmit_img_animation() {
    const boxes = gsap.utils.toArray('.pbmit-animation-style1,.pbmit-animation-style2,.pbmit-animation-style3,.pbmit-animation-style4,.pbmit-animation-style5,.pbmit-animation-style6');
    boxes.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 70%",
                end: "bottom bottom",
                toggleClass: "active",
                once: true,
            }
        });
    });
}

function pbmit_portfolio_coverflow() {

    ScrollTrigger.matchMedia({
        "(min-width:767px)": function() {

            if (typeof Swiper !== 'undefined') {
                var swiper = new Swiper('.pbmit-element-portfolio-style-2 .pbmit-element-posts-wrapper .portfolio-container', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    loop: true,
                    speed: 3000,
                    spaceBetween: 250,
                    slidesPerView: 2, // or 'auto'
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
            }
        },
        "(max-width:767px)": function() {
            ScrollTrigger.getAll().forEach(swiper => swiper.kill(true));
        }
    });
}

// ** Hover Image Effect ** \\
function pbmit_hover_img() {
    const pbmitHoverImg = gsap.utils.toArray(".pbmit-element-portfolio-style-1 article,.pbmit-element-blog-style-2 article,.pbmit-element-service-style-2 article, .pbmit-timeline .pbmit-content");
    pbmitHoverImg.forEach((target) => {
        const pbmitImg = target.querySelector('.pbmit-hover-img');
        const t1 = gsap.timeline();
        t1.to(pbmitImg, {
            opacity: 1,
            duration: 0.4,
            scale: 1,
            ease: "Power2.easeOut"
        })
        target.pbmitHoverAnim = t1.play().reversed(true);
        target.addEventListener("mouseenter", pbmithoverimg);
        target.addEventListener("mouseleave", pbmithoverimg);
        target.addEventListener("mousemove", (e) => {
            let xpos = e.offsetX;
            let ypos = e.offsetY;
            const t1 = gsap.timeline();
            t1.to(pbmitImg, {
                x: xpos,
                y: ypos
            });
        });
    });

    function pbmithoverimg() {
        this.pbmitHoverAnim.reversed(!this.pbmitHoverAnim.reversed());
    }
}

// ** Text Mask Animation ** \\
function pbmit_text_mask_animation() {
    const hero = document.querySelectorAll('.pbmit-shadow');
    if (hero.length < 1) {
        return
    }
    const t1 = gsap.timeline({
        delay: 1
    })
    t1.to(hero, {
        '--maskSize1': '20%',
        duration: 0.5,
        ease: 'back.out(2)',
    })
    hero.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const {
                clientX,
                clientY
            } = e
            const x = Math.round((clientX / window.innerWidth) * 100)
            const y = Math.round((clientY / window.innerHeight) * 100)
            gsap.to(el, {
                '--x': `${x}%`,
                '--y': `${y}%`,
                duration: 0.3,
                ease: 'sine.out',
            })
        })
        el.addEventListener('mouseleave', (e) => {
            gsap.to(el, {
                '--x': `50%`,
                '--y': `50%`,
                duration: 0.3,
                ease: 'sine.out',
            })
        })
    });
}

// ** Horizontal snap Animation ** \\
function pbmit_horizontal_snap_section() {

    var pbmit_var = $('.pbmit-horizontal-snap-section');
    if (!pbmit_var.length) {
        return;
    }
    let pbmithsContainer = document.querySelector(".pbmit-horizontal-snap-section"),
        pbmithsPanel = gsap.utils.toArray(".pbmit-horizontal-snap-section .pbmit-ele-horizontal-snap"),
        pbmithWidth = 0,
        pbmithsTween;

    ScrollTrigger.matchMedia({
        "(min-width: 1201px)": function() {
            const pbmithgetWidth = () => {
                pbmithWidth = 0;
                pbmithsPanel.forEach((section) => {
                    pbmithWidth += section.offsetWidth;
                });
                pbmithWidth += window.innerWidth;
                pbmithWidth += 10000;
                return pbmithWidth;
            };
            gsap.set(pbmithsContainer, {
                width: (100 * (pbmithsPanel.length) + '%')
            });
            pbmithgetWidth();
            ScrollTrigger.addEventListener("refreshInit", pbmithgetWidth);
            pbmithsTween = gsap.to(pbmithsPanel, {
                xPercent: -100 * (pbmithsPanel.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: pbmithsContainer,
                    pin: true,
                    start: "top 1%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (pbmithsPanel.length - 1),
                        inertia: false,
                        delay: 0.1,
                        duration: {
                            min: 1,
                            max: 1
                        }
                    },
                    end: () => "+=" + (pbmithsContainer.offsetWidth - innerWidth)
                }
            });
            pbmithsPanel.forEach(section => {
                gsap.to(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: () => 'top top-=' + (section.offsetLeft - window.innerWidth / 2) * (pbmithWidth / (pbmithWidth - window.innerWidth)),
                        end: () => '+=' + section.offsetWidth * (pbmithWidth / (pbmithWidth - window.innerWidth)),
                        toggleClass: "active",
                        invalidateOnRefresh: true
                    }
                });
            });
            window.addEventListener("resize", this.onResize);

        },
        "(max-width: 1200px)": function() {
            if (pbmithsTween) pbmithsTween.kill(true);
            gsap.set(pbmithsContainer, {
                width: '100%'
            });
        }
    });
}

function pbmit_horizontal_style() {
    if ($('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1').length > 0) {

        const sections = gsap.utils.toArray(".pbmit-element-sticky-carousel-true.pbmit-element-service-style-1 .pbmit-service-style-1");
        if (sections.length < 1) {
            return
        }
        ScrollTrigger.matchMedia({
            "(min-width:1200px)": function() {

                let maxWidth = 0;
                let bgimg = $('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1').closest('.elementor-top-section')
                const getMaxWidth = () => {
                    maxWidth = 0;
                    sections.forEach((section) => {
                        maxWidth += section.offsetWidth;
                        maxWidth += gsap.getProperty(section, 'marginLeft');
                    });
                    maxWidth += 30;
                    maxWidth += window.innerWidth;
                    maxWidth -= sections[0].offsetWidth;
                    return maxWidth;
                };

                getMaxWidth();
                ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

                getpercentage(sections.length, 0, $('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1 .pbmit-circle'));
                gsap.to(sections, {
                    x: () => `-${maxWidth - window.innerWidth}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".pbmit-element-sticky-carousel-true.pbmit-element-service-style-1",
                        pin: true,
                        scrub: true,
                        end: () => `+=${maxWidth}`,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            if ($('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1').length) {
                                var index = $('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1 .pbmit-element-posts-wrapper .active').index();
                                if (index >= 0) {
                                    var elm = $('.pbmit-element-sticky-carousel-true.pbmit-element-service-style-1 .pbmit-circle');
                                    var cal = getpercentage(sections.length, (index + 1), elm);
                                    var short_digit = cal / 100;
                                    elm.circleProgress('value', short_digit);
                                }
                            }
                        },
                        onEnter: () => {
                            bgimg.addClass("pbmit-service1-bg");
                        }
                    }
                });

                sections.forEach((sct, i) => {
                    let pos = sections[0].offsetWidth * (i + 1);
                    ScrollTrigger.create({
                        trigger: sct,
                        start: () => 'top top-=' + (pos - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
                        end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
                        toggleClass: {
                            targets: sct,
                            className: "active"
                        }
                    });
                });
            }
        });
    }
}

function getpercentage(x, y, elm) {
    elm.find('.pbmit-fid-inner').html(y + '/' + x);
    var cal = Math.round((y * 100) / x);
    return cal;
}

function pbmit_sprite_animation() {
    ScrollTrigger.matchMedia({
        "(min-width:767px)": function() {
            if (!$('.pbmit-sprite-animation-pin').length) {
                return;
            }
            let pbmit_sprite_pin = document.querySelector(".pbmit-sprite-animation-pin"),
                pbmitSpriteAnim = pbmit_sprite_pin.querySelector(".pbmit-sprite-animation"),
                pbmitfc = pbmitSpriteAnim.getAttribute('data-frame-count'),
                pbmith = pbmitSpriteAnim.getAttribute('data-height');
            pbmit_sprite_pin;

            gsap.to(pbmitSpriteAnim, {
                backgroundPosition: (-pbmith * pbmitfc) + "px 50%",
                ease: "steps(" + pbmitfc + ")",
                scrollTrigger: {
                    trigger: pbmit_sprite_pin,
                    start: "top top",
                    end: "+=" + (pbmitfc * 100),
                    pin: true,
                    scrub: true
                }
            });
        },
        "(max-width:767px)": function() {
            ScrollTrigger.getAll().forEach(pbmit_sprite_pin => pbmit_sprite_pin.kill(true));
        }
    });
}

function pbmit_tween_effect() {

    const pbmit_tween = gsap.utils.toArray('.pbmit-tween-effect');
    if (pbmit_tween.length == 0) return

    ScrollTrigger.matchMedia({
        "(min-width: 1201px)": function() {

            pbmit_tween.forEach((box, i) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        end: "bottom 70%",
                        scrub: 1
                    },
                    defaults: {
                        ease: "none"
                    }
                });

                let xpos_val = box.getAttribute('data-x-start');
                let xpose_val = box.getAttribute('data-x-end');
                let ypos_val = box.getAttribute('data-y-start');
                let ypose_val = box.getAttribute('data-y-end');

                let scale_x_val = box.getAttribute('data-scale-x-start');
                let scale_xe_val = box.getAttribute('data-scale-x-end');

                let skew_x_val = box.getAttribute('data-skew-x-start');
                let skew_xe_val = box.getAttribute('data-skew-x-end');
                let skew_y_val = box.getAttribute('data-skew-y-start');
                let skew_ey_val = box.getAttribute('data-skew-y-end');

                let rotation_x_val = box.getAttribute('data-rotate-x-start');
                let rotation_xe_val = box.getAttribute('data-rotate-x-end');
                gsap.set(box, {
                    xPercent: xpos_val,
                    yPercent: ypos_val,
                    scale: scale_x_val,
                    skewX: skew_x_val,
                    skewY: skew_y_val,
                    rotation: rotation_x_val
                });
                tl.to(box, {
                    xPercent: xpose_val,
                    yPercent: ypose_val,
                    scale: scale_xe_val,
                    skewX: skew_xe_val,
                    skewY: skew_ey_val,
                    rotation: rotation_xe_val
                })
            });
        },
    });
}

function pbmt_scroller_portfolio() {
    if (!$('.pbmit-element-portfolio-style-3').length) {
        return;
    }

    ScrollTrigger.matchMedia({
        "(min-width:1200px)": function() {

            gsap.set(".pbmit-element-portfolio-style-3  .pbminfotech-img-wrapper", {
                zIndex: (i, target, targets) => targets.length - i
            });
            const images = gsap.utils.toArray('.pbmit-element-portfolio-style-3 .pbminfotech-img-wrapper:not(:last-child)');
            gsap.set(".pbmit-element-portfolio-style-3 ", {
                height: ((images.length + 1) * 100) + 'vh'
            });

            images.forEach((image, i) => {
                var tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".pbmit-element-portfolio-style-3 ",
                        start: () => "top -" + (window.innerHeight * (i)),
                        end: () => "+=" + window.innerHeight,
                        scrub: true,
                        toggleActions: "play none reverse none",
                        invalidateOnRefresh: true,
                    }
                })
                tl.fromTo(image, {
                    height: () => {
                        return "100%"
                    }
                }, {
                    height: () => {
                        return "0%"
                    },
                    ease: "none"
                });
            });
            ScrollTrigger.create({
                trigger: ".pbmit-element-portfolio-style-3",
                pin: '.pbmit-element-portfolio-style-3 .pbminfotech-img-box',
                start: () => "top top",
                end: () => "+=" + ((images.length) * (window.innerHeight)),
                invalidateOnRefresh: true,
            });
        }
    });
}

function pbmt_vertical_snap() {

    ScrollTrigger.matchMedia({
        "(min-width: 767px)": function() {

            const section = gsap.utils.toArray('.pbmit-element-verticle-snap-style-1 .pbmit-verticle-snap-style-1 ,.pbmit-element-verticle-snap-style-2 .pbmit-verticle-snap-style-2');
            ScrollTrigger.create({
                trigger: '.pbmit-element-verticle-snap-style-1 ,.pbmit-element-verticle-snap-style-2',
                pin: '.pbmit-verticle-snap-bg-image',
                start: () => "top top",
                pinSpacing: false,
                end: () => "+=" + ((section.length - 1) * (window.innerHeight)),
                invalidateOnRefresh: true,
            });
        },
        "(max-width: 767px)": function() {
            ScrollTrigger.getAll().forEach(section => section.kill(true));
        }
    });
}

function pbmit_thumb_slide_portfolio() {
    if (!$('.pbmit-thumbs-slide').length) {
        return;
    }
    var slider = new Swiper('.pbmit-main-slide', {
        slidesPerView: 1,
        loop: true,
        loopedSlides: 4,
        navigation: {
            nextEl: '.slide-button-next',
            prevEl: '.slide-button-prev',
        },
    });
    var thumbs = new Swiper('.pbmit-thumbs-slide', {
        slidesPerView: '4',
        spaceBetween: 20,
        loop: true,
        slideToClickedSlide: true,
    });
    slider.controller.control = thumbs;
    thumbs.controller.control = slider;
}

function pbmit_staticbox_hover() {
    var pbmit_var = jQuery('.pbmit-element-static-box-style-1,.pbmit-element-service-style-3');
    if (!pbmit_var.length) {
        return;
    }
    pbmit_var.each(function() {
        var pbmit_Class = '.pbmit-element-posts-wrapper > .pbmit-ele-static-box,.pbmit-award-box-wraper,.pbmit-element-posts-wrapper .pbmit-contant-area';
        jQuery(this)
            .find(pbmit_Class).first()
            .addClass('pbmit-active');
        jQuery(this)
            .find(pbmit_Class)
            .on('mouseover', function() {
                jQuery(this).addClass('pbmit-active').siblings().removeClass('pbmit-active');
            });
    });
}

function pbmit_portfolio_effect() {
    const images = gsap.utils.toArray('.pbmit-portfolio-style-11');
    if (images.length == 0) return
    const images_inner = gsap.utils.toArray('.pbmit-portfolio-style-11 .pbmit-featured-wrapper');
    images.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 70%",
                end: "bottom bottom",
                toggleClass: "active",
                once: true,
            }
        });
    });
    images_inner.forEach(img => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                start: "top 20%",
                end: "bottom bottom",
                scrub: 3
            },
        });
        tl.fromTo(img, {
            y: 0
        }, {
            y: 40
        })
    });
}

function pbmit_title_animation() {

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {

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

function pbmit_set_tooltip() {
    $('[data-cursor-tooltip]').each(function() {
        var thisele = $(this);
        var thisele_html = thisele.find('.pbminfotech-box-content').html();
        thisele.attr("data-cursor-tooltip", thisele_html);
    });
}

function pbmit_action_box() {
    const pbmit_elm = gsap.utils.toArray('.pbmit-action-box-style-1.pbmit-action-box');
    if (pbmit_elm.length == 0) return

    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
            pbmit_elm.forEach((box, i) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: box,
                        pin: true,
                        start: "top top",
                        end: "+=700px",
                        scrub: 1
                    },
                    defaults: {
                        ease: "none"
                    }
                });
                tl.fromTo(box.querySelector(".pbmit-action-box-wrap"), {
                    clipPath: 'inset(10% 20% 20% 20%)'
                }, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 3
                })
                tl.fromTo(box.querySelector(".pbmit-action-content"), {
                    opacity: 0,
                    y: "70%",
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5
                })
                tl.fromTo(box.querySelector(".pbmit-action-content"), {
                    opacity: 1
                }, {
                    opacity: 1,
                    duration: 5
                })
            });
        }
    });
}

function pbmit_scroll_int() {
    gsap.set(".pbmitmove-text1", {
        xPercent: -70
    })
    gsap.set(".pbmitmove-text2", {
        xPercent: 100
    })

    gsap.to(".pbmitmove-text1", {
        xPercent: 20,
        scrollTrigger: {
            scrub: true,
            start: "top bottom",
            end: "bottom top",
        }
    });

    gsap.to(".pbmitmove-text2", {
        xPercent: -70,
        scrollTrigger: {
            trigger: ".pbmitmove-text1",
            scrub: true,
            start: "top bottom",
            end: "bottom top",
        }
    });
}

function pbmit_sticky() {

    ScrollTrigger.matchMedia({
        "(min-width: 1200px)": function() {
            let pbmit_sticky_container = jQuery(".pbmit-sticky-col");
            let section = pbmit_sticky_container.closest('section');
            if (!section[0]) {
                section = pbmit_sticky_container.closest('.pbmit-sticky-section');
            }
            let tl = gsap.timeline({
                scrollTrigger: {
                    pin: pbmit_sticky_container,
                    scrub: 1,
                    start: "top top",
                    trigger: section,
                    end: () => "+=" + ((section.height() + 250) - window.innerHeight),
                    invalidateOnRefresh: true
                },
                defaults: {
                    ease: "none",
                    duration: 1
                }
            });
        },
    });
}

function pbmit_splite_slide() {
    if (!jQuery(".pbmit-element-split-slide-style-1,.pbmit-element-split-slide-style-2,.pbmit-element-split-slide-style-3,.pbmit-element-award-box-style-1")[0]) {
        return
    }
    ScrollTrigger.matchMedia({
        "(min-width: 992px)": function() {

            let container = jQuery(".pbmit-element-split-slide-style-1 .pbmit-img,.pbmit-element-split-slide-style-2 .pbmit-img,.pbmit-element-split-slide-style-3 .pbmit-img,.pbmit-element-award-box-style-1 .pbmit-img");
            let section = jQuery(".pbmit-element-split-slide-style-1 .pbmit-element-split-slide-wrapper,.pbmit-element-split-slide-style-2 .pbmit-element-split-slide-wrapper,.pbmit-element-split-slide-style-3 .pbmit-element-split-slide-wrapper,.pbmit-element-award-box-style-1 .pbmit-element-award-box-wrapper");
            var indicators = gsap.utils.toArray('.pbmit-element-split-slide-style-1 .pbmit-split-slide-item-image, .pbmit-element-split-slide-style-2 .pbmit-split-slide-item-image,.pbmit-element-split-slide-style-3 .pbmit-split-slide-item-image,.pbmit-element-award-box-style-1 .pbmit-award-item-image');
            var points = gsap.utils.toArray('.pbmit-element-split-slide-style-1 .pbmit-bg-imgbox .pbmit-split-slide-box,.pbmit-element-split-slide-style-2 .pbmit-bg-imgbox .pbmit-split-slide-box,.pbmit-element-split-slide-style-3 .pbmit-bg-imgbox .pbmit-split-slide-box,.pbmit-element-award-box-style-1 .pbmit-bg-imgbox .pbmit-menu-box');

            var gap = points.length * 5;

            let tl = gsap.timeline({
                scrollTrigger: {
                    pin: true,
                    scrub: 1,
                    trigger: container,
                    end: () => "+=" + ((section.height() + gap) - document.documentElement.clientHeight),
                    onUpdate: (self) => {
                        let per = parseInt(self.progress * 100);
                        if (per > 99) indicators[points.length - 1].classList.add('last');
                        else indicators[points.length - 1].classList.remove('last');
                        if (per < 1) indicators[0].classList.add('first');
                        else indicators[0].classList.remove('first');

                    }
                },
                defaults: {
                    ease: "none",
                    duration: 1
                }
            });

            points.forEach((sct, i) => {
                let pos = indicators[i];
                ScrollTrigger.create({
                    trigger: sct,
                    start: "top center",
                    end: () => '+=' + sct.offsetHeight,
                    toggleClass: {
                        targets: pos,
                        className: "active"
                    }
                });
            });
            jQuery('.pbmit-element-split-slide-style-1 .pbmit-bg-imgbox .pin-spacer .pbmit-split-slide-item-image:first-child,.pbmit-element-split-slide-style-2 .pbmit-bg-imgbox .pin-spacer .pbmit-split-slide-item-image:first-child,.pbmit-element-split-slide-style-3 .pbmit-bg-imgbox .pin-spacer .pbmit-split-slide-item-image:first-child,.pbmit-element-award-box-style-1 .pbmit-bg-imgbox .pin-spacer .pbmit-award-item-image:first-child').addClass('active');
        },
        "(max-width:992px)": function() {
            ScrollTrigger.getAll().forEach(pin => pin.kill(true));
        }
    });

}

function pbmit_bg_change() {

    const $section = $(".site-content-wrap");
    const $startTriggers = gsap.utils.toArray(".pbmit-bg-change");
    if (!$startTriggers[0]) {
        return
    }

    $startTriggers.forEach(elm => {
        let $startTrigger = $(elm);
        const color = $startTrigger.css("background-color");
        $startTrigger.css("background-color", "transparent");

        ScrollTrigger.create({
            trigger: $startTrigger,
            start: "top 20%",
            end: '+=50%',
            onEnter: () => {
                gsap.to($section, {
                    backgroundColor: color,
                    overwrite: "auto"
                })
                $startTrigger.addClass("pbmit-text-color-white");
            },
            onEnterBack: () => {
                gsap.to($section, {
                    backgroundColor: color,
                    overwrite: "auto"
                })
                $startTrigger.addClass("pbmit-text-color-white");
            },
            onLeaveBack: () => {
                gsap.to($section, {
                    backgroundColor: 'rgba(255,0,0,0)',
                    overwrite: "auto"
                })
                $startTrigger.removeClass("pbmit-text-color-white");
            },
            onLeave: () => {
                gsap.to($section, {
                    backgroundColor: 'rgba(255,0,0,0)',
                    overwrite: "auto"
                })
                $startTrigger.removeClass("pbmit-text-color-white");
            }
        });
    });
}

// ** Text Mask Animation ** \\

function pbmit_team_mask_animation() {
    $(".pbmit-element-team-style-1").append("<div class='pbmit-team-cursor-mask'><div class='pbmit-team-cursor'></div></div>");
    const pbmit_class = document.querySelector('.pbmit-element-team-style-1');

    var pbmit_var = $('.pbmit-element-team-style-1');
    if (!pbmit_var.length) {
        return;
    }
    const el = document.querySelector('.pbmit-team-cursor');
    pbmit_class.addEventListener('mousemove', (e) => {
        el.classList.add("active");
        let offsetLeft = pbmit_class.offsetLeft || pbmit_class.getBoundingClientRect().left;
        let offsetTop = pbmit_class.offsetTop || pbmit_class.getBoundingClientRect().top;
        const x1 = e.clientX - offsetLeft;
        const y1 = e.clientY - offsetTop;

        gsap.to(el, {
            x: x1,
            y: y1,
            duration: 0.3,
            ease: 'sine.out',
        })
    })
    pbmit_class.addEventListener('mouseleave', (e) => {
        el.classList.remove("active");
    })
    //});
}

// ** Text Mask Animation ** \\
function pbmit_moving_team() {

    ScrollTrigger.matchMedia({
        "(min-width:1200px)": function() {
            gsap.utils.toArray('.pbmit-element-team-style-2').forEach((section, index) => {
                const w = section.querySelector('.pbmit-element-team-style-2 .swiper-wrapper');
                gsap.fromTo(w, {
                    x: 1000
                }, {
                    x: (section.offsetWidth - 300) - w.scrollWidth,
                    scrollTrigger: {
                        trigger: section,
                        scrub: 1,
                    }
                });
            });
        }
    });
}

function pbmit_verticle_slide_image() {

    ScrollTrigger.matchMedia({
        "(min-width:768px)": function() {

            const pbmitvar = document.querySelectorAll('.pbmit-vertical-box-style-1');
            let totalheight = -300;
            pbmitvar.forEach((section, index) => {
                totalheight += section.offsetHeight;
                gsap.to(section, {
                    yPercent: -50,
                    scrollTrigger: {
                        trigger: section,
                        scrub: 3
                    }
                });
            });

            ScrollTrigger.create({
                trigger: ".pbmit-element-vertical-box-style-1 ",
                pin: '.pbmit-element-vertical-box-style-1 .pbmit-heading ',
                start: () => "top top",
                end: () => "+=" + totalheight,
                invalidateOnRefresh: false,
            });
        }
    });
}

ScrollTrigger.matchMedia({
    "(max-width: 1200px)": function() {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
});

// on ready
$(document).ready(function() {
    pbmit_staticbox_hover();
});
// on load
$(window).on('load', function() {
    pbmit_title_animation();
    pbmit_team_mask_animation();
    pbmit_portfolio_coverflow()
    pbmit_hover_img();
    pbmit_text_mask_animation();
    pbmit_horizontal_style();
    pbmt_vertical_snap();
    pbmit_sprite_animation();
    pbmit_img_animation();
    pbmit_tween_effect();
    pbmt_scroller_portfolio();
    pbmit_sticky();
    pbmit_thumb_slide_portfolio();
    pbmit_portfolio_effect();
    pbmit_horizontal_snap_section();
    pbmit_set_tooltip();
    pbmit_action_box();
    pbmit_bg_change();
    pbmit_scroll_int();
    pbmit_splite_slide();
    pbmit_moving_team();
    pbmit_verticle_slide_image();

});