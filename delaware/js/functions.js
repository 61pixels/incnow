// Custom Foundation app.js 
;(function ($, window, undefined) {
  'use strict';
  var $doc = $(document),
  Modernizr = window.Modernizr;  
 // $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
  //$.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
 // $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
  
  //$.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
  //$.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;  

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});
  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

jQuery(document).ready(function($) {
	// custom navigation for mobile phones and small resolutions
	 $('#nav-mobile-togg').click(function(){
      $('.main-nav').slideToggle();    
      $(this).toggleClass('open');     
    });
    
	
	// fade images on hover
	$('a img').hover( function() {
		$(this).stop().animate({opacity : 0.8}, 300);
	}, function() {
		$(this).stop().animate({opacity : 1}, 300);
	});
	
	// update hrs to use custom div
	$('hr').replaceWith('<div class="hr"></div>');
	
	// alt rows on marked tables
	$(".alt-row tr:odd").addClass("alt");	

 // $('.home-two-box .six').equalHeights();



});

;(function($) {    
equalheight = function(container){

  var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;
   $(container).each(function() {

     $el = $(this);
     $($el).height('auto')
     topPostion = $el.position().top;

     if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
     } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
   });
}
$(window).load(function() {
  equalheight('.home-two-box .six');
});


$(window).resize(function(){
  equalheight('.home-two-box .six');
});

})(jQuery);
