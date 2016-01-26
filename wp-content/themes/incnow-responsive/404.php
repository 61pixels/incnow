<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 */

get_header(); ?>
	
	<div id="main-content">
		<div class="row error404">
			<div class="twelve columns">
				<section id="fourofour">	
					<h1><?php _e( 'Whoops, that page wasn\'t found!', 'incnow' ); ?></h1>		
					<p><?php _e( 'The page you tried to access cannot be found. There may have been a typo on the page you were trying to reach. Please feel free to return to the homepage or use one of the links below to find the information you were looking for. We are very sorry for any inconvenience.', 'incnow' ); ?></p>			
					<h2>Want to try searching?</h2>
					<div class="big-search-box">
						<?php get_search_form(); ?>
					</div>				
					<div class="sitemap">
						<h2>Looking for a particular page?</h2>
						<p>Try one of these pages below</p>					
						<ul>
						<?php wp_list_pages( 
								array( 
									'depth' => 1,
									'title_li' => '',
									'sort_column' => 'post_title',
									'exclude' => '372' // Homepage		
							
								)
							);
						?>
						</ul>					
					</div>				
				</section>
			</div>
		
		</div>
	</div>


<?php get_footer(); ?>