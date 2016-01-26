/*************************************
* Homepage Video Player / Dropdown
*************************************/
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
//// Create YouTube player(s) after the API code downloads.
var player1;
var player2;
var player3;

function onYouTubeIframeAPIReady() {    
	if( document.getElementById('video1') != null) { 
   		player1 = new YT.Player('video1');  
	}
    if( document.getElementById('video2') != null) {    
   		player2 = new YT.Player('video2'); 
    }   
    if( document.getElementById('video3') != null) {    
   		player3 = new YT.Player('video3');
   	}   	  
}

jQuery(document).ready(function($) {	
	// fit vids in content area
	$('#main-content').fitVids();
	$('.fit-vid').fitVids();
	// lets load the lazyYT only when it exists
	if ( $('.js-lazyYT').length ) {
		$('.js-lazyYT').lazyYT('AIzaSyD8HG4oJnKzFld2kp18OL3hbts5v5XR4qw'); 
	}
	$('#home-tabs').easyResponsiveTabs({
	    type: 'vertical', //Types: default, vertical, accordion
	    width: 'auto', //auto or any width like 600px
	    closed: 'accordion',
	    tabidentify: 'vert_1', // The tab groups identifier
	    activetab_bg: '#6f9700', // background color for active tabs in this group
        inactive_bg: '#DCDEE2', // background color for inactive tabs in this group
	    activate: function(event) { // Callback function if tab is switched
			if( document.getElementById('video1') != null) { 			
					player1.pauseVideo();
			}
			if( document.getElementById('video2') != null) { 				
					player2.pauseVideo();
			}
			if( document.getElementById('video3') != null) {
					player3.pauseVideo();	
			}	
		}
	});
	// uses entity URL string to auto highlight appropriate tab/accordian on home page
	if( urlParams["entity"] == 'corporation') {	
		$('.resp-tabs-list li:nth-child(2)').click();
	}
	if ( urlParams["entity"] == 'seriesllc') {	
		$('.resp-tabs-list li:nth-child(3)').click();
	}
});


