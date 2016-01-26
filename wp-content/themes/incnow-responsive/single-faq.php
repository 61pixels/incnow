<?php
/**
 * The template for displaying FAQ pages.
 */

get_header(); ?>
	
	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="faq">
					<?php while ( have_posts() ) : the_post(); ?>
					
						<?php get_template_part( 'content', 'faq-single' ); ?>
						
					<?php endwhile; ?>
				</section>
			</div>
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>

<?php get_footer(); ?>