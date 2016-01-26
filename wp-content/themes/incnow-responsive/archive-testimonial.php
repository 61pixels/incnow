<?php
/**
 * The archive for the testimonial post type
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="testimonials">		
				
					<h1>What Customers Are Saying About IncNow</h1>					
					<?php while ( have_posts() ) : the_post(); ?>				
						<?php get_template_part( 'content', 'testimonial' ); ?>					
					<?php endwhile; ?>	
					
				</section>
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
			
		</div>
	</div>

<?php get_footer(); ?>