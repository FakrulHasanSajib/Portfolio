/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Ventix - Personal Portfolio Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {

		valid_section_transition()

		$('[data-toggle="tooltip"]').tooltip();
		$('.player').mb_YTPlayer();
		$('.animate').scrolla();

		$('#gallery-masonary,.blog-masonry').imagesLoaded(function() {
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});
			var $grid = $('#gallery-masonary').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: { columnWidth: '.gallery-item' }
			});
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: { columnWidth: '.blog-item' }
			});
		});

		$('.timer').countTo();
		$('.fun-fact').appear(function() {
			$('.timer').countTo();
		}, { accY: -100 });

		var t1 = new TimelineMax({ paused: true });
		t1.to(".nav-side", 1, {
			width: "45%",
			ease: Expo.easeInOut,
		});
		t1.staggerTo(".nav-item > a", 0.6, {
			top: "0px",
			ease: Expo.easeInOut
		}, 0.1, "-=0.8");
		t1.staggerTo(".nav-item a.dropdown-toggle", 0.6, {
			top: "5px",
			ease: Expo.easeInOut
		}, 0.1, "-=0.6");
		t1.reverse();
		$(document).on("click", ".nav-toggle", function() {
			t1.reversed(!t1.reversed());
		});
		$(document).on("click", ".nav-item .smooth-menu", function() {
			t1.reversed(!t1.reversed());
		});

		function valid_section_transition() {
			var section = jQuery(".section-item");
			var allLi = jQuery(".nav-side .nav-item");
			var button = jQuery(".smooth-menu");
			var wrapper = jQuery(".main-wrapper");
			var enter = wrapper.data("enter");
			var exit = wrapper.data("exit");

			button.on("click", function(e) {
				e.preventDefault();
				var element = jQuery(this);
				var href = element.attr("href");
				var sectionID = jQuery(href);
				var parent = element.closest(".nav-side .nav-item");

				if (!parent.hasClass("active")) {
					allLi.removeClass("active");
					wrapper.find(section).removeClass("animated " + enter);
					if (wrapper.hasClass("opened")) {
						wrapper.find(section).addClass("animated " + exit);
					}
					parent.addClass("active");
					wrapper.addClass("opened");
					wrapper
						.find(sectionID)
						.removeClass("animated " + exit)
						.addClass("animated " + enter);
					jQuery(section).addClass("hidden");
					jQuery(sectionID).removeClass("hidden").addClass("active");
				}

				// push hash to history for back button
				if (history.pushState) {
					history.pushState(null, null, href);
				}
			});
		}

		const testimonialCarousel = new Swiper(".testimonial-carousel", {
			direction: "horizontal",
			loop: true,
			autoplay: true,
		});

		const brand5col = new Swiper(".brand5col", {
			loop: true,
			slidesPerView: 2,
			spaceBetween: 30,
			autoplay: false,
			breakpoints: {
				768: { slidesPerView: 3, spaceBetween: 40 },
				992: { slidesPerView: 4, spaceBetween: 60 },
				1199: { slidesPerView: 5, spaceBetween: 90 }
			},
		});

		const bannerStyleOne = new Swiper(".services-style-two-carousel", {
			direction: "horizontal",
			loop: true,
			autoplay: true,
			effect: "fade",
			fadeEffect: { crossFade: true },
			pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
			navigation: { nextEl: ".services-button-next", prevEl: ".services-button-prev" }
		});

		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function() {
				var action = $(this).attr('action');
				$("#message").slideUp(750, function() {
					$('#message').hide();
					$('#submit')
						.after('<img src="assets/img/ajax-loader.gif" class="loader" />')
						.attr('disabled', 'disabled');
					$.post(action, {
							name: $('#name').val(),
							email: $('#email').val(),
							phone: $('#phone').val(),
							comments: $('#comments').val()
						},
						function(data) {
							document.getElementById('message').innerHTML = data;
							$('#message').slideDown('slow');
							$('.contact-form img.loader').fadeOut('slow', function() {
								$(this).remove()
							});
							$('#submit').removeAttr('disabled');
						}
					);
				});
				return false;
			});
		});

	}); // end document ready


	// Preloader
	function loader() {
		$(window).on('load', function() {
			$('#ventix-preloader').addClass('loaded');
			$("#loading").fadeOut(500);
			if ($('#ventix-preloader').hasClass('loaded')) {
				$('#preloader').delay(900).queue(function() {
					$(this).remove();
				});
			}
		});
	}
	loader();


	// 🧠 Handle back/forward button - activate correct section
	window.addEventListener("popstate", function() {
		var hash = window.location.hash || "#home"; // default section
		var targetLink = document.querySelector('.nav-item a[href="' + hash + '"]');
		if (targetLink) {
			targetLink.click(); // trigger the same menu action
		}
	});

})(jQuery);
