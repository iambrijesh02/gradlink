// ===================================
// GradLink Homepage - JavaScript
// ===================================

(function ($) {
    'use strict';

    // Declare bootstrap variable
    var bootstrap = window.bootstrap;

    // ===== Document Ready =====
    $(document).ready(function () {
        // Initialize tooltips and popovers
        initializeTooltips();
        
        // Handle navbar on scroll
        handleNavbarScroll();
        
        // Initialize carousel with unique IDs
        initializeCarousels();
        
        // Handle smooth scrolling
        handleSmoothScroll();
        
        // Add hover effects to feature cards
        addFeatureCardHovers();
        
        // Handle mobile menu
        handleMobileMenu();
        
        // Initialize Intersection Observer for Lazy Animation
        initializeIntersectionObserver();
    });

    // ===== Initialize Tooltips =====
    function initializeTooltips() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ===== Handle Navbar on Scroll =====
    function handleNavbarScroll() {
        var navbar = $('.navbar');
        
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 50) {
                navbar.addClass('scrolled');
                navbar.css({
                    'box-shadow': '0 2px 10px rgba(0,0,0,0.15)',
                });
            } else {
                navbar.removeClass('scrolled');
                navbar.css({
                    'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
                });
            }
        });
    }

    // ===== Initialize Carousels with Unique IDs =====
    function initializeCarousels() {
        // Carousel 1: Features
        var carousel1 = new bootstrap.Carousel(document.getElementById('carouselFeatures_1'), {
            interval: 5000,
            wrap: true,
            keyboard: true,
            pause: 'hover',
            touch: true
        });

        // Add keyboard navigation for carousel
        $(document).on('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                carousel1.prev();
            } else if (e.key === 'ArrowRight') {
                carousel1.next();
            }
        });

        // Log carousel initialization for debugging
        console.log('[GradLink] Carousel initialized with ID: carouselFeatures_1');
    }

    // ===== Handle Smooth Scrolling =====
    function handleSmoothScroll() {
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            
            var target = $(this).attr('href');
            if ($(target).length) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 80
                }, 800);
            }
        });
    }

    // ===== Add Feature Card Hover Effects =====
    function addFeatureCardHovers() {
        $('.feature-card').on('mouseenter', function () {
            $(this).css({
                'transform': 'translateY(-10px)',
                'box-shadow': '0 8px 20px rgba(0,0,0,0.15)'
            });
        }).on('mouseleave', function () {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 2px 8px rgba(0,0,0,0.1)'
            });
        });
    }

    // ===== Handle Mobile Menu =====
    function handleMobileMenu() {
        var navbarCollapse = $('.navbar-collapse');
        var navbarToggler = $('.navbar-toggler');

        // Close menu when a link is clicked
        $('.navbar-nav a').on('click', function () {
            navbarToggler.click();
        });

        // Close menu when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.navbar').length) {
                navbarCollapse.collapse('hide');
            }
        });
    }

    // ===== Intersection Observer for Lazy Animation =====
    function initializeIntersectionObserver() {
        var options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('animate__animated animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements with data-animate attribute
        $('[data-animate]').each(function () {
            observer.observe(this);
        });
    }

    // ===== Handle Window Resize =====
    $(window).on('resize', function () {
        // Handle responsive adjustments
        if ($(window).width() < 768) {
            // Mobile specific adjustments
            console.log('[GradLink] Mobile view detected');
        } else {
            console.log('[GradLink] Desktop view detected');
        }
    });

    // ===== Utility: Log Active Carousel =====
    window.getActiveCarousel = function (carouselId) {
        var carousel = document.getElementById(carouselId);
        if (carousel) {
            var bsCarousel = bootstrap.Carousel.getInstance(carousel);
            console.log('[GradLink] Carousel ' + carouselId + ' active slide:', bsCarousel._getItemIndex(bsCarousel._element.querySelector('.carousel-item.active')));
        }
    };

    // ===== Utility: Initialize New Carousel =====
    window.initializeNewCarousel = function (carouselId, interval) {
        interval = interval || 5000;
        var carouselEl = document.getElementById(carouselId);
        
        if (carouselEl) {
            new bootstrap.Carousel(carouselEl, {
                interval: interval,
                wrap: true,
                keyboard: true,
                pause: 'hover',
                touch: true
            });
            console.log('[GradLink] New carousel ' + carouselId + ' initialized with interval: ' + interval + 'ms');
        } else {
            console.error('[GradLink] Carousel element with ID: ' + carouselId + ' not found');
        }
    };

    // ===== Page Load Complete =====
    $(window).on('load', function () {
        console.log('[GradLink] Page loaded successfully');
        $('body').addClass('loaded');
    });

})(window.jQuery);
