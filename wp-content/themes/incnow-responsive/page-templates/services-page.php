<?php
/**
 * Template Name: Other Services Template
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">		
			<div class="nine columns">
				<section id="content">
					
					<?php get_template_part( 'partials/content', 'flexible' ); ?>
					
					<?php get_template_part( 'partials/cta', 'services' ); ?>	
					
					<?php if ( function_exists( 'sharing_display' ) ) echo sharing_display(); ?>
					
					<?php get_template_part( 'partials/bottom', 'media' ); // YouTube video and Twitter feed ?>
					
				</section>		
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>		
		</div>
	</div>

<?php get_footer(); ?>