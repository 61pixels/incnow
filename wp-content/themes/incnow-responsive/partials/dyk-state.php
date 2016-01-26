<?php
/**
 * The template used for displaying did you know content
 */
 
$state_name = get_the_title( incnow_get_state_id() ); // Safe to use, as long as we're consistent.
 
?>

	<div class="did-you-know blue row" style="margin-bottom: 30px;">
		<div class="seven columns">
			<h5>Did You Know?</h5>
			<?php 
			/*
			* First, check for custom content added to this particular page. If none, grab the default.
			*/ 
			
			if( get_field( 'dyk_content' ) ) { 
				echo '<p>' . the_field( 'dyk_content' ) . '</p>'; 
			} else { ?>
			
				<p>
					<?php echo incnow_get_page_option( 'state_dyk_content' ); ?>
					<a href="/why-incorporate-in-delaware/">Learn More</a>
				</p> 
				
			<?php } ?>
		</div>
		<div class="five columns">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/dyk-question-blue.png">
			<?php 
			/*
			* First, check for custom links added to this particular page. If none, grab the default.
			*/ 
			
			if( get_field( 'dyk_links' ) ) {
			
				while( has_sub_field( 'dyk_links' ) ) : 
					
					$link_object = get_sub_field( 'link_object' ); 
					$link_url = get_permalink( $link_object->ID );
					
					//print_r( $link_object );
					
					echo '<a href="' . $link_url . '">' . get_sub_field( 'link_text' ) . '</a>'; 
					
				endwhile; 					
				
			} else {
				
				while( has_sub_field( 'state_dyk_links', 'options') ) : // Grab the default set of links from the "options" section
					
					$link_object = get_sub_field( 'link_object' ); 
					$link_url = get_permalink( $link_object->ID );
					
					//print_r( $link_object );
					
					echo '<a href="' . $link_url . '">' . get_sub_field( 'link_text' ) . '</a>'; 
					
				endwhile; 	
				
			}
			?>
			
			<a id="trigger-popup-compare-states" href="#popup-compare-states"><strong>Compare <?php echo $state_name; ?> vs. Delaware</strong></a>
			<a href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/lightbox/infographic01.jpg" class="trigger-popup-why-delaware">Why Delaware is the #1 state for Incorporating.</a>
			<a href="https://www.incnow.com/order/?type=new&entity=llc">Form an LLC in Delaware now</a>
			
			
		</div>
	</div>

