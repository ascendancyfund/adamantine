/**
	Fortuna Common JS functionaly 
**/


// Global Vars
var boc_is_mobile 			= (bocJSParams.boc_is_mobile_device) ? true : false;
var boc_theme_url 			=  bocJSParams.boc_theme_url;
var boc_default_empty_image	=  boc_theme_url+"/images/no_img.jpg";
var sticky_header 			= (bocJSParams.sticky_header =='0')?false:true;
var transparent_header 		= (bocJSParams.transparent_header =='0')?false:true;
var fixed_footer 				= (bocJSParams.fixed_footer =='0')?false:true;
var submenu_arrow_effect		= (bocJSParams.submenu_arrow_effect =='0')?false:true;
var mm_bordered_columns		= (bocJSParams.mm_bordered_columns =='0')?false:true;
var boc_woo_lightbox_enabled	= (bocJSParams.boc_woo_lightbox_enabled =='0')?false:true;
var boc_submenu_animation_effect = bocJSParams.boc_submenu_animation_effect;

jQuery(document).ready(function($){
	
	var header_h = $('#header').height();
	var win_width = getWindowWidth();
	
	// If an error with an Image occurs default it to an existing empty image
	var img = $('img');
	img.error(function() {
		$(this).attr('src', boc_default_empty_image);
	});	
	
	if(boc_is_mobile){
		// IF Header is transparent pull content up and remove it
		if((jQuery('#header').boc_doesExist()) && ($('#header').hasClass('transparent_header'))){
			$('#header').removeClass('transparent_header');
			$('.content_body').css('marginTop', -header_h + 'px');
		}
		$('#header').addClass('mobile_force_relative_position');
		$('#footer').addClass('mobile_force_relative_position');
	}
	// Push down content
	if(sticky_header && (jQuery('#header').boc_doesExist()) && !transparent_header && !boc_is_mobile){
		if(win_width >= 1018){
			$('.content_body').css('marginTop', header_h + 'px');
		}
	}
	
	// Responsive menu initiate
	mobile_menu_init();

	// MENU LOGIC - Customize to keep HTML logic the same
	
	$('#menu').addClass(boc_submenu_animation_effect);
	if(submenu_arrow_effect){
		$('#menu').addClass('arrow_effect');
	}
	$('#menu .children').prev().append('<span></span>');
//	$('#mobile_menu .children').prev().append('<span></span>');
	
	$('#menu .children').addClass('sub-menu');
	$('#menu .sub-menu').prev('a').addClass('no_border');
	$('#menu .sub-menu').wrap('<div/>');
	$('#menu .sub-menu li a').wrapInner('<span/>');
	$('#menu .sub-menu > li:last-child > a').addClass('last_submenu_item');	
	$('#menu li:not(.megamenu) .sub-menu > li > div').addClass('subsub_menu');
		
	$('#menu .subsub_menu > ul > li > div').removeClass('subsub_menu').addClass('subsubsub_menu');
	$('#menu .subsubsub_menu > ul > li > div').addClass('subsubsub_menu');
	
	$('#menu .subsub_menu').prev('a').addClass('sub_menu_parent');	
	$('#mobile_menu ul li a > span').addClass('icon').addClass('icon-chevron-down');		
	$('#mobile_menu ul li a > span').click(function(e){	
		e.preventDefault();
		$(this).parent('a').next('ul').stop(true,true).slideToggle(500);
		if($(this).hasClass('icon-chevron-down')) {
			$(this).removeClass('icon-chevron-down').addClass('icon-chevron-up');	
		}else {
			$(this).removeClass('icon-chevron-up').addClass('icon-chevron-down');	
		}
	});
	
	// Megamenu
	$('#menu li.megamenu > div').addClass('container').addClass('mega_menu_holder');

	if(mm_bordered_columns && !boc_is_mobile){
		mm_highest_column_h = $('#menu > ul > li.megamenu  > div').innerHeight();
		$('#menu > ul > li.megamenu  > div > ul > li').each(function(){
			$(this).height(mm_highest_column_h - 40);
		});
	}
	
	// Hide invisible mm contianers and show their children
	$('#mobile_menu > ul > li ul > li.mm_hide > a').hide().siblings('ul').show();


	$(window).smartresize(function() {
		var win_width = getWindowWidth();
		if(win_width >= 1018){
			$('#mobile_menu').css('display', 'none');
			if($('#mobile_menu_toggler').hasClass('active_mobile_menu')){	
				$('#mobile_menu_toggler').removeClass('active_mobile_menu');
				$('.m_nav_ham').removeClass('m_nav_menu').addClass('button_closed');
				$("#m_ham_1").removeClass("m_nav_ham_1_open");
				$("#m_ham_2").removeClass("m_nav_ham_2_open");
				$("#m_ham_3").removeClass("m_nav_ham_3_open");
			}
		}
	});
	// MENU LOGIC :: END


	// Menu Animation
    $('#menu > ul > li:not(.megamenu)').hover(
        function() {
            $(this).addClass("active");
         /*   $(this).find('> div').not('.subsub_menu, .subsubsub_menu').stop(true, false).fadeIn({
            	duration: 300,
			});*/
        },
        function() {
            $(this).removeClass("active");
         /*   $(this).find('> div').not('.subsub_menu, .subsubsub_menu').stop(true, false).fadeOut({
            	duration: 150,
            });*/
    });
    
	// Sub Menu Animation
    $('#menu > ul > li li').hover(
        function() {
			$(this).addClass("active");
         /*   $(this).find('> .subsub_menu').stop(true, false).fadeIn({
            	duration: 300,
			});*/
        },
        function() {
			$(this).removeClass("active");			
         /*   $(this).find('> .subsub_menu').stop(true, false).fadeOut({
            	duration: 150,
            });*/
	});	
 
	// Megamenu
    $('#menu > ul > li.megamenu').hover(
        function() {
            $(this).addClass("active");
         /*   $(this).find('> div').fadeIn({
            	duration: 200,
			});*/
        },
        function() {
            $(this).removeClass("active");
		/*	$(this).find('> div').fadeOut({
            	duration: 100,
            });*/
    });
	

	// Comment Button add Classes
	$('#commentform input#submit').addClass('button btn_theme_color btn_rounded');

	
	// Search in Header
	$('.boc_search_toggle_li a').click(function(){
		$('#boc_searchform_in_header').fadeToggle(200);
		$('#boc_searchform_in_header').toggleClass('activated');
		$('#boc_searchform_in_header input').focus();
	});
	$('#boc_searchform_close').click(function(){
		$('#boc_searchform_in_header').fadeToggle(200);
		$('#boc_searchform_in_header').toggleClass('activated');
	});
	// Close forms
	$('#boc_searchform_in_header, .boc_search_toggle_li').click(function( event ) {
		event.stopPropagation();
	});
	$(document).click( function(){
		$('#boc_searchform_in_header').removeClass('activated').fadeOut(200);
	});
	
	$('.boc_search_toggle_li a').click(function(e){
		e.preventDefault();
	});
	// Search in Header :: END
	
	
	// Sidebar Menu
	$('#sidebar .widget_categories > ul, #sidebar .widget_nav_menu  > div > ul, #sidebar .widget_pages ul:first, #sidebar .widget_meta ul, #sidebar .widget_recent_entries ul, #sidebar ul.product-categories').addClass('side_bar_menu');
	$('#sidebar ul.side_bar_menu a').wrapInner('<span class="link_span"/>').prepend('<span class="hover_span"></span>');
	
	// Sidebar Menu effects
	$('.side_bar_menu a').not(".active").hover(
			function() {
				$(this).children('.hover_span').stop().animate({width:'100%'},500,'easeOutExpo');
			},
			function() {
				$(this).children('.hover_span').stop().animate({width:'0'},200,'easeOutExpo');
			}
	);	
	
	// Sidebar Nav effects	
	$('.side_bar_nav a').not(".active").hover(
		function() {
			$(this).children('.hover_span').stop().animate({width:'100%'},500,'easeOutExpo');
		},
		function() {
			$(this).children('.hover_span').stop().animate({width:'0'},200,'easeOutExpo');
		}
	);	
	
//	$('#sidebar .left_title').addClass('title_bgr');
//	$('.testimonials').siblings('.left_title').removeClass('title_bgr');
	$('.testimonials').parents('.textwidget').css('paddingBottom',0);


	// Top Comment class
	$('.single_comment:first').addClass('first_comment');
	
	// Footer Navigation pushoff
	$('#footer .menu').addClass('margined_left');
	$('#footer .menu').parent().prev('h3').addClass('margined_left');


	// Sidebar Nav effects	
	$('.side_bar_nav a').not(".active").hover(
		function() {
			$(this).children('.hover_span').stop().animate({width:'100%'},500,'easeOutExpo');
		},
		function() {
			$(this).children('.hover_span').stop().animate({width:'0'},200,'easeOutExpo');
		}
	);
	
	// TABS
	// First we build the tabs
	$('.resp-tabs-container .single_tab_div').each(function(){
		var title = $(this).attr('rel-title');
		// Replace spaces with dashes for ID
		var title_id = title.replace(/\s+/g, '-').toLowerCase();
		var icon = $(this).attr('rel-icon');
		var icon_html = (icon!=='') ? "<span class='"+ icon +"'></span> " : '';
		$(this).parent('.resp-tabs-container').prev('ul.resp-tabs-list').append('<li id="'+ title_id +'">'+ icon_html + title +'</li>');
	});
	
	$('.newtabs').each(function(){
		var type = $(this).hasClass("vertical")? "vertical" : "horizontal";
		$(this).easyResponsiveTabs({
			type: type,
			width: 'auto',
			fit: true
		});
		$(this).animate({opacity: 1},200);
		
		// Check for page's hashtag, if it matches - click the tab
		if(window.location.hash) {
		  var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		  $(this).find(':first-child').children(".resp-tab-item").each(function(){			
				if($(this).attr("id") == hash) {
					$(this).click();
				}
		  });
		}
	});
	
	
	/* Accordions */
	$(".accordion").click(function(){
		
		$(this).parent('.acc_item').siblings().children(".accordion_content").not($(this).siblings(".accordion_content")).slideUp(400,'easeInOutExpo');
		$(this).parent('.acc_item').siblings().children(".accordion").not($(this)).removeClass("active_acc");

		$(this).next(".accordion_content").slideToggle(800,'easeInOutExpo');
		
		if($(this).hasClass('active_acc')){
			$(this).removeClass("active_acc");
		}else{
			$(this).addClass("active_acc");
		}
	});
	
	// Open Active accordion item when scrolled to	
	window.setTimeout(function(){
		$('.acc_is_open').waypoint(function () {
			if(!$(this).parent('.accordion').hasClass('active_acc')){
				$(this).click();
			}
		}, { offset:'85%',triggerOnce: true });
	}, 800);
	/* Accordions::END */

	
	

	
	
	/* Info Messages */
	$(".closable").each(function(){
		$(this).prepend('<a class="close_img icon"></a>');		
	});
	
	$(".close_img").click(function(){
		$(this).parent().fadeOut(600);
	});
	
	// If responsive mode is enabled set Variable
	if($('#wrapper').hasClass('responsive')) {		
		responsive_mode = true;
	}else {
		responsive_mode = false;
	}
	
	

	// Tooltips
	$('.tooltipsy').tipsy({fade: true, gravity: 's'});

	// VC Image links, make em MFP
	$(".vc_single_image-wrapper").each(function(){
		var c = $(this).parent();
		if(c.is("a")) {
			c.addClass("mfp_popup");
		}
	});
	
	// Magnific Popup Items
	$("a.mfp_popup").magnificPopup({
		type:'image',
		mainClass: 'boc_popup_spin',
		removalDelay: 200,
		fixedContentPos: false,
	});	
	$(".mfp_gallery").each(function() {
		$(this).magnificPopup({
			delegate: "a.mfp_popup_gal",
			type:'image',
			gallery:{	
				enabled: true
			},
			mainClass: 'boc_popup_spin',
			removalDelay: 200,
			fixedContentPos: false,
		});
	});
	
	// For Videos, GMaps
	$("a.mfp_iframe_popup, .wpb_single_image.mfp_iframe_popup a").magnificPopup({
		type:'iframe',
		mainClass: 'boc_popup_spin',
		removalDelay: 200,
		fixedContentPos: false,
	});	 

    
	// WooCommerce product page custom gallery
	if(boc_woo_lightbox_enabled) {
		$(".boc_single_product .images").each(function() {
			$(this).magnificPopup({
				delegate: "a",
				type:'image',
				gallery:{	
					enabled: true
				},
				mainClass: 'boc_popup_spin',
				removalDelay: 200,
				fixedContentPos: false,
			});
		});
	}
	
	
	

    
    // Animate icons fading
	$('#subheader a.header_soc_icon').hover(
		function() {
			$(this).siblings('a').stop().fadeTo(100, 0.5);
			$(this).stop().fadeTo(100, 1);
		},
		function() {
			$(this).siblings('a').stop().fadeTo(100, 0.9);
			$(this).stop().fadeTo(100, 0.9);
		}	
	);

    // Animate icons fading
	$('.footer_soc_icon').hover(
		function() {
			$(this).siblings('a').stop().fadeTo(100, 0.35);
		},
		function() {
			$(this).siblings('a').stop().fadeTo(100, 1);
		}
	);

    // Resize Videos to Inherit parent width
    $(function() {

        var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='//player.vimeo.com'], iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], iframe[src^='//www.youtube.com'], object, embed").not('.rev_slider iframe');

    	$allVideos.each(function() {
    		$(this)
    	    // $ .data does not work on object/embed elements
    	    .attr('data-aspectRatio', this.height / this.width)
    	    .removeAttr('height')
    	    .removeAttr('width');
    	});

    	$(window).smartresize(function() {
    	  $allVideos.each(function() {
    		    var nWidth = $(this).parent().width();
				$(this).width(nWidth).height(nWidth * $(this).attr('data-aspectRatio'));
    	   });
    	}).resize();
    });


	// Equal Height Columns
	$('.equal_height_column').matchHeight();
	
	// Vertically Align Content in Columns
	$(".align_middle_column.wpb_column > .wpb_wrapper").verticalAlignMiddle();

	
	// Custom BOC Waypoints
	
	// Bar graph
	$('.bar_graph.boc_animate_when_almost_visible_custom_start:not(.boc_start_animation)').waypoint(function () {
		var b_width = $(this).find("span").attr("data-width");
		$(this).addClass('boc_start_animation');
			$(this).find("span").animate({width: b_width+"%"},2000,"easeOutCubic");
			$(this).find("span strong").animate({opacity: 1},2000,"easeOutCubic");	
	}, { offset:'85%',triggerOnce: true });


	// Add Delays for specific theme elements	
	
	// Portfolio, Post Items (.info_item, .post_item_block) - for carousels
	$('.info_block').each(function(i, e) {
		$(e).find('.info_item.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 250;
			$(e).trans(i * delay + 'ms', '-delay');
		});
	});	
	$('.posts_carousel_holder').each(function(i, e) {
		$(e).find('.post_item_block.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 250;
			$(e).trans(i * delay + 'ms', '-delay');
		});
	});

	// Portfolio, Post Items (.info_item) - for grids & portfolio page
	$('.grid_holder.animated_items').each(function(i, e) {
		$(e).find('.portfolio_animator_class, .post_item_block').each(function (i, e) {
			var delay = 250;
			$(e).trans(i * delay + 'ms', '-delay');
		});
	});
	
	// Show all Portfolio, Post child elements at once for Grids
	window.setTimeout(function(){
		$('.grid_holder.animated_items').each(function() {
			$(this).waypoint(function () {
				$(this).find('.portfolio_animator_class, .post_item_block').addClass('boc_start_animation');
			}, { offset:'85%',triggerOnce: true });
		});
	}, 300);


	// Logo Gallery
	$('.logo_gallery').each(function (i, e) {
		var delay = 200;
		$(e).find(".col").each(function (i, e) {
			$(e).trans(i * delay + 'ms', '-delay');
		});
	});	
	
	
	// Add Delays for Identical elements on a single Row
	$('.vc_row').each(function(i, e) {
		
		// Price Columns
		$(e).find('.price_column.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 300;
			$(e).trans(i * delay + 'ms', '-delay');
		});
		
		// Person
		$(e).find('.team_block_content.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 300;
			$(e).trans(i * delay + 'ms', '-delay');
		});		
		
		// Top Icon Box
		$(e).find('.top_icon_box.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 300,
			stagger = 200 + i*500;
		
			// Each child
			$(this).children().each(function (i, e) {
				
				if(!$(this).is("a")){
					$(e).trans(i * delay + stagger + 'ms', '-delay');
				}else {
					$(e).children('.icon_holder').trans(i * delay + stagger + 'ms', '-delay');
				}
			});
		});	
		
		// Side Icon Box
		$(e).find('.side_icon_box.boc_animate_when_almost_visible:not(.boc_start_animation)').each(function (i, e) {
			var delay = 150,
			stagger = 200 + i*300;
		
			// Each child
			$(this).children().each(function (i, e) {
				
				if(!$(this).is("a")){
					$(e).trans(i * delay + stagger + 'ms', '-delay');
				}else {
					$(e).children('.icon_holder').trans(i * delay + stagger + 'ms', '-delay');
				}
			});
		});

		// Counters
		$(e).find('.single_numbers_holder.boc_anim_hidden').each(function (i, e) {

			$(this).waypoint(function () {
				var delay = 600;
				setTimeout(function(){
					$(e).find(".counter").each(function (i, e) {
						end_nu = $(e).find(".counter_hidden:first").attr("data-end-nu");
						$(e).flipCounter("startAnimation", { end_number: end_nu, duration: 1200 }).find(".counter_desc").addClass("shown");
					});
				}, i * delay );
				$(this).addClass('boc_start_animation');
				
			}, { offset:'80%',triggerOnce: true });		
		});

		// Circular Counter
		$(e).find('.circ_numbers_holder').each(function (i, e) {
			
			$(this).waypoint(function () {
				var delay = 500;
				setTimeout(function(){
				
					$(e).find(".circ_counter").each(function (i, e) {
							end_nu = parseInt($(e).find("canvas:first").attr("data-end-nu"));
							var white_text = $(e).data('white_text');
							var size = $(e).data('size');
							var angle = ($(e).data('angle') !== '') ? 0 : 0.49;

							var opts = {
								lines: 1, // The number of lines to draw
								angle: angle, // The length of each line
								lineWidth: 0.04, // The line thickness
								colorStart: $(e).data('color'),
								colorStop: $(e).data('color'),    // just experiment with them
								strokeColor: (white_text ? "#444444" : "#f5f5f5"),   // to see which ones work best for you
								shadowColor: (white_text ? "#333" : "#eeeeee"),
							};
						
							$(e).find("canvas:first").gauge(opts, end_nu);
							$(e).find(".counter_percent_sign:first").addClass("shown");

					});
				}, i * delay );	
				
			}, { offset:'80%', triggerOnce: true });
		});	
	});
	
	
	// GLOBAL BOC Waypoints 
	$('.boc_animate_when_almost_visible:not(.boc_start_animation)').waypoint(function () {
		$(this).addClass('boc_start_animation');
	}, { offset:'85%', triggerOnce: true });
	
	
	// Create Image Hover effect for Class
	$('.img_zoom_on_hover').each(function (i, e) {
		$(e).find("a").each(function (i, e) {
			$(e).wrap("<div class='pic'></div>");
			$(e).find("img").after('<div class="img_overlay"><span class="icon_zoom"></span></div>');
		});
	});	
	
	// Create Image Hover effect for products	
	$('.boc_single_product .single_product_left img').each(function (i, e) {
		$(e).wrap("<div class='pic'></div>").after('<div class="img_overlay"><span class="icon_zoom"></span></div>');
	});	
	$('.woocommerce .products .product img').each(function (i, e) {
		$(e).wrap("<div class='pic'></div>").after('<div class="img_overlay"><span class="hover_icon icon_plus"></span></div>');
	});


	// Rotate words
	$(".text_rotate").textrotator({
		animation: "flipUp", // Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
		separator: ";",
		speed: 3000 // How many milliseconds until the next word show.
	});

	// Typewriter
	$(".typewriter").each(function(){
		var array_texts = ($(this).text().split(";"));
		$(this).text("");
		$(this).waypoint(function() {
			$(this).animate({ opacity: 1 });
			$(this).typed({
				strings: 	array_texts,
				backDelay: 	4000,
				typeSpeed: 	80,
				startDelay: 300,
				loop: 		true,
				loopCount: 	1,
			});
		}, { offset:'90%',triggerOnce: true});
	});



	// Get default logo calculated width
	preloadImages($("#logo a>img"), function () {
		$('.logo_img').attr('initital_width', $('#logo a>img').width());
	});
	
	// Resize Sticky Header + Manage Transparent Logos
	function headerResize() {
		var win_width = getWindowWidth();
		if(win_width >= 1018){
			var window_y = $(window).scrollTop();	
			
			if(window_y >= (header_h - 20)){
				$('#header').addClass('scrolled');
			}else {	
				$('#header').removeClass('scrolled');
				$( ".logo_img" ).width($('.logo_img').attr('initital_width'));
			}
		}
	}
	
	// Header resizing
	if(sticky_header && !boc_is_mobile){
		headerResize();
		$(window).scroll(function () {
			headerResize();
		});
	}
	
	// Header and footer distance
	if(!boc_is_mobile){
		$(window).smartresize(function() {

			var win_width = getWindowWidth();
			if(win_width >= 1018){
				if(sticky_header && !transparent_header && (jQuery('#header').boc_doesExist())){
					// Since full_header_h will not always be correct if page is scrolled : we take larger than calculated and settings value
					var full_header_h = Math.max((Number(bocJSParams.header_height) + $('#subheader').parent('.full_header').outerHeight()), $('#header').height());
					$('.content_body').css('marginTop', full_header_h + 'px');	  
				}
				var footer_h = $('#footer').height();
				footer_h += 52;
				
				if(fixed_footer && (jQuery('#footer').boc_doesExist())){
					$('.content_body').css('marginBottom', footer_h + 'px');
				}
			}else {
				$('.content_body').css('marginTop', 0);	
				$('.content_body').css('marginBottom', 0);
			}
		});
	}
	
	

	// Hide Preloader if it is set
	if ($('#boc_page_preloader').boc_doesExist()){
		$(window).load(function(){
			boc_hide_page_preloader();
		});
	}	
	
	

	/* ----------- WooCommerce Cart ------------ */

	var notification_timeout;
	var productData;

	// Add top padding to product page if there's no pageheading
	if(!$('.full_container_page_title').boc_doesExist()) {
		$('.boc_single_product').animate({paddingTop: 40},500);
	}
	
	// Feed Product name to notification
	$('.woocommerce .product .add_to_cart_button').click(function(){
		productData = $(this).parents('li').find('h3').text();
		$('.header_cart .cart-notification span.item-name').html(productData);
	});

	// Notification
	$('.header_cart .cart-notification').hover(function(){
		$(this).fadeOut(400);
		$('.header_cart .widget_shopping_cart').stop(true,true).fadeIn(400);
		$('.header_cart .cart_list').stop(true,true).fadeIn(400);
		clearTimeout(notification_timeout);
	});

	// Header cart
	$('.header_cart').hover(function(){
		var win_width = getWindowWidth();
		if(win_width >= 1018){
			$('.header_cart .widget_shopping_cart').stop(true,true).fadeIn(400);
			$('.header_cart .cart_list').stop(true,true).fadeIn(400);
			clearTimeout(notification_timeout);
			$('.header_cart .cart-notification').fadeOut(300);
		}
	},function(e){
		$('.header_cart .widget_shopping_cart').stop(true,true).fadeOut(300);
		$('.header_cart .cart_list').stop(true,true).fadeOut(300);
	});


	$('body').bind('added_to_cart', shopping_cart_notification_show);
	$('body').bind('added_to_cart', shopping_cart_dropdown);
	
	
	
	function shopping_cart_dropdown() {
											
		if(!$('.header_cart .widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length && $('.header_cart .widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0 ) {
			
			$('.header_cart').removeClass('is_empty').addClass('is_not_empty');
			
		}else {
			$('.header_cart').addClass('is_empty').removeClass('is_not_empty');
		}
	}

	function shopping_cart_notification_show(e) {
	
		clearTimeout(notification_timeout);
		
		if(!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length && $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0 && typeof e.type != 'undefined' ) {

			setTimeout(function(){ $('.header_cart .cart-notification').fadeIn(400); },200);
			notification_timeout = setTimeout(hide_notification,3000);
		}
	}

	function hide_notification() {
		$('.header_cart .cart-notification').stop(true,true).fadeOut();
	}

	/* setTimeout(shopping_cart_dropdown,3000);*/

	/* ----------- WooCommerce Cart :: END ------------ */

	
	// Smoothscroll for Single Page
	smoothScroll.init({
		selector: '[rel="smooth_scroll"]',
		selectorHeader: '#header.sticky_header', // Selector for fixed headers
		speed: 500, 
		easing: 'easeInOutQuart',
		updateURL: false,
		offset: 0,
	});
	// Crawl all smooth_scrolls and match with current page, remove if not linking to current page
	if($('a[rel="smooth_scroll"]').boc_doesExist()){
		var boc_loc = window.location.href;
		$('a[rel="smooth_scroll"]').each(function() {
			if (boc_loc.indexOf($(this)[0].pathname) == -1) {
				$(this).removeAttr("rel");
			}
		});
	}
	// If a hash exists in URL, scroll to it
	if ( window.location.hash ) {
        var options = {
			speed: 800, 
			easing: 'easeInOutQuart',
		};
        smoothScroll.animateScroll( null, window.location.hash, options );
    }

	
	
	
	// Push header down for admin bar
	$(window).smartresize(function() {
		pushHeaderAdminBar();
	});	
	
});



