<?php
/**
 * The template used for displaying faq content in archive-faq.php
 */
?>

		<article <?php post_class(); ?>>
		
			<header>			
				<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>			
			</header>		
			
			<div>
				<?php the_excerpt(); ?>
				<a href="<?php echo the_permalink(); ?>" class="read-more">Continue Reading</a>	
			</div>
	
		</article>	