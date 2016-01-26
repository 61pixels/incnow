<?php
/**
 * Template Name: Delaware LLC Custom Template
 */

get_header(); ?>

	<div id="main-content">
		<div class="standard-styles full-width">
			
			<?php get_template_part( 'partials/cta', 'custom-acf' ); // New editable call to action piece used on many pages ?>

			  <!-- delaware LLC compare table include -->
             <?php get_template_part( 'partials/compare', 'delaware-llc' ); ?>
             <br /><br />

			<?php get_template_part( 'partials/content', 'flexible' ); // Content  ?>		

			<div id="bottom" class="new-bottom row">
				<div class="six columns">
					<?php
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
					?>
					<aside id="sidebar">
						<div class="block" id="faqs">
						    <h3>FAQs</h3>
						    <ul>						    
						    <?php while( $faqs->have_posts() ) : $faqs->the_post(); ?>
						    	<li>
						    		<a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo get_the_title( $post->ID ); ?></a>
						    	</li>
						    <?php endwhile; ?>
						    </ul>
						    <a class="more" href="<?php echo $more_url; ?>">Show More</a>
					    </div>
					</aside>

				</div><!-- /left -->
	
				<div class="six columns">					

					<div class="video">
						<a class="popup-incnow-video" href="https://www.youtube.com/watch?v=0qIEvUYzwrc">
							<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/inc-video.png">
						</a>
						<p>When deciding where to form your company, consider that Delaware has advantages over your home state that may benefit you. <a class="go popup-incnow-video" href="https://www.youtube.com/watch?v=0qIEvUYzwrc">Go</a></p>
					</div>	
					
					<div class="twitter">
						<div class="tweet-bubble">
							<strong><a href="https://twitter.com/incnow">@IncNow on Twitter</a>:</strong>
							<div class="tweet">				
								"<?php echo incnow_get_latest_tweet(); ?>"
							</div>
						</div>
						<a href="https://twitter.com/IncNow" class="twitter-follow-button" data-show-count="true" data-size="large" data-dnt="true">Follow @IncNow</a>
						<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
					</div>

					<?php get_template_part( 'partials/widget', 'ask-question' ); ?>
				</div><!-- /right -->

			</div><!-- /bottom -->

			
			<?php if ( function_exists( 'sharing_display' ) ) echo sharing_display(); ?>

			
		</div>
	</div>

<?php get_footer(); ?>