// Isotope Grid
jQuery(window).load(function(){
	jQuery(function($){
		
		$(".grid_holder").each( function(i, e){
			
			// If found in Tabs, do not isotope
			if (! $(e).parents('.newtabs').boc_doesExist()) {
			
				var $container = $(e);
				$container.isotope();

				$(window).smartresize( function() {
					setTimeout(function() {
						$container.isotope();
					},400);
				});
										
				var $optionLinks = $container.prev().find(".grid_filter_inline").find("li div");

				$optionLinks.click(function(){
					var selector = $(this).attr("data-option-value");
					$container.isotope({ filter: selector });
					$container.prev().find(".grid_filter_inline li div").removeClass("current_portfolio_item");
					$(this).addClass("current_portfolio_item");
				
					return false;
				});
			}
		});				
	});
}); 


// Check if element(s) exist
jQuery.fn.boc_doesExist = function(){
	return jQuery(this).length > 0;
};


/* Hide Preloader function */
function boc_hide_page_preloader(){
	
	jQuery('#boc_page_preloader').css('opacity', 0);
	setTimeout(function(){
		jQuery('#boc_page_preloader').hide();
	}, 500);	
}


//On Page load calculate header spacing for admin bar
jQuery(window).load(function(){
	pushHeaderAdminBar();
});


