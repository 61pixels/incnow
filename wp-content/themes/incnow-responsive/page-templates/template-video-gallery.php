<?php
/**
 * Template Name: Video Gallery
 */

get_header(); ?>

	<div id="main-content full-width">		
		<article id="content">	
			<div class="row">			
				<div class="twelve columns">
					<?php if(have_posts()) : ?>
					<?php while(have_posts()) : the_post(); ?>
						<?php the_content(); ?>
					<?php endwhile; endif; ?>
				</div>
			</div>
			<section class="video-gallery">

				<?php if( have_rows('chapter_grouping') ): ?>
					<?php while ( have_rows('chapter_grouping') ) : the_row(); ?>

						<div class="row">
							<div class="twelve columns">
								<h2 class="title"><span class="icon"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-marker.png"></span><?php the_sub_field('chapter_title'); ?></h2>
									<?php // this count needs to go in first repeater instance for some reason. If placed inside nested it doesn't work properly and always returns 1
						$count = count( get_sub_field('videos') ); ?>

						<?php if( have_rows('videos') ):  ?>
							<?php $gloop = 0; $gcols = 3; ?>
							<?php while ( have_rows('videos') ) : the_row(); 
								$gloop++;				
								if (($gloop-1)%$gcols==0) echo '<div class="row">'; // add first row div	
								$vidlink = get_sub_field('video_link'); 					
								if($vidlink) : ?>
									<div class="four columns <?php if ($gloop%$gcols==0 || $gloop == $count) echo 'last';?>">
										<div class="js-lazyYT" data-youtube-id="<?php echo px_getYoutubeURL($vidlink); ?>" data-parameters="rel=0&modestbranding=1&showinfo=0"></div>	
									</div>														
								<?php endif; ?>	
								<?php if ($gloop%$gcols==0 || $gloop == $count) echo '</div>'; // add closing/open row div after 3 items  ?>
							<?php endwhile;	?>	
						<?php endif; ?>
							</div>
						</div>
						

					<?php endwhile;	?>	
				<?php endif; ?>

			</section><!-- /video-gallery -->
		</article><!-- /content -->		
	</div>

<?php get_footer(); ?>