<?php
/**
 * The sidebar throughout the site
 */

$is_florida = incnow_is_state('FL');
$is_nevada = incnow_is_state('NV');

if ( $is_nevada || $is_florida ) {

	if( $is_nevada ) $state_id = incnow_get_state( 'NV' );
	
	if( $is_florida ) $state_id = incnow_get_state( 'FL' );
	
	$state = get_post_ancestors( $post );
   	$state_name = get_the_title( $state_id );

	$faqs = new WP_Query( array( 
			'post_type' => 'faq',
			'posts_per_page' => -1,
			
			/* Add in P2P to limit by State*/
			'connected_type' => 'state_to_faq',
			'connected_items' => $state_id
		)
	); 
	
	$more_url = add_query_arg( 'state_name', $state_name, site_url( '/faqs/' ) );
}

else { // Delaware needs all posts without a connection
	
	$connected_faqs = new WP_Query( 
		array (
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

	$faqs = new WP_Query( array( 
			'post_type' => 'faq',
			'posts_per_page' => 10,
			'post__not_in' => $connected_ids
		)
	); 
	
	$more_url = '/faqs/';

}
?>

	<aside id="sidebar">
	
		<?php // get_template_part( 'partials/widget', 'video' ); ?>
		
	    <!--<div class="block" id="faqs">
		    <h3>FAQs</h3>
		    <ul>
		    
		    <?php while( $faqs->have_posts() ) : $faqs->the_post(); ?>
		    	<li>
		    		<a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo get_the_title( $post->ID ); ?></a>
		    	</li>
		    <?php endwhile; ?>
		    </ul>
		    <a class="more" href="<?php echo $more_url; ?>">Show More</a>
	    </div>-->
	        
	    <?php get_template_part( 'partials/widget', 'ask-question' ); ?>
	    
	</aside><!-- #sidebar -->