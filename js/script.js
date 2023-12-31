(function ($) {

    "use strict";



    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");
        var navLinks = $("#navbar > ul > li > a");

        openBtn.on("click", function () {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;

        })

        navLinks.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    toggleMobileNavigation();


    //ACTIVE CURRENT MENU WHILE SCROLLING
    function activeMenuItem() {
        var cur_pos = $(window).scrollTop() + 2,
            bottomPosition = $(document).height() - $(window).height() - $(window).scrollTop(),
            sections = $("section"),
            nav = $("#navbar"),
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            }

            if (bottomPosition === 0) {
                nav.find("> ul > li > a").parent().removeClass("current");
            }
        });
    }

    // smooth-scrolling
    $(function () {
        $("#navbar > ul > li > a:not(.dropdown-toggle)").on("click", function (event) {
            // Check if the clicked link is an external link
            if (this.href.endsWith('.html')) {
                // Allow normal redirection for external links
                window.location.href = this.href;
                return;
            }

            // Check if the link's href attribute ends with '.html'
            if (this.href.endsWith('.html')) {
                // Allow normal redirection for links to HTML pages
                return;
            }

            // Smooth scroll behavior for on-page links
            event.preventDefault();
            var target = $(this.hash);
            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - 60
                }, 1000, "easeInOutExpo");
            }
        });



    });


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 5);
                var positionValue = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    bgParallax();


    // function for setting two coloumn height equial
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }


    /*------------------------------------------
        = STICKY MENU
    -------------------------------------------*/
    function stickyMenu() {
        if ($(".site-header").length || $(".site-header-style2").length || $(".site-header-style3").length) {

            var headerStyle1 = $(".site-header"),
                headerStyle2 = $(".site-header-style2"),
                headerStyle3 = $(".site-header-style3"),
                navigation = $("header .navigation"),
                scroll = $(window).scrollTop(),
                headerStyle1Height = headerStyle1.find(".navigation").height(),
                headerStyle2Height = headerStyle2.find(".navigation").height(),
                top = 400,
                body = $("body");

            if (headerStyle1.length && (scroll > top)) {
                navigation.addClass("sticky");
                body.css({
                    "padding-top": headerStyle1Height + "px"
                });
            } else if (headerStyle2.length && (scroll > top)) {
                navigation.addClass("sticky2");
                body.css({
                    "padding-top": headerStyle2Height + "px"
                });
            } else if (headerStyle3.length && (scroll > top)) {
                navigation.addClass("sticky3");
            } else {
                navigation.removeClass("sticky");
                navigation.removeClass("sticky2");
                navigation.removeClass("sticky3");
                body.css({
                    "padding-top": 0
                });
            }
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function () {

                //active wow
                wow.init();

                $(window).on("scroll", function () {
                    stickyMenu();
                });
            });
        }
    }


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            wrapCSS: "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function () {
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title': this.title,
                helpers: {
                    title: { type: 'inside' },
                    media: {}
                },

                beforeShow: function () {
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
                enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FOR SORTING GALLERY
    -------------------------------------------*/
    function sortingGrids() {
        if ($(".sortable-grids .grids-filters").length) {
            var $container = $('.grids-container');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".grids-filters li a").on("click", function () {
                $('.grids-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGrids();


    /*------------------------------------------
        = BOOTSTRAP SELECT FOR LANGUAGE SELECT
    -------------------------------------------*/
    if ($('.selectpicker').length) {
        $('.selectpicker').selectpicker({
            size: 4
        });
    }


    /*------------------------------------------
        = REVULATION SLIDER FOR HERO SLIDER
    -------------------------------------------*/
    function mainSlider() {
        if ($('.tp-banner').length) {
            $('.tp-banner').revolution({
                delay: 9000,
                startwidth: 1170,
                startheight: 800,
                hideThumbs: 10,
                fullWidth: "on",
                forceFullWidth: "on",
                onHoverStop: "off",
                navigationType: "none",
                navigationStyle: "preview4",
                spinner: "off",
                hideTimerBar: "on"
            });
        }
    }

    mainSlider();


    /*-------------------------------------------------------
        = FEATURED BLOG IMAGE SETTGING FOR BETTER VIEW
    -----------------------------------------------------*/
    if ($(".featured").length) {
        var grid = $(".featured .grid");

        grid.each(function () {
            var $this = $(this);
            var imgHolder = $this.find(".img-holder");
            var imgSrc = $this.find("img").attr("src");

            imgHolder.css({
                backgroundImage: "url(" + imgSrc + ")",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            })
        })
    }


    /*------------------------------------------
        = FAN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function (e) {
            var $this = $(this),
                countTo = $this.attr('data-count');

            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
        });
    }


    /*------------------------------------------
        = PROGRESS BAR
    -------------------------------------------*/
    function progressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function () {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }

            });
        };
    }

    progressBar();


    /*------------------------------------------
        = HOME PAGE ABOUT SECTION SLIDER
    -------------------------------------------*/
    if ($(".about-us-slider").length) {
        $(".about-us-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            items: 1,
            loop: true,
            margin: 0,
            dots: false,
            center: true,
            autoplayHoverPause: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }


    /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".testimonials-slider").length) {
        $(".testimonials-slider").owlCarousel({
            autoplay: true,
            mouseDrag: false,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            dots: false,
            autoplayHoverPause: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },

                992: {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = TESTIMONIALS SLIDER STYLE TWO
    -------------------------------------------*/
    if ($(".testimonials-slider-style2").length) {
        $(".testimonials-slider-style2").owlCarousel({
            autoplay: true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            dots: false,
            autoplayHoverPause: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }


    /*------------------------------------------
        = HOME PAGE CONTACT FORM AND MAP SWITCHER  
    -------------------------------------------*/
    function concactStyleSwitcher() {
        if ($(".contact-section-wrapper .contact-switcher").length) {
            var btns = $(".contact-switcher .button"),
                mapSection = $(".contact-section-wrapper .map-wrapper"),
                contactSection = $(".contact-section-wrapper .contact-block");

            contactSection.addClass("hide-content");
            mapSection.find(".overlay").addClass("hide-content");

            btns.on("click", function () {
                var $this = $(this);
                if (!$this.hasClass("active")) {
                    $this.addClass("active");
                    $this.parent().siblings().find(".button").removeClass("active");

                    if ($this.attr("data-style") === mapSection.attr("data-style")) {
                        mapSection.removeClass("hide-content");
                        mapSection.find(".overlay").addClass("hide-content");
                        contactSection.addClass("hide-content");

                    } else if (($this.attr("data-style") === contactSection.attr("data-style"))) {
                        contactSection.removeClass("hide-content");
                        mapSection.find(".overlay").removeClass("hide-content");
                    }
                }

                return false;
            });
        }
    }

    concactStyleSwitcher();


    /*------------------------------------------
        = ABOUT COMPANY SLIDER
    -------------------------------------------*/
    if ($(".about-company-slider").length) {
        $(".about-company-slider").owlCarousel({
            autoplay: true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            dots: false,
            autoplayHoverPause: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }


    /*------------------------------------------
        = TEAM SLIDER
    -------------------------------------------*/
    if ($(".team-slider").length) {
        $(".team-slider").owlCarousel({
            autoplay: true,
            mouseDrag: false,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },

                451: {
                    items: 2
                },

                992: {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".partner-slider").length) {
        $(".partner-slider").owlCarousel({
            autoplay: true,
            items: 5,
            smartSpeed: 300,
            loop: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },

                350: {
                    items: 2
                },

                500: {
                    items: 3
                },

                991: {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = ABOUT PAGE ABOUT COMPANY SLIDER
    -------------------------------------------*/
    if ($(".about-company-s2-slider").length) {
        $(".about-company-s2-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            items: 1,
            loop: true,
            margin: 0,
        });
    }


    /*------------------------------------------
        = SERVICE SINGLE PAGE SLIDER
    -------------------------------------------*/
    if ($(".service-single-slider").length) {
        $(".service-single-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            loop: true,
            margin: 30,
            responsive: {
                0: {
                    items: 2
                },

                992: {
                    items: 2
                }
            }

        });
    }


    /*------------------------------------------
        = CHART
    -------------------------------------------*/
    function caseStudyChart() {
        if ($("#chart").length) {

            var $chart = $("#chart");
            $chart.appear();

            $(document.body).on('appear', '#chart', function () {
                var current_item = $(this);

                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');

                    var ctx = $("#chart");
                    var lineChart = new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: ["May", "June", "July", "Aug", "Sep"],
                            datasets: [
                                {
                                    label: "Other Clients",
                                    data: [2000, 3500, 2900, 3800, 3000],
                                    backgroundColor: "rgba(236,233,233, 0.5)",
                                    borderColor: "#7da2f5",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#7da2f5",
                                    pointBackgroundColor: "#fff"

                                },

                                {
                                    label: "Our clients",
                                    data: [3000, 5000, 4000, 5500, 4000],
                                    backgroundColor: "rgba(254,245,231, 0.5)",
                                    borderColor: "#f6b34a",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#f6b34a",
                                    pointBackgroundColor: "#fff"

                                },
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            animation: {
                                duration: 2500,
                            }
                        }
                    });
                }
            });
        }
    }

    caseStudyChart();


    /*------------------------------------------
        = CAREER PAGE JOB SLIDER
    -------------------------------------------*/
    if ($(".recent-job-slider").length) {
        $(".recent-job-slider").owlCarousel({
            smartSpeed: 300,
            items: 1
        });
    }


    /*------------------------------------------
        = CAREER VACANCY PAGE FILE UPLOAD
    -------------------------------------------*/
    function uploadFile() {
        if ($(".careers-vacancy-page .inputfile").length) {
            var inputs = $(".inputfile");
            Array.prototype.forEach.call(inputs, function (input) {
                var label = input.nextElementSibling,
                    labelVal = label.innerHTML;

                inputs.on("change", function (e) {
                    var fileName = '';
                    var $this = $(this);

                    if ($this.files && $this.files.length > 1) {
                        fileName = ($this.arrt("data-multiple-caption") || "").replace("{count}", $this.files.length);
                    } else {
                        fileName = e.target.value.split("\\").pop();
                    }

                    if (fileName) {
                        label.querySelector("span").innerHTML = fileName;
                    } else {
                        label.innerHTML = labelVal;
                    }
                })
            });
        }
    }

    uploadFile();


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/
    function map() {

        var myLatLng = new google.maps.LatLng(36.169941, -115.139830);
        var mapProp = {
            center: myLatLng,
            zoom: 11,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROAD
        };

        var map = new google.maps.Map(document.getElementById("map"), mapProp);
        var marker = new google.maps.Marker({
            position: myLatLng,
            icon: 'images/map-marker.png'
        });

        marker.setMap(map);

        map.set('styles',

            [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#06223e"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        );
    };


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                topic: {
                    required: true
                }

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                topic: "Select your consult topic",
            },


        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
    $(window).on('load', function () {

        preloader();

        sortingGrids();

        if ($(".map").length) {
            map();
        }

        // Set FAQ section's two col equal height
        if ($(".faq").length) {
            setTwoColEqHeight($(".faq .left-col"), $(".faq .right-col"));
        }

        // Set About page mission section two col equal height
        if ($(".about-company-s2 .mission .details").length) {
            setTwoColEqHeight($(".about-company-s2 .mission .details .left-col"), $(".about-company-s2 .mission .details .right-col"));
        }

    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {

        bgParallax();

        activeMenuItem();

    });


})(window.jQuery);
