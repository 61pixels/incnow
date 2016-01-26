<?php
/**
 * The template used for displaying page content in single-testimonial.php
 */
?>
	
		<article <?php post_class(); ?>>
		
			<div class="testimonial">
				<div class="testimonial_text">
					<?php if( get_field( 'testimonial' ) ) { ?>
						<?php the_field( 'testimonial' ); ?>
					<?php } ?>
				</div>
				<div class="testimonial_signature">
					<?php if( get_field( 'author_name' ) ) { ?>
					<div class="author_name"><?php the_field( 'author_name' ); ?></div>
					<?php } ?>
					<?php if( get_field( 'author_title' ) ) { ?>
					<div class="author_title"><?php the_field( 'author_title' ); ?></div>
					<?php } ?>
					<?php if( get_field( 'author_company' ) ) { ?>
					<div class="author_company"><?php the_field( 'author_company' ); ?></div>
					<?php } ?>
					<?php if( get_field( 'author_website' ) ) { ?>
					<div class="author_website"><?php the_field( 'author_website' ); ?></div>
					<?php } ?>
				</div>
			</div>
	
		</article>