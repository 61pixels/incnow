<?php
/**
 * The template used for displaying page content in single-state.php
 */
  
$state_name = get_the_title( incnow_get_state_id() ); 
$state_slug = strtolower( str_replace( ' ', '-', $state_name ) );

?>
		<?php get_template_part( 'partials/dyk', 'state' ); ?>
		
		<div class="state-intro">
			<?php if( get_field( 'state_photo' ) ) 
			{ 					
				$photo = get_field( 'state_photo' );
				$photo_src = wp_get_attachment_image_src( $photo['id'], '230x150' );
				$photo_url = $photo_src[0];
				
				echo '<img src="' . $photo_url . '" title="A photo of ' . $state_name . '" alt="photo" />';
				
			} else {
				echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/states/graphics/' . $state_slug . '.jpg">';
			}
			?>
			
			<?php if( get_field( 'state_introduction' ) ) { ?>
			<p><?php the_field( 'state_introduction' ); ?></p>
			<?php } ?>
		</div>
		
		<?php get_template_part( 'partials/content', 'flexible' ); ?>
		
		<?php get_template_part( 'partials/popup', 'compare-states' ); ?>