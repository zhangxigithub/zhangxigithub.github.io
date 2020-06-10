/*
gameit Scripts File
*/

// as the page loads, call these scripts
jQuery(document).ready(function ($) {

	// Replace svg images with inline svg
	jQuery('img.svg').each(function () {
		var $img = jQuery(this),
			imgID = $img.attr('id'),
			imgClass = $img.attr('class'),
			imgURL = $img.attr('src');
		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');
			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');
			// Replace image with new SVG
			$img.replaceWith($svg);
		}, 'xml');
	});

	$('.menu-icon').click(function(){
		$(this).toggleClass('open');
		$('body').toggleClass('nav-open');
	});

	$('#rules-btn').on("click", function () {
		$('.footer-copy li a').removeClass('active');
		$('#tab-1').animate({
			opacity: 0
		});
		$('#tab-2').show();
		$(this).addClass('active');
	});
	$('#contact-btn').on("click", function () {
		$('.footer-copy li a').removeClass('active');
		$('#tab-1').animate({
			opacity: 1
		});
		$('#tab-2').hide();
		$(this).addClass('active');
	});

	$('.bxslider').bxSlider({
		pager: false,
		controls: true,
		slideWidth: 500,
		slideMargin: 80,
		minSlides: 4,
		maxSlides: 4
	});

	/* default settings */
	$('.venobox').venobox();


	//BIO ROLLOVERS
	$('.bio-list li').hover(function () {
		TweenMax.to($('.bio-img', this), 0.3, {scale: 1.15, ease: Expo.easeOut});
		TweenMax.to($('h4', this), 0.3, {y: 70, ease: Power3.easeOut, scale: 1.2});
		TweenMax.to($('p', this), 0.3, {y: 65, ease: Power3.easeOut, scale: 0.8});
		TweenMax.to($('.bio-tagline', this), 0.3, {opacity: 1, ease: Power2.easeIn});
		TweenMax.to($('.bio-tagline span', this), 0.3, {y: '-40%', scale: 1, ease: Power3.easeOut});
		TweenMax.to($('.bio-social', this), 0.3, {y: 82, scale: 1, ease: Elastic.easeOut.config(1, 0.5)});
	}, function () {
		TweenMax.to($('.bio-img', this), 0.3, {scale: 1, ease: Expo.easeOut});
		TweenMax.to($('h4', this), 0.3, {y: 0, ease: Power3.easeOut, scale: 1});
		TweenMax.to($('p', this), 0.3, {y: 0, ease: Power3.easeOut, scale: 1});
		TweenMax.to($('.bio-tagline', this), 0.3, {opacity: 0, ease: Power2.easeIn});
		TweenMax.to($('.bio-tagline span', this), 0.3, {y: '50%', scale: 0.8, ease: Power3.easeOut});
		TweenMax.to($('.bio-social', this), 1, {y: 0, scale: 0.3, ease: Expo.easeOut});
	});

	$('.bio-social a').hover(function () {
		if (!TweenMax.isTweening($(this))) {
			TweenMax.fromTo($(this), 0.6, {scale: 0.8, ease: Back.easeIn}, {scale: 1, ease: Power4.easeOut});
		}
	}, function () {});

	$('.contact-radios label').hover(function () {
		if (!TweenMax.isTweening($(this))) {
			TweenMax.fromTo($(this), 0.6, {scale: 0.8, ease: Back.easeIn}, {scale: 1, ease: Power4.easeOut});
		}
	}, function () {});

	$('.animation-overlay a').hover(function () {
		if (!TweenMax.isTweening($(this))) {
			TweenMax.fromTo($(this), 0.6, {scale: 0.8, ease: Back.easeIn}, {scale: 1, ease: Power4.easeOut});
		}
	}, function () {});

	var headerAni = new TimelineMax({}),
		owlAni = $('#aniOwl'),
		bearAni = $('#aniBear'),
		elephantAni = $('#aniElephant'),
		racoonAni = $('#aniRacoon'),
		lionAni = $('#aniLion'),
		volcomAni = $('#aniVolcom'),
		beatsAni = $('#aniBeats'),
		nikeAni = $('#aniNike'),
		roxyAni = $('#aniRoxy'),
		starbucksAni = $('#aniStarbucks'),
		overlayAni = $('.animation-overlay'),
		playBtn = $('.animation-overlay a');

	headerAni
		.set(overlayAni, {opacity: 0})
		.set('.header-animation', {opacity: 1})
		.from(owlAni, 1, {opacity: 0, y: 200, ease: Power3.easeOut, delay: 0.5})
		.from(bearAni, 0.8, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.5")
		.from(elephantAni, 0.6, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.4")
		.from(racoonAni, 0.6, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.4")
		.from(lionAni, 0.4, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.2")
		.from(nikeAni, 0.4, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.3")
		.from(volcomAni, 0.6, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.2")
		.from(starbucksAni, 0.6, {opacity: 0, y: 200, ease: Power3.easeOut}, "-=0.2")
		.from(roxyAni, 0.6, {opacity: 0, y: 50, ease: Power3.easeOut}, "-=0.2")
		.from(beatsAni, 0.6, {opacity: 0, y: 50, ease: Power3.easeOut}, "-=0.2")
		.to(overlayAni, 2, {opacity: 1, ease: Power3.easeOut})
		.from(playBtn, 1, {opacity: 0, scale: .8, ease: Elastic.easeOut.config(1, 0.5)}, "-=1.5");


	var controller = new ScrollMagic.Controller(),
		avatarAni = new TimelineMax({paused: true}),
		avatars = $('.avatar-list li');

	avatarAni.staggerFromTo(avatars, 0.4, {scale: 1.3, transformOrigin: "50% 30%", immediateRender: false, ease: Back.easeOut}, {scale: 1, ease: Back.easeOut}, 0.2);

/*
	var playAvatar = avatarAni.play(),
		scene = new ScrollMagic.Scene({triggerElement: "#avatar-trigger", reverse: false})
			.setTween(playAvatar);
	controller.addScene(scene);
	*/

	$('.press-releases .release-text').matchHeight();


	$(function () {
		$('a[href*=#]:not([href=#])').click(function () {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - 30
					}, 500);
					if ($(window).width() < 600) {
						$('nav ul').slideUp();
					}
					return false;
				}
			}
		});
	});

});
