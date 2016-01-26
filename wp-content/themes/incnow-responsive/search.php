<?php
/**
 * The template for displaying Search Results pages.
 */

get_header(); ?>

<div id="main-content">
	<div class="row search-results-page">
		<div class="twelve columns">
		
		<?php if ( have_posts() ) : ?>

			<h2 class="page-title"><?php printf( __( 'Search Results for: %s', 'migration' ), '<span>' . get_search_query() . '</span>' ); ?></h2>

			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', 'search' ); ?>
			<?php endwhile; ?>
					
			<div class="pagination">
	        	<?php wp_pagenavi(); ?>
	        	<?php wp_reset_postdata(); ?>
	        </div>

		<?php else : ?>

			<h2 class="page-title"><?php _e( 'Nothing Found', 'migration' ); ?></h2>

			<p style="margin:1em 0;"><?php _e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'migration' ); ?></p>

			<div class="big-search-box">
				<?php get_search_form(); ?>
			</div>
				
		<?php endif; ?>
		</div>
	
	</div>
</div>


<?php get_footer(); ?>