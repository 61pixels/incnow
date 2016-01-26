/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 */
(function($) { 
	(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
})(jQuery);

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // //  THIS IS THE NEW HOMEPAGE SCRIPTS // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Large Main Dropdown Navigation Menu
(function($) { 

	// For touch devices
	$('.touch #main-nav-menu').children('li').each(function(){
		
		$(this).on('click',function(){		
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$('.touch #main-nav-menu li').removeClass('active');
				$(this).addClass('active');
				event.stopPropagation();
				
				// closes menu when you click outside
				$(document).on('click touchstart',function(){		
					$('.touch #main-nav-menu li').removeClass('active');
				});
				
				// yet you can click the links in the submenu
				$('#main-nav-menu .main-nav-submenu').on('click touchstart',function(){		
					event.stopPropagation();
				});
		    }
		});

	});
	
	// For desktops
	$('.no-touch #main-nav-menu').children('li').each(function(){

		// Old code before implementing hoverIntent		
		/*
			$(this).on('mouseenter',function(){		
				$(this).addClass('active');
			}).on('mouseleave',function(){
				$(this).removeClass('active');
			});
		*/
		
		$(this).hoverIntent({    
		    sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
		    interval: 150, // number = milliseconds for onMouseOver polling interval    
		    timeout: 300, // number = milliseconds delay before onMouseOut    
		    over:function(){
		        $(this).addClass("active");
		    },
		    out: function(){
		        $(this).removeClass("active");
		    }
		});		

	});
		
})(jQuery);



// Accordion Elements
(function($) { 
                    
       // Panels all collapsed by default on pages with body.page
	   /* Temporarily disabled in favor of having them all open 
	   $('body.page .accordion > dd').hide();
	   
       $('body.page .accordion dt a').click(function(){
          if ($(this).hasClass('active')) {
               $(this).removeClass('active');
               $(this).parent().next().slideUp();
          } else {
               $('.accordion dt a').removeClass('active');
               $(this).addClass('active');
               $('.accordion dd').slideUp();
               $(this).parent().next().slideDown();
          }
          return false;
       });
       */
       
       
       // Panels all open by default on all pages
       $('body .accordion dt a').addClass("active");
       
       $('body .accordion dt a').click(function(){
          if ($(this).hasClass('active')) {
               $(this).removeClass('active');
               $(this).parent().next().slideUp();
          } else {
               $('.accordion dt a');
               $(this).addClass('active');
               $(this).parent().next().slideDown();
          }
          return false;
       });
        
       
})(jQuery);
	

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player(s) after the API code downloads.
var player1;
var player2;
var player3;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('video1');
    player2 = new YT.Player('video2');
    player3 = new YT.Player('video3');
}

	
(function($) {
	
	// Tabs on Frontpage
	$('#tabs .tab').hide();
	$('#tabs .tab:first').show();
	$('#tabs ul#big-tabs li:first').addClass('active');
	
	
	$('#tabs ul#big-tabs li a').click(function(){
		$('#tabs ul#big-tabs li').removeClass('active');
		$(this).parent().addClass('active');
		
		var currentTab = $(this).attr('href');
		var select = $(this).attr('data-select');	
		
		console.log( select );
				
		$('#tabs .tab').hide();	
				
		// Pause all players
		player1.pauseVideo();
		player2.pauseVideo();
		player3.pauseVideo();
	
		$(currentTab).show();
		
		// Change the value of the dropdown
		$('.selectpicker.home').val( select ).change();
		$('.selectpicker.home').selectpicker('refresh');

        
		return false;
	});
	
	// Homepage select menu changes URL of "Get Started" button.
	$('.selectpicker.home').change(function(){		
	
		// Grab the data we need from the active select
		var value = $('option:selected', this).val();
		var name = $('option:selected', this).attr('data-name')
		var linkorder = $('option:selected', this).attr('data-link-order')
		var linkmore = $('option:selected', this).attr('data-link-more')
		var step2 = $('option:selected', this).attr('data-step2')
		var step3 = $('option:selected', this).attr('data-step3')
		var popup = $('option:selected', this).attr('data-popup')
		
		
		// Replace the URL of the "Get Started" link based on the selected option
		$('a.get-started').attr('href', linkorder );
		
        // Replace the more info button with the appropriate values
        $('.more-info li').attr( 'class', value );
        $('.more-info li a').attr( 'href', linkmore );
        
        // Replace the pricing button with the appropriate values
        $('.pricing li').attr( 'class', value );
        $('.pricing li a').attr( 'href', '#' + popup ).attr( 'id', '#trigger-' + popup ).text( name + ' Pricing');
        
        $('.steps .step2').text( step2 );
        $('.steps .step3').text( step3 );
        
        // Hide the more info and pricing buttons for the services menu
		if (typeof linkmore == 'undefined') {
			$('.more-info li').hide();
			$('.pricing li').hide();
		} else {
			$('.more-info li').show();
			$('.pricing li').show();
		}
        
     
    });
    	    
})(jQuery);



