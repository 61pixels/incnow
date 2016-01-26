<?php
/**
 * Template Name: Full Width Basic Page
 */

get_header(); ?>

	<div id="main-content">
		<div class="row standard-styles full-width">
			<div id="content">
			<?php get_template_part( 'partials/content', 'flexible' ); ?>

			<div class="twelve columns">
			<?php if(is_page('states')) { // if it's the new states page, let's run the query to output the states ?>				
				<?php 
				$query_args = array(
				'posts_per_page' => -1, 
				'post_type' 	 => 'state', 
				'post_parent' 	 => 0, 
				'order'			 => 'ASC',              
				'orderby' 		 => 'title'	
				);	
				$myquery = new WP_Query( $query_args);
				if($myquery->have_posts()) : ?>
					<section class="page-state-list">
					<h2>Select a State</h2>					

						<?php 
				$post_loop = 0; 
				$post_cols = 13; 
				$num_results = $myquery->post_count; 	
				
				while($myquery->have_posts()) : $myquery->the_post(); 
					$post_loop++; 				
 					if (($post_loop-1)%$post_cols==0) echo '<div class="three columns"><ul>'; // add first ul	?>
							<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>				
				<?php if ($post_loop%$post_cols==0 || $post_loop == $num_results) echo '</ul></div>'; // add closing/open row div after X items  ?>
				<?php endwhile;	?>	
				
					</section>
				<?php endif; ?>	

			<?php } ?>
			</div>
		</div><!-- /content -->

		</div>
	</div>

<?php get_footer(); ?>