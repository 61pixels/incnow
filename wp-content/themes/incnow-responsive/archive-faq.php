<?php
/**
 * The archive for the FAQ post type
 */
 
 
$active_state = get_query_var( 'state_name' );

$connected_faqs = new WP_Query( array (
	'post_type' => 'faq',
	'posts_per_page' => -1,
	'connected_type' => 'state_to_faq',
	'connected_items' => 'any',
	'suppress_filters' => false,
	'connected_direction' => 'from',
	'nopaging' => true,
	)
);

$connected_ids = Array();
while ( $connected_faqs->have_posts() ) : $connected_faqs->the_post();
    $connected_ids[] = get_the_ID() ;
endwhile;

wp_reset_postdata();


if( $active_state == 'Nevada' OR $active_state == 'Florida' ) { 

	// Set the appropriate State ID based on the active State
	if( $active_state == 'Florida' ) {
		$state_id = incnow_get_state( 'FL' );
	} else if( $active_state = 'Nevada' ) { 
		$state_id = incnow_get_state( 'NV' );
	}
		
	$faqs = new WP_Query( array( 
			'post_type' => 'faq',
			'posts_per_page' => 999,
			/* Add in P2P to limit by State*/
			'connected_type' => 'state_to_faq',
			'connected_items' => $state_id,
			'paged' => get_query_var('paged'),
		)
	); 
	
} else { 

	$faqs = new WP_Query( array( 
		'post_type' => 'faq',
		'posts_per_page' => 999,
	    'post_status' => 'publish',
   	    'paged' => get_query_var('paged'),
   	    'post__not_in' => $connected_ids // Exclude Florida / Nevada
		)
	); 
}

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="faq">			
					<?php while ( $faqs->have_posts() ) : $faqs->the_post(); ?>
					
						<?php get_template_part( 'content', 'faq-index' ); ?>
						
					<?php endwhile; ?>				
				</section>
			</div>
			
			<div class="three columns" role="complementary">
				<?php get_sidebar('faqs'); ?>
			</div>
		</div>
	</div>

<?php get_footer(); ?>