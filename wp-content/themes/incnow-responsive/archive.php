<?php
/**
 * A fallback for all other archives
*/

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="blog">					
					<?php while ( have_posts() ) : the_post(); ?>				
						<?php get_template_part( 'content', 'blog-index' ); ?>					
					<?php endwhile; ?>					
				</section>
			</div>						
			<div class="three columns" role="complementary">
				<?php get_sidebar('blog'); ?>
			</div>
		</div>
	</div>

<?php get_footer(); ?>