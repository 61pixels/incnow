<?php
/**
 * Template Name: Delaware LLC Comparision Tables
 */

get_header(); ?>

	<div id="main-content">
		<div class="row standard-styles full-width">
			<div id="content">	
				<div class="twelve columns">
					<?php if(have_posts()) : ?>
					<?php while(have_posts()) : the_post(); ?>
						<?php the_content(); ?>
					<?php endwhile; endif; ?>
				</div>
			</div><!-- /content -->
			<?php get_template_part( 'partials/compare', 'delaware-llc' ); ?>
		</div>
	</div>

<?php get_footer(); ?>