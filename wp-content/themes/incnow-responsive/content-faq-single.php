<?php
/**
 * The template used for displaying page content in single-faq.php
 */
?>
	
<article <?php post_class(); ?>>

	<header>			
		<h1><?php the_title(); ?></h1>			
	</header>
	
	<?php // Check for YouTube videos 
	
	$videos = get_field( 'youtube_videos' );
	
	// First, let's make sure we've got videos.
	if( $videos ) {
	
		$url_base = 'https://www.youtube.com/embed/';
		
		$first_video = implode( array_shift( $videos ) ) ;
		
		$video_ids = array_map( function( $item ) { return $item['id']; }, $videos );
		$playlist = implode(',', $video_ids) ;
				
		// Check for a single video
		if( count( $videos ) == 1 ) {
			
			$youtube_url = $url_base . $first_video . '?rel=0&modestbranding=1&wmode=transparent';
			
		// No single? Then we've got a play list!
		} else {					
			$youtube_url = $url_base . $first_video . '?playlist=' . $playlist . '&rel=0&modestbranding=1&wmode=transparent';
		} 
		
		?>
		
		
		<div class="youtube">				
			<iframe width="720" height="405" style="z-index: 0;" src="<?php echo $youtube_url; ?>" frameborder="0" allowfullscreen></iframe>
		</div>
		
	<?php }	?>			
	
	<div>
		<?php the_content(); ?>
	</div>

</article>


<?php get_template_part( 'partials/cta', 'header' ); // "Get Started" call to action ?>

<?php // get_template_part( 'partials/dyk', 'faq' ); // "Did You Know" section ?>