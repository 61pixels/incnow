<?php
/**
 * The archive for the testimonial post type
 */
$glossary = new WP_Query( array( 
		'post_type' => 'glossary',
		'posts_per_page' => -1,
	    //'paged' => get_query_var('paged'),
	    'post_status' => 'publish',
	    'orderby' => 'title',
    	'order' => 'ASC',
	)
); 


// save the terms that have posts in an array as a transient
if ( false === ( $alphabet = get_transient( 'incnow_glossary_alphabet' ) ) ) {
    
    // It wasn't there, so regenerate the data and save the transient
    $terms = get_terms( 'glossary-letter' );
 
    $alphabet = array();
    if( $terms ){
        foreach( $terms as $term ){
            $alphabet[] = $term->slug;
        }
    }
    
    set_transient( 'incnow_glossary_alphabet', $alphabet );
}

get_header(); ?>

	<div id="main-content">
		<div class="row">
			<div class="nine columns">
				<section id="content" class="glossary">				
					<div id="browse">	
						 <ul>
						 	<li><h3>Browse by Name</h3></li>
						 <?php foreach(range('a', 'z') as $i) : if (in_array( $i, $alphabet )){ ?>
								<li class="az-char">
									<?php printf('<a href="%s">%s</a>', get_term_link( $i, 'glossary-letter' ), strtoupper($i) ) ?>
								</li>								
						 <?php } else { ?>
							    <li class="az-char"><?php echo strtoupper($i); ?></li>
						 <?php } ?>						 
						 <?php endforeach; ?>
						 </ul>	  
					</div>
					
					<?php while ( $glossary->have_posts() ) : $glossary->the_post(); ?>
					
						<?php get_template_part( 'content', 'glossary-index' ); ?>
						
					<?php endwhile; ?>			
				</section>
			</div>
				
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>
				
				<?php /* <div class="pagination">
		        	<?php wp_pagenavi( array( 'query' => $glossary ) ); ?>
		        	<?php wp_reset_postdata(); ?>
		        </div> */ ?>
	
		</div>
	</div>

<?php get_footer(); ?>