// Custom WindowWidth method, will use instead of $(window).width() cuz scroll messes it up
function getWindowWidth() {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}


function pushHeaderAdminBar() {
	var wp_adm_h = jQuery('#wpadminbar').height();
	if(sticky_header && !boc_is_mobile){
		var win_width = getWindowWidth();
		if(win_width >= 1018){
			if(jQuery('#wpadminbar').boc_doesExist()) {
				jQuery('#header').css('marginTop', wp_adm_h + 'px');
				//console.log(win_width);
			}
		}else {
			jQuery('#header').css('marginTop', 0);
		}
	}else if(transparent_header && !boc_is_mobile) {
		jQuery('#header.transparent_header').css('marginTop', wp_adm_h + 'px');
	}
}

//On Page load calculate footer spacing
if(!boc_is_mobile){
	if(jQuery('#footer').boc_doesExist()){
		jQuery(window).load(function(){
			var win_width = getWindowWidth();
			if(win_width >= 1018){
				var footer_h = jQuery('#footer').height();
				footer_h += 52;
				if(fixed_footer){
					jQuery('.content_body').css('marginBottom', footer_h + 'px');
				}
			}else {
				jQuery('.content_body').css('marginBottom', 0);
			}
		});
	}
}

// For Animation transitions
jQuery.fn.trans = function () {
	var t = arguments[0],
		d = arguments[1] || '';
	if (t) {
		jQuery.each(this, function (i, e) {
			jQuery(['-webkit-', '-moz-', '-o-', '-ms-', '']).each(function (i, p) {
				jQuery(e).css(p + 'transition' + d, t);
			});
		});
	}
};

