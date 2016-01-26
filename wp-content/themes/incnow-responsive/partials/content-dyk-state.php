<?php
/**
 * The template used for displaying did you know content
 */
 
$state_name = get_the_title( incnow_get_state_id() ); // Safe to use, as long as we're consistent.
 
?>

	<div class="did-you-know row blue" style="margin-bottom: 30px;">
		<div class="seven columns">
			<h5>Did You Know?</h5>
			<?php 
			/*
			* First, check for custom content added to this particular page. If none, grab the default.
			*/ 
			
			if( get_field( 'dyk_content' ) ) { 
				echo '<p>' . the_field( 'dyk_content' ) . '</p>'; 
			} else { 
				echo '<p>' . incnow_get_page_option( 'state_dyk_content' ) . '</p>'; 
			}
			?>
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
			
			<!-- Modal Link -->
			<a class="modalLink" href="#modal1"><strong>Compare <?php echo $state_name; ?> vs. Delaware</strong></a>
			
		</div>
	</div>

