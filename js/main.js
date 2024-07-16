(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Testimonials carousel initialization
    function initOwlCarousel() {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            margin: 24,
            dots: true,
            loop: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Fetch testimonials from API and update HTML
    $.ajax({
        url: 'https://restframeworks.pythonanywhere.com/api/testimonials/',
        method: 'GET',
        success: function(response) {
            if (response && response.length > 0) {
                var testimonials = '';
                response.forEach(function(item) {
                    testimonials += `
                        <div class="testimonial-item bg-transparent border rounded p-4">
                            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p>${item.Description}</p>
                            <div class="d-flex align-items-center">
                                <img class="img-fluid flex-shrink-0 rounded-circle" src="${item.photo}" style="width: 50px; height: 50px;">
                                <div class="ps-3">
                                    <h5 class="mb-1">${item.name}</h5>
                                    <small>${item.proffession}</small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#testimonialCarousel').html(testimonials);
                initOwlCarousel(); // Initialize Owl Carousel after content is added
            }
        },
        error: function(error) {
            console.error('Error fetching testimonials:', error);
        }
    });

    
    // Fetch food menu items from API and update HTML
    $.ajax({
        url: 'https://restframeworks.pythonanywhere.com/api/food-menus/type/Veg/',
        method: 'GET',
        success: function(response) {
            if (response && response.length > 0) {
                var menuItems = '';
                var baseURL = 'https://restframeworks.pythonanywhere.com'; // base URL for the images
                response.forEach(function(item) {
                    menuItems += `
                        <div class="col-lg-6">
                            <div class="d-flex align-items-center">
                                <img class="flex-shrink-0 img-fluid rounded" src="${baseURL + item.image}" alt="${item.name}" style="width: 80px; height:80px;">
                                <div class="w-100 d-flex flex-column text-start ps-4">
                                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                                        <span>${item.name}</span>
                                    </h5>
                                    <small class="fst-italic">${item.ingredients}</small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#menuItems').html(menuItems);
            }
        },
        error: function(error) {
            console.error('Error fetching food menu items:', error);
        }
    });

    $.ajax({
        url: 'https://restframeworks.pythonanywhere.com/api/food-menus/type/non_veg/',
        method: 'GET',
        success: function(response) {
            if (response && response.length > 0) {
                var menuItemss = '';
                var baseURL = 'https://restframeworks.pythonanywhere.com'; // base URL for the images
                response.forEach(function(item) {
                    menuItemss += `
                        <div class="col-lg-6">
                            <div class="d-flex align-items-center">
                                <img class="flex-shrink-0 img-fluid rounded" src="${baseURL + item.image}" alt="${item.name}" style="width: 80px; height:80px;">
                                <div class="w-100 d-flex flex-column text-start ps-4">
                                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                                        <span>${item.name}</span>
                                    </h5>
                                    <small class="fst-italic">${item.ingredients}</small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#menuItemss').html(menuItemss);
            }
        },
        error: function(error) {
            console.error('Error fetching food menu items:', error);
        }
    });


    $.ajax({
        url: 'https://restframeworks.pythonanywhere.com/api/about/3/',
        method: 'GET',
        success: function(response) {
            if (response && response.images && response.images.length >= 4) {
                $('#image1').attr('src', response.images[0].image);
                $('#image2').attr('src', response.images[1].image);
                $('#image3').attr('src', response.images[2].image);
                $('#image4').attr('src', response.images[3].image);
            }
        },
        error: function(error) {
            console.error('Error fetching images:', error);
        }
    });
    
    // Fetch image from API and update src
    $.ajax({
        url: 'https://restframeworks.pythonanywhere.com/api/home/',
        method: 'GET',
        success: function(response) {
            if(response && response.length > 0) {
                $('#heroImage').attr('src', response[0].image);
            }
        },
        error: function(error) {
            console.error('Error fetching image:', error);
        }
    });

})(jQuery);