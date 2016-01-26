<?php
/**
 * The archive for blog posts 
*/

$author = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author'));

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="blog left">	
					<h3>Post Archives for <?php echo $author->display_name; ?></h3>				
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