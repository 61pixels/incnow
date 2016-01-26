<?php
/**
 * Template Name: Registered Agent Resource Template
 */

get_header(); ?>

	<div id="main-content">
		<div class="row">		
			<div class="nine columns">
				<section id="llc-resource">
					
					<?php get_template_part( 'partials/content', 'flexible' ); ?>
					
					<?php get_template_part( 'partials/cta', 'services' ); ?>	
					
				</section>		
			</div>
		
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
				<div class="resources">
					<h3>More About Agents</h3>
		    		<?php wp_nav_menu( array('container' => 'false', 'menu' => 'ra-resources' )); ?>
				</div>
			</div>		
		</div>
	</div>

<?php get_footer(); ?>