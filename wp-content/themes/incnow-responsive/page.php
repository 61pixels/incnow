<?php
/**
 * The template for displaying all pages.
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">
		
			<div class="nine columns">
				<section id="content" class="page">			
					<?php get_template_part( 'content', 'page' ); ?>
				</section>
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>

<?php get_footer(); ?>