function preloadImages(imgs, callback) {
	
	var cache = [],
		imgsTotal = imgs.length,
		imgsLoaded = 0;

	// If IE start off animations right away
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');	
	var trident = ua.indexOf('Trident/');
	
	if (msie > 0) {
        // IE 10 or older => return version number
        callback();
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        callback();
    }
		
	if(jQuery(imgs).length){
		jQuery(imgs).each(function (i, img) {
			var cacheImage = document.createElement('img');
						
			cacheImage.onload = function () {
				if (++imgsLoaded == imgsTotal) callback();
			};
			cacheImage.src = jQuery(img).attr('src');
						
			cache.push(cacheImage);
		});
	}else {
		callback();
	}
}


function mobile_menu_init() {

	var 	$toggleButton = jQuery('#mobile_menu_toggler');
			$menuButton = jQuery('#m_nav_menu');
			$menuButtonBars = jQuery('.m_nav_ham');

	// Mobile Menu SlideToggle
	$toggleButton.click(function(){		
		jQuery(this).toggleClass('active_mobile_menu');
		jQuery('#mobile_menu').stop(true,true).slideToggle(400,"easeOutCubic");
	});

	// Change Button style
	$toggleButton.on("click", function(){
		if($toggleButton.hasClass('active_mobile_menu'))
		{	
			$menuButtonBars.removeClass('button_closed');
			$menuButtonBars.addClass('button_open');
			jQuery("#m_ham_1").addClass("m_nav_ham_1_open");
			jQuery("#m_ham_2").addClass("m_nav_ham_2_open");
			jQuery("#m_ham_3").addClass("m_nav_ham_3_open");

		}
		else
		{
			$menuButtonBars.removeClass('button_open');
			$menuButtonBars.addClass('button_closed');
			jQuery("#m_ham_1").removeClass("m_nav_ham_1_open");
			jQuery("#m_ham_2").removeClass("m_nav_ham_2_open");
			jQuery("#m_ham_3").removeClass("m_nav_ham_3_open");

		}
	});
}


// Check for Particles Animation
jQuery(window).load(function(){
  if(jQuery('#particles_animation').boc_doesExist()) {
	if(jQuery('#particles_animation').hasClass("particles_on_top")){
		particlesJS('particles_animation','particles_animation','top');
	}else {
		particlesJS('particles_animation','particles_animation','bottom');		
	}
  }
});