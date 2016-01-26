<?php
/**
 * The template used for displaying faq content in home.php
 */
?>
	
	<article <?php post_class(); ?>>
	
		<header>			
			<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
			<div class="meta">
				<span class="author">By <?php echo get_the_author(); ?></span>
				<span class="date"><?php echo the_date(); ?></span>
			</div>		
		</header>		
		
		<div class="excerpt">
			<?php 
			if ( has_post_thumbnail() ) { // check if the post has a Post Thumbnail assigned to it.
				the_post_thumbnail(array(200,200));
			} 
			?>
			<?php the_excerpt(); ?>
			<a href="<?php echo the_permalink(); ?>" class="read-more">Continue Reading</a>				
		</div>

	</article>
	