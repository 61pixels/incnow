<?php
/*
* Displays the FAQs for the State in a list - no links.
*/

// Here's some data we need
$state_name = get_the_title( incnow_get_state_id() ); // Safe to use, as long as we're consistent.
$state_code = get_field( 'state_abbreviation' ); // The two letter abbreviation for each State
$state = get_post_ancestors( $post );
/* Get the top level page->ID count base 1, array base 0 so -1 */ 
$state_id = ( $state ) ? $state[count( $state )-1] : $post->ID;

$faqs = new WP_Query( array( 
		'post_type' => 'faq',
		'posts_per_page' => -1,
		/* Add in P2P to limit by State*/
		'connected_type' => 'state_to_faq',
		'connected_items' => $state_id
	)
); 

?>
		<?php while ( $faqs->have_posts() ) : $faqs->the_post(); ?>
		
			<article <?php post_class(); ?>>
			
				<header>			
					<h2><?php the_title(); ?></h2>			
				</header>		
				
				<div>
					<?php the_content(); ?>
				</div>
		
			</article>
				
		<?php endwhile; ?>
		