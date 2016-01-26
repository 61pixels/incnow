
<?php
/**
 * The archive for glossary letters
 */

// Make sure there isn't a limit set to 10, etc.

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
					<h2 class="title">
						Archives for "<?php echo strtoupper(single_tag_title("", false)); ?>"
					</h2>					
					<div id="browse">	
						 <ul>
						 	<li><h3>Browse by Name</h3></li>
							 <?php foreach(range('a', 'z') as $i) : $current = ($i == get_query_var( 'glossary-letter' )) ? "current-menu-item" : "menu-item";  if (in_array( $i, $alphabet )){ ?>
								<li class="az-char <?php echo $current;?>">
										<?php printf('<a href="%s">%s</a>', get_term_link( $i, 'glossary-letter' ), strtoupper($i) ) ?>
								</li>								
							 <?php } else { ?>
							    <li class="az-char <?php echo $current;?>"><?php echo strtoupper($i); ?></li>
							 <?php } ?>						 
							 <?php endforeach; ?>
						 </ul>
				    </div>
								
					<?php while ( have_posts() ) : the_post(); ?>					
						<?php get_template_part( 'content', 'glossary-index' ); ?>						
					<?php endwhile; ?>
				</section>
			</div>				
			
			
			<div class="three columns" role="complementary">
				<?php get_sidebar(); ?>
			</div>					
		</div>
	</div>

<?php get_footer(); ?>


