<?php
/**
 * The template used for displaying blog posts in single.php
 */
?>

	<article <?php post_class(); ?>>
	
		<header>			
			<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
			<div class="meta">
				<span class="author">By <?php echo get_the_author(); ?></span> | <span class="date">Published <?php echo the_date(); ?></span>
			</div>		
		</header>			
		
		<div class="content">
			<?php the_content(); ?>			
		</div>

	</article>
	
	<?php get_template_part( 'partials/bottom', 'media' ); // YouTube video and Twitter feed ?>