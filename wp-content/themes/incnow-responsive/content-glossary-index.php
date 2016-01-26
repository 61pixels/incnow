<?php
/**
 * The template used for displaying faq content in archive-faq.php
 */
?>

		<article <?php post_class(); ?>>
		
			<header>			
				<h1><?php the_title(); ?></h1>			
			</header>		
			
			<div>
				<?php the_content(); ?>
			</div>
	
		</article>	