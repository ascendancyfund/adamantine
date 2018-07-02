jQuery(document).ready(function($){
	
	// Remove Duplicate Popups IDs
	jQuery('.pps-popup').each(function(){
		var ids = jQuery('[id=\''+this.id+'\']');
		if(ids.length > 1)
			ids.slice(1).remove();
	});
	//Fix Max Height
	var wHeight = jQuery(window).height();
	jQuery(".pps-popup").css('max-height',wHeight-70);
	
	//Fix Pause Video Youtube
	arrayIframe = [];
	jQuery('.pps-embed iframe, .pps-content-wp-editor iframe, .pps-iframe iframe').each(function(i, el){
		jQuery(this).wrap('<div id="pps-video-fix-'+i+'" class="pps-video-fix"></div>');
		var iframe = jQuery(this).parent().html();
		arrayIframe[i] = iframe;
		//jQuery(this).remove();
	});
	removeIframesVideos();
	
	//Fix Close Multiple Popups
	jQuery('.pps-popup .pps-btn').on('click',function(e){
		e.preventDefault();
		//idPopup = jQuery(this).attr('class').replace(/[^0-9\.]/g,'');
		idPopupParent = jQuery(this).closest('.pps-popup').attr('id').replace(/[^0-9\.]/g,'');
		//jQuery('.pps-close-link-'+idParent).click();
		jQuery('#popuppress-'+idPopupParent).bPopup().close();
	});
	//Restore views Popups
	jQuery('a.restore-views').on('click',function(e){
		e.preventDefault();
		idPopup = jQuery(this).attr('href').replace('?popup_id=','');
		if(confirm("Really you want restore values?"))
			updateViewsPopupPress(idPopup,"restore");
	});
	
});

function onOpenPopupPress(id){
	if(jQuery("#popuppress-"+id).find('.pps-single-popup').length ){
		if(jQuery("#popuppress-"+id).find('.pps-iframe').length){
			jQuery("#popuppress-"+id).find('.pps-iframe').append('<span class="pps-loading"></span>');
			setTimeout(function(){
				jQuery('.pps-loading').remove();
			}, 1800);
		}
	}
}
/*
function centerPopupPress(id){
	setTimeout(function(){
		jQuery("#popuppress-"+id).animate({
			top: (jQuery(window).height() - jQuery("#popuppress-"+id).outerHeight() )/2 + jQuery(window).scrollTop(),
			left: (jQuery(window).width() - jQuery("#popuppress-"+id).outerWidth() )/2
		},300);
	},100);
}

*/
function contentFromIdPopupPress(id, idDivContent) {
	if(idDivContent){
		var idDivContent = idDivContent.replace('#','');
		var contentDiv = jQuery("#"+idDivContent).clone();
		jQuery("#popuppress-"+id).find('.pps-content-by-id').html(contentDiv);
	}
}

function removeIframesVideos(){
	if(jQuery('.pps-video-fix').length){
		jQuery('.pps-video-fix').each(function(i, el){
			jQuery(this).find('iframe').remove();
		});
	}
}

function pauseVideosPopupPress(id) {
	removeIframesVideos();
	
	if(jQuery('.pps-video-fix').length){
		setTimeout(function(){
			jQuery('ul.slides-pps li').each(function(i, el){
				var This = jQuery(this);
				if(This.attr('class') == 'pps-active-slide'){
					var j = This.find('.pps-video-fix').attr("id").replace("pps-video-fix-",'');
					This.find('.pps-video-fix').html(arrayIframe[j]);
					jQuery("#popuppress-"+id).height("auto");
				}
			});	
		},100);
	}
}

function restoreVideosPopupPress(id){
	if(jQuery('.pps-video-fix').length){
		jQuery('.pps-video-fix').each(function(i, el){
			var j = jQuery(this).attr("id").replace("pps-video-fix-",'');
			jQuery(this).html(arrayIframe[j]);
		});
		setTimeout(function(){
			jQuery('.pps-video-fix').each(function(i, el){
				var j = jQuery(this).attr("id").replace("pps-video-fix-",'');
				var ppsPopup = jQuery(this).closest(".pps-popup");
				if( ppsPopup.css("display") == "none" ){
					jQuery(this).find('iframe').remove();
				}
				if( ppsPopup.css("display") == "block" ){
					jQuery(this).html(arrayIframe[j]);
				}
			});
		}, 200);
	}
	
}

function removeVideosPopupPress(id){
	if(jQuery('.pps-video-fix').length){
		setTimeout(function(){
			jQuery('div.pps-video-fix').each(function(i, el){
				jQuery(this).find('iframe').remove();
			});
		}, 200);	
	}
}


function refreshTopPosition(id) {
	var wHeight = jQuery(window).height();
	var wScrollTop = jQuery(window).scrollTop();
	var popupHeight = jQuery("#popuppress-"+id).outerHeight();
	var topPosition = 20;
	if( wHeight > popupHeight )
		topPosition = wScrollTop + (wHeight-popupHeight)/2;
	jQuery("#popuppress-"+id).animate({top: topPosition + 5 }, 500 );
}


function updateViewsPopupPress(id,restore){
	datos = 'action=update_views_popups&plugin=popuppress&id='+id+'&restore=no';
	if(restore)
		datos = 'action=update_views_popups&plugin=popuppress&id='+id+'&restore=yes';
	jQuery.ajax({
		type: "POST",
		url: PPS.ajaxurlPps,
		data: datos,
		success: function(result){
			var data = jQuery.parseJSON(result);
			if(data.success == true){
				if(jQuery('table.wp-list-table').length){
					jQuery('tr#post-'+id+' td.column-views > p > span:eq(0)').html(data.views);
				}
			}
		}
	});
	
}
function closeSettingsPopupPress(id,close_mouseleave){
	if(close_mouseleave == 'true') {
		jQuery("#popuppress-"+id).mouseleave(function() {
				jQuery(this).bPopup().close();
				jQuery('.b-modal').remove();
		});	
	}
}
