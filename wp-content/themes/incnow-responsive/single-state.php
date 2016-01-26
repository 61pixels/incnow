<?php
/**
 * The template for displaying State pages. Also handles routing for the Florida/Nevada homepages.
*/
 
// Check for a template set in the admin
$state_template = get_field( 'state_template' ); 


// Now, check for the Florida homepage 
if( is_single( 'florida' ) ) { // Check based on the slug, which should be consistent 
	 include( 'page-templates/homepage-florida.php' );
	 exit; // All done here! Don't load anything else.
	 
// Now do the same for Nevada
} else if( is_single( 'nevada' ) ) {
	include( 'page-templates/homepage-nevada.php' );
	exit; // Done!

// And check for the Nevada/Florida sub-pages
} else if( incnow_is_state( 'FL' ) OR incnow_is_state( 'NV' ) ) {
	
	// Check for the services template
	if( $state_template == 'state_services' ) {
		include( 'page-templates/services-page.php' ); // Run it using the services page template
		exit; // Done!
	} else if($state_template == 'fl_llc') { // if its the florida llc compare
		include( 'page-templates/template-compare-florida-llc.php' ); 
		exit; // Done!
	} else if($state_template == 'fl_corp') { // if its the florida corp compare
		include( 'page-templates/template-compare-florida-corp.php' ); 
		exit; // Done!
	// Not a service? Run it through the standard template
	} else {
		include( 'page-templates/standard-page.php' );
		exit; // Done!
	}

}

// Alright, homepages and specialty pages are taken care of - Let's start working on the other pages.

get_header(); ?>

	<?php get_template_part( 'partials/state', 'topper' ); ?>
	
	<div id="main-content">
		<div class="row">
			<div class="nine columns">		
				<section id="content" class="state">		
					<?php 
						// Check which template is set and display accordingly
						switch( $state_template ) { 
							
							case 'state_single' :
								get_template_part( 'content', 'state-single' );
								break;
								
							case 'state_faq' :
								get_template_part( 'content', 'state-faq' );
								break;
								
							case 'state_basic' :
								get_template_part( 'partials/content', 'flexible' ); // Go straight to the content!
								break;
														
							case 'state_services' :
								get_template_part( 'partials/content', 'flexible' ); // Go straight to the content!
								get_template_part( 'partials/cta', 'services' ); 
								break;
								
						}			
					 ?>			
				</section>
			</div>
			<div class="three columns" role="complementary">		
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>

<?php get_footer(); ?>