// Ask a Question Form
(function($) {
	
	// "I have a question about my current company." checkbox
	$('form#ask-question #CompanyQuestion').click(function() {
	    if( $(this).is(':checked')) {
	        $("#CompanyQuestionExpanded").show();
	    } else {
	        $("#CompanyQuestionExpanded").hide();
	    }
	}); 
		
})(jQuery);



(function($) {
	$('form#ask-question').submit(function(event) {
		// Construct the contact object
		event.preventDefault();
		var ci = {};
		ci.salutationType = null;
		ci.firstName = $("form#ask-question #FirstName").length ? $("form#ask-question #FirstName").val() : "";
		ci.lastName = $("form#ask-question #LastName").length ? $("form#ask-question #LastName").val() : "";
		ci.streetAddress = "";
		ci.city = "";
		ci.state = "";
		ci.postal = "";
		ci.country = "";
		ci.email = $("form#ask-question #EmailAddress").val();
		ci.phone = $("form#ask-question #Phone").val();

		if (ci.firstName != "" && ci.lastName == "") {
			ci.lastName = ci.firstName;
			ci.firstName = "";
		}
		
		// Construct the lead object
		var lead = {};
		lead.id = null;
		lead.tempId = null;
		lead.contactInfo = ci;
		var entityName = $('form#ask-question #EntityName').val() ? $('form#ask-question #EntityName').val() : "";
		var entityType = entityName ? $('form#ask-question #EntityType').val() : "";
		lead.entityInfo = {name:entityName,stateType:"",type:entityType,id:"",active:"",incorporationDate:"",fileNumber:""};
		lead.description = $('form#ask-question #Questions').val();
		lead.leadSourceType = "2";

		$.ajax({
			url: "https://secure.incnow.com/v1/lead",
//			url: "http://localhost:49907/lead",
			data: JSON.stringify(lead),
			success: function (msg) {
				$.magnificPopup.open({
				  items: {
				    src: '#popup-ask-question-acknowledge'
				  },
				  type: 'inline'
				}, 0);
			},
			error: function () {
				alert("Sorry, an error occurred in our server. Please try again later.");
			}
		});
		
	});
})(jQuery);



// Entity Name Check Form
(function($) {
	$('form#entity-name-form').submit(function(event) {
		// Construct the contact object
		event.preventDefault();
		var ci = {};
		ci.salutationType = null;
		ci.firstName = $("form#entity-name-form #FirstName").length ? $("form#entity-name-form #FirstName").val() : "";
		ci.lastName = $("form#entity-name-form #LastName").length ? $("form#entity-name-form #LastName").val() : "";
		ci.streetAddress = "";
		ci.city = "";
		ci.state = "";
		ci.postal = "";
		ci.country = "";
		ci.email = $("form#entity-name-form #EmailAddress").val();
		ci.phone = $("form#entity-name-form #Phone").val();

		if (ci.firstName != "" && ci.lastName == "") {
			ci.lastName = ci.firstName;
			ci.firstName = "";
		}
		
		// Construct the lead object
		var lead = {};
		lead.id = null;
		lead.tempId = null;
		lead.contactInfo = ci;
		var entityName = $('form#entity-name-form #EntityName').val();
		var entityType = $('form#entity-name-form #EntityType').val();
		lead.entityInfo = {name:entityName,stateType:"",type:entityType,id:"",active:"",incorporationDate:"",fileNumber:""};
		lead.description = "Entity Name Search Request: " + $('form#entity-name-form #Questions').val();
		lead.leadSourceType = "2";

		$.ajax({
			url: "https://secure.incnow.com/v1/lead",
//			url: "http://localhost:49907/lead",
			data: JSON.stringify(lead),
			success: function (msg) {
				$.magnificPopup.open({
				  items: {
				    src: '#popup-entity-name-acknowledge'
				  },
				  type: 'inline'
				}, 0);
			},
			error: function () {
				alert("Sorry, an error occurred in our server. Please try again later.");
			}
		});
		
	});
})(jQuery);



