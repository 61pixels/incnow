<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 */

get_header(); ?>
			
	<div id="main-content">
		<div class="row">
		
			<div class="nine columns">
				<section id="content" class="page">			
					<?php while ( have_posts() ) : the_post(); ?>			
						<?php get_template_part( 'content' ); ?>				
					<?php endwhile; ?>
				</section>
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>
		
<?php get_footer(); ?>