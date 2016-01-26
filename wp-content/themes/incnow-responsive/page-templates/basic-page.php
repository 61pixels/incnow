<?php
/**
 * Template Name: Basic Page
 * The template for displaying all pages.
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">	
		
			<div class="nine columns">
				<section id="content">			
					<?php get_template_part( 'partials/content', 'flexible' ); ?>
				</section>
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
		
		</div>
	</div>

<?php get_footer(); ?>