/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 */
(function($) { 
	(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
})(jQuery);

/*************************************
* Grab URL parameters for use in JS
*************************************/
var urlParams = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

/*************************************
* Navigation / Dropdowns Accordians
*************************************/
// Large Main Dropdown Navigation Menu
(function($) { 
	$('#main-nav li.no-click>a').click(function(){ // this simply disables the clicking on the headings we don't want to function as links    
    	event.preventDefault()
 	});

	$('#main-nav ul.menu > li').on('click', function (e) {
		e.stopPropagation();		
		if ( $(this).hasClass('open') ) { 
			$(this).removeClass('open');
		} else { 
			$('#main-nav .open').removeClass('open'); 
			$(this).addClass('open'); 
		}
	});		
	// closes menu when you click outside
	$(document).on('click', function () {
		$('#main-nav .open').removeClass('open');
	});
	
	$('#main-nav .sub-menu').on('click', function(e){
		e.stopPropagation();
	});
	// For desktops
	
	//	$('.no-touch #main-nav ul.menu > li').hoverIntent({    
	//	    sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
	//	    interval: 150, // number = milliseconds for onMouseOver polling interval    
	//	    timeout: 300, // number = milliseconds delay before onMouseOut    
	//	    over:function(){
	//	        $(this).addClass("open");
	//	    },
	//	    out: function(){
	//	        $(this).removeClass("open");
	//	    }
	//	});		
	
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


// Accordion Elements
(function($) {    
       // Panels all open by default on all pages except facebook 1997 local, 1961 staging, 1967 live

		if ( $('body.page-id-1967').length ) { // if its facebook page, hide all of them	
			$('body.page .accordion > dd').hide();
		} else {
			$('body .accordion dt a').addClass("active");  	     	  
		}
      
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
	


(function($) {
	
	// Check for a URL entity and adjust all of the get started buttons/links/data accordingly
	
	if( urlParams["entity"] == 'corporation') {		
		$('.selectpicker.home').val('corporation');		
		var value = 'corporation';
		var name = $('.selectpicker.home option:selected').attr('data-name');
		var linkorder = $('.selectpicker.home option:selected').attr('data-link-order');
		var linkmore = $('.selectpicker.home option:selected').attr('data-link-more');
		var step2 = $('.selectpicker.home option:selected').attr('data-step2');
		var step3 = $('.selectpicker.home option:selected').attr('data-step3');		
		var compare = $('option:selected', this).attr('data-compare');		

		// Replace the URL of the "Get Started" link based on the selected option
		$('a.get-started').attr('href', linkorder );		
		$('.steps .step2').text( step2 );
        $('.steps .step3').text( step3 );

        // Replace the more info button with the appropriate values  
        $('li.info-but a').attr( 'href', linkmore );        
        
        // Replace the pricing button with the appropriate values 
        $('li.pricing-but a').attr( 'href', compare ).text( name + ' Pricing');       	

	} else if ( urlParams["entity"] == 'seriesllc') {	
		$('.selectpicker.home').val('seriesllc');		
		var value = 'seriesllc';
		var name = $('.selectpicker.home option:selected').attr('data-name');
		var linkorder = $('.selectpicker.home option:selected').attr('data-link-order');
		var linkmore = $('.selectpicker.home option:selected').attr('data-link-more');
		var step2 = $('.selectpicker.home option:selected').attr('data-step2');
		var step3 = $('.selectpicker.home option:selected').attr('data-step3');
		var compare = $('option:selected', this).attr('data-compare');		
		
		// Replace the URL of the "Get Started" link based on the selected option
		$('a.get-started').attr('href', linkorder );
		$('.steps .step2').text( step2 );
        $('.steps .step3').text( step3 );		
        // Replace the more info button with the appropriate values  
        $('li.info-but a').attr( 'href', linkmore );  
         // Replace the pricing button with the appropriate values 
        $('li.pricing-but a').attr( 'href', compare ).text( name + ' Pricing');         
	} 
	
	// When click any of the tabs, update selectpicker
	$('.resp-tab-item').click(function(){	
		// Change the value of the dropdown
		var select = $(this).attr('data-select');	
		$('.selectpicker.home').val( select ).change();
		$('.selectpicker.home').selectpicker('refresh');        
		return false;
	});
	// on accordion change we need to do it a bit different
	$('body').on('click', 'h2.resp-accordion', function(){		
		var index = $(this).attr('aria-controls').replace( 'vert_1_tab_item-', '' );
		var $li = $('ul.resp-tabs-list').find('li').eq(index);		
		// Change the value of the dropdown
		var select = $li.attr('data-select');	
		$('.selectpicker.home').val( select ).change();
		$('.selectpicker.home').selectpicker('refresh');        
		return false;
	});

	// Homepage select menu changes URL of "Get Started" button - and a bunch of other stuff
	$('.selectpicker.home').change(function(){
		// Grab the data we need from the active select
		var value = $('option:selected', this).val();
		var name = $('option:selected', this).attr('data-name');
		var linkorder = $('option:selected', this).attr('data-link-order');
		var linkmore = $('option:selected', this).attr('data-link-more');
		var step2 = $('option:selected', this).attr('data-step2');
		var step3 = $('option:selected', this).attr('data-step3');	
		var compare = $('option:selected', this).attr('data-compare');		
		
		// Replace the URL of the "Get Started" link based on the selected option
		$('a.get-started').attr('href', linkorder ); 		

		// change the steps text accordingly
        $('.steps .step2').text( step2 );
        $('.steps .step3').text( step3 );
		
        // Replace the more info button with the appropriate values  
        $('li.info-but a').attr( 'href', linkmore );        
              
        // Replace the pricing button with the appropriate values 
        $('li.pricing-but a').attr( 'href', compare ).text( name + ' Pricing'); 
        
        // Hide the more info button if none exists
		if (typeof linkmore == 'undefined') {
			$('li.info-but').hide();
		} else {
			$('li.info-but').show();
		}
		// Hide the pricing button if a comparison doesnt exist
		if (typeof compare == 'undefined') {			
			$('li.pricing-but').hide();
		} else {			
			$('li.pricing-but').show();
		}  
    });
    	    
})(jQuery);

//*************************************
//* Popups, courtesy of Magnific Popup
//* Documentation: http://dimsemenov.com/plugins/magnific-popup/documentation.html
//*************************************/
(function($) {

	//$('#trigger-popup-compare-llc').magnificPopup();	
	//$('#trigger-popup-compare-corporation').magnificPopup();	
	//$('#trigger-popup-compare-seriesllc').magnificPopup();	
	//$('#trigger-popup-compare-nonprofitcorporation').magnificPopup();
	//$('#trigger-popup-compare-lp').magnificPopup();
	
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

			      src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
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


/*************************************
* Lead Form Integrations
*************************************/
(function($) {
	$('form#form-ask-question').submit(function(event) {
		// Construct the contact object
		event.preventDefault();
		var ci = {};
		ci.salutationType = null;
		ci.firstName = $("form#form-ask-question #FirstName").length ? $("form#form-ask-question #FirstName").val() : "";
		ci.lastName = $("form#form-ask-question #LastName").length ? $("form#form-ask-question #LastName").val() : "";
		ci.streetAddress = "";
		ci.city = "";
		ci.state = "";
		ci.postal = "";
		ci.country = "";
		ci.email = $("form#form-ask-question #EmailAddress").val();
		ci.phone = $("form#form-ask-question #Phone").val();

		if (ci.firstName != "" && ci.lastName == "") {
			ci.lastName = ci.firstName;
			ci.firstName = "";
		}
		
		// Construct the lead object
		var lead = {};
		lead.id = null;
		lead.tempId = null;
		lead.contactInfo = ci;
		var entityName = $('form#form-ask-question #EntityName').val() ? $('form#form-ask-question #EntityName').val() : "";
		var entityType = entityName ? $('form#form-ask-question #EntityType').val() : "";
		lead.entityInfo = {name:entityName,stateType:"",type:entityType,id:"",active:"",incorporationDate:"",fileNumber:""};
		lead.description = $('form#form-ask-question #Questions').val();
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


// Ask a Question Form
(function($) {
	
	// "I have a question about my current company." checkbox
	$('form#form-ask-question #CompanyQuestion').click(function() {
	    if( $(this).is(':checked')) {
	        $("#CompanyQuestionExpanded").show();
	    } else {
	        $("#CompanyQuestionExpanded").hide();
	    }
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
	//$.ajax defaults
	$.ajaxSetup({
		type: "POST",
		data: "{}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async: true,
		cache: false,
	});
})(jQuery);
