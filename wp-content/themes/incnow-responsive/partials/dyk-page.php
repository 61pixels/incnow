<?php
/**
 * The template used for displaying did you know content
 */
?>

	<div class="did-you-know row">
		<div class="seven columns">
			<h5>Did You Know?</h5>
			
			<?php 
			/*
			* First, check for custom content added to this particular page. If none, grab the default.
			*/ 
			
			if( get_field( 'dyk_content' ) ) { ?>
						
				<p>
					<?php the_field( 'dyk_content' ); ?>
				</p>
				
			<?php } else { ?>
			
				<p>
					<?php echo incnow_get_page_option( 'page_dyk_content' ); ?>
					<a href="/why-incorporate-in-delaware/">Learn More</a>
				</p> 
				
			<?php }
			?>
			
		</div>
		<div class="five columns">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/dyk-question.png">
			<a href="#popup-entity-name" class="trigger-popup-entity-name">Check Entity Name</a>
			<a href="#popup-ask-question" class="trigger-popup-ask-question">Ask a Question</a>
		</div>
	</div>

	<?php get_template_part( 'partials/popup', 'entity-name' ); ?>