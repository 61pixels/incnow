<?php
/**
 * The default template for displaying search results content.
 */
?>

	<article <?php post_class(); ?>>
	
		<header>			
			<?php the_post_thumbnail(); ?>			
			<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>			
		</header>
		
		<div>
			<?php the_excerpt(); ?>
			<a href="<?php echo the_permalink(); ?>" class="read-more">Continue Reading</a>	
		</div>

	</article>
