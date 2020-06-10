/*
gameit Scripts File
*/

// as the page loads, call these scripts
jQuery(document).ready(function ($) {

	if (matchMedia('only screen and (max-width: 46.25em), screen and (orientation:portrait)').matches) {
		$('video').hide();
	}

	var fullPageCreated = false;

	function createFullpage() {
		if (fullPageCreated === false) {
			fullPageCreated = true;
			$('#slider').fullpage({
				navigation: true,
				navigationPosition: 'right',
				responsive: 740,
				onLeave: function (index, nextIndex, direction) {
					var leavingSection = $(this);
					if (!matchMedia('only screen and (max-width: 46.25em)').matches) {
						if (index === 1) {
							$('#welcome .demo-wrap').removeClass('animated fadeInUp slow');
							$('#welcome .demo-wrap').addClass('animated fadeOutUp');
						}
						if (nextIndex === 2) {
							$('body').css({ "background-color": "#ee6363"});
							$('#logo .white').removeClass('animated fadein fadeout');
							$('#logo .white').addClass('animated fadein');
							$('#menu-main-nav').addClass('white');
							$('#slider .section-inner').removeClass('animated fadeInUp');
							$('#slider #find .section-inner').addClass('animated fadeInUp');

						} else if (nextIndex === 3) {
							$('body').css({ "background-color": "#875f7f"});
							$('#logo .white').removeClass('animated fadein fadeout');
							$('#logo .white').addClass('animated fadein');
							$('#menu-main-nav').addClass('white');
							$('#slider .section-inner').removeClass('animated fadeInUp');
							$('#slider #game .section-inner').addClass('animated fadeInUp');

						/* } else if (nextIndex === 4) {
							$('body').css({ "background-color": "#3fb2a8"});
							$('#logo .white').removeClass('animated fadein fadeout');
							$('#logo .white').addClass('animated fadein');
							$('#menu-main-nav').addClass('white');
							$('#slider .section-inner').removeClass('animated fadeInUp');
							$('#slider #win .section-inner').addClass('animated fadeInUp');
							$('#video-3').get(0).play(); */
						} else if (nextIndex === 4) {
							$('body').css({ "background-color": "#f0b036"});
							$('#logo .white').removeClass('animated fadein fadeout');
							$('#logo .white').addClass('animated fadein');
							$('#menu-main-nav').addClass('white');
							$('#slider .section-inner').removeClass('animated fadeInUp');
							$('#slider #claim .section-inner').addClass('animated fadeInUp');
						} else if (nextIndex === 1) {
							$('body').css({ "background-color": "#f0f0f0"});
							$('#logo .white').removeClass('animated fadein fadeout');
							$('#logo .white').addClass('animated fadeout');
							$('#menu-main-nav').removeClass('white');
							$('#welcome .demo-wrap').removeClass('animated fadeOutUp');
							$('#welcome .demo-wrap').addClass('animated fadeInUp slow');
							$('#slider .section-inner').removeClass('animated fadeInUp');
						}
					}
				}
			});
		}
	}

	createFullpage();

});
