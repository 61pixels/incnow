		<div id="services-header">
			<?php
				$lineone = get_field('line_one');
				$linetwo = get_field('line_two');
				$media = get_field('optional_media');	
				$rimg = get_field('right_image');
			?>
			<div class="row">
				<div class="twelve columns">
					<h1><?php if($lineone) {?><span><?php the_field('line_one');?></span><?php } ?><?php if($linetwo) { the_field('line_two'); } ?></h1>
				</div>	
			</div>
			<div class="row">
			
				<div class="six columns offset-by-one">
					<?php 
						if ($media == video) {
							$video = get_field('youtube_link');
							global $wp_embed;
							$video_embed = $wp_embed->run_shortcode('[embed]' . $video . '[/embed]');						
							echo $video_embed;	
						} elseif ($media == image) {
							$theimg = get_field('upload_image');					
							?>
							<img src="<?php echo $theimg['url']; ?>" alt="<?php echo $theimg['alt'] ?>" />
					<?php } ?>
				</div>
				<div class="five columns tcenter">
					<?php 						
						if($rimg) { ?>
							<a href="https://www.incnow.com/order/?type=new&entity=llc"><img src="<?php echo $rimg['url']; ?>" alt="<?php echo $rimg['alt'] ?>"  /></a>
					<?php } ?>
				</div>
			</div>
		</div><!-- /services-header -->
		