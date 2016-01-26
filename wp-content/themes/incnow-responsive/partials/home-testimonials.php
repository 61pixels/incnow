<?php // Check for and retrieve any testimonials set on the homepage
$home_testimonials = get_field( 'home_testimonials' );
?>

<div class="satisfied">
	<div class="text">
	<?php if( $home_testimonials ) : 
		$testimonial = $home_testimonials[ array_rand( $home_testimonials ) ]; // get a random testimonial
		$testimonial_excerpt = get_field( 'testimonial_excerpt', $testimonial->ID );
		
		$author_name = get_field( 'author_name', $testimonial->ID );
		$author_title = get_field( 'author_title', $testimonial->ID );
		$author_company = get_field( 'author_company', $testimonial->ID );
		
		// Check for a "Short Version" of the testimonial
		if( $testimonial_excerpt ) {
			$testimonial_content = $testimonial_excerpt;
		} else {
			$testimonial_content = get_field( 'testimonial', $testimonial->ID );
		}
										
	?>
		<h2><a href="/testimonials/">Our Happy Customers</a></h2>
		<?php echo $testimonial_content; ?>
		<span class="speaker">- <?php echo $author_name; ?>
			<?php if( $author_title ) echo '<br />' . $author_title; ?>
			<?php if( $author_company ) echo '<br />' . $author_company; ?>						
		</span>
	<?php endif; ?>
	</div>
	<a href="/testimonials/">
		<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/graphic-thumbsup.jpg">
	</a>
</div>