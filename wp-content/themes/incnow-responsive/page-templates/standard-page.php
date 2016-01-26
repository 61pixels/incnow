<?php
/**
 * Template Name: Standard Page Template
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content">
					
					<?php if( ! is_single( 'about' ) ) get_template_part( 'partials/cta', 'header' ); // Hidden on 'About' subpages ?>
					
					<?php get_template_part( 'partials/content', 'flexible' ); ?>
					
					<?php if ( function_exists( 'sharing_display' ) ) echo sharing_display(); ?>
					
					<?php if( ! is_single( 'about' ) ) get_template_part( 'partials/cta', 'footer' ); // Hidden on 'About' subpages ?>
					
					<?php get_template_part( 'partials/bottom', 'media' ); // YouTube video and Twitter feed ?>
					
				</section>
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
			
		</div>
	</div>

<?php get_footer(); ?>