// State Dropdown Menu
(function($) {

	function DropDown(el) {
		this.dd = el;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				event.stopPropagation();
			});	
		}
	}

	$(function() {
		var dd = new DropDown( jQuery('.dropdown-wrapper') );
		$(document).click(function() {
			$('.dropdown-wrapper').removeClass('active');
		});
	});

})(jQuery);



/*************************************
* Popups, courtesy of Magnific Popup
* Documentation: http://dimsemenov.com/plugins/magnific-popup/documentation.html
*************************************/
(function($) {

	// Homepage Pricing Popups
	$('#trigger-popup-compare-llc').magnificPopup();	
	$('#trigger-popup-compare-corporation').magnificPopup();	
	$('#trigger-popup-compare-seriesllc').magnificPopup();	
	$('#trigger-popup-compare-nonprofitcorporation').magnificPopup();
	$('#trigger-popup-compare-lp').magnificPopup();
	
	// "Why Delaware?" Popup
	$('.trigger-popup-why-delaware').magnificPopup({ 
		items: [
	      {
	        src: '/wp-content/themes/incnow/assets/images/lightbox/infographic01.jpg'
	      },
	      {
	        src: '/wp-content/themes/incnow/assets/images/lightbox/infographic02.jpg',
	      },
	      {
	        src: '/wp-content/themes/incnow/assets/images/lightbox/infographic03.jpg',
	      },
	      {
	        src: $('<a href="https://secure.incnow.com/order/default.aspx?type=new"><img src="/wp-content/themes/incnow/assets/images/lightbox/infographic04.jpg" /></a>'), // Dynamically created element
	        type: 'inline'
	      }
	    ],
		type: 'image',
		gallery:{
	    	enabled:true
		}
	});
	
	
	// Media popup at the bottom of pages
	$('.popup-incnow-video').magnificPopup({ 
	  type: 'iframe',
	  iframe: {
		  patterns: {
		    youtube: {
		      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
		
		      id: 'v=', // String that splits URL in a two parts, second part should be %id%
		      // Or null - full URL will be returned
		      // Or a function that should return %id%, for example:
		      // id: function(url) { return 'parsed id'; } 
		
		      src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
		    }
		}		
	}
	  
	});       
    
	$('.trigger-popup-basic-complete').magnificPopup();
	
	$('#trigger-popup-compare-states').magnificPopup();
   
	$('.trigger-popup-ask-question').magnificPopup();
	
	$('.trigger-popup-entity-name').magnificPopup();
	
	$('#trigger-popup-price-guarantee').magnificPopup();
	
	$('#trigger-popup-lead-acknowledge').magnificPopup(); 

	$('#trigger-popup-ask-question-acknowledge').magnificPopup(); 
	
})(jQuery);



// Enable select menu styling
(function($) {
	$('.selectpicker').selectpicker();
})(jQuery);



var sendStateTopperLead;

(function($) {
	function getStateTopperContactInfo() {
		var ci = {};
		ci.salutationType = null;
		ci.firstName = $("#pt-firstname").length ? $("#pt-firstname").val() : "";
		ci.lastName = $("#pt-lastname").length ? $("#pt-lastname").val() : "";
		ci.streetAddress = "";
		ci.city = "";
		ci.state = "";
		ci.postal = "";
		ci.country = "";
		ci.email = $("#pt-email").val();
		ci.phone = $("#pt-phone").val();

		if (ci.firstName != "" && ci.lastName == "") {
			ci.lastName = ci.firstName;
			ci.firstName = "";
		}

		return ci;
	}

	function getStateTopperLead() {
		var pt = $("#page-topper");
		var lead = {};
		lead.id = null;
		lead.tempId = null;
		lead.contactInfo = getStateTopperContactInfo();
		lead.entityInfo = {name:"",stateType:"",type:"",id:"",active:"",incorporationDate:"",fileNumber:""};
		lead.description = "Lead from " + document.URL + ". State Name: " + $("#pt-state-name").val() + 
			". State Code: " + $("#pt-state-code").val() + ".";
		lead.leadSourceType = "5";
		return lead;
	}

	sendStateTopperLead = function() {
		var lead = getStateTopperLead();

		$.ajax({
			url: "https://secure.incnow.com/v1/lead",
//			url: "http://localhost:49907/lead",
			data: JSON.stringify(lead),
			success: function (msg) {
				$("#trigger-popup-lead-acknowledge").trigger("click");
			},
			error: function () {
				alert("Sorry, an error occurred in our server. Please try again later.");
			}
		});
	}
})(jQuery);



(function($) {
	var $ = jQuery;
	//$.ajax defaults
	$.ajaxSetup({
		type: "POST",
		data: "{}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async: true,
		cache: false,
	});
});