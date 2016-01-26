<?php include( get_stylesheet_directory() .'/partials/cta-compare-conditional.php' ); ?>			
		<div id="services-header">
			<?php
				$lineone = get_field('line_one');
				$linetwo = get_field('line_two');			
			?>
			<div class="row">
				<div class="twelve columns">	
					<?php if($lineone || $linetwo) { // if fields have been filled in, use them ?>
						<h1>	
					<?php } ?>
						<?php if($lineone) {?><span><?php the_field('line_one');?></span><?php } ?><?php if($linetwo) { the_field('line_two'); } ?>
					<?php if($lineone || $linetwo) { ?>
						</h1>	
					<?php } ?>
					<?php if(!$lineone && !$linetwo) {  // if fields haven't been filled in yet, just use old default ?>		
						<h2>Fast, Professional <?php echo $state; ?> <?php echo $type; ?></h2>
						<h1>Incorporation Services</h1>
					<?php } ?>
				</div>	
			</div>
			<div class="row">
				<div class="six columns">
					<ol>
						<?php if( have_rows('bullet_points') ) { // if bullets were filled in
							while ( have_rows('bullet_points') ) : the_row(); 	?>					
								<li><?php the_sub_field('bullet_point'); ?></li>
							<?php endwhile;	?>	
						<?php } else { // if not, use old default ?>
							<li>Fill out a simple online form</li>
							<li>We prepare and file your <?php echo $type; ?></li>
							<li>You receive your <?php echo $type; ?> package</li>
						<?php } ?>
					</ol>
				</div>
				<div class="six columns tcenter ctaheadr">
					<a class="get-started" href="<?php echo $options[0]['url']; ?>">Get Started!</a>
					<?php if( $compare ) { ?><a class="button blue" href="<?php echo $pricingurl; ?>">Compare <?php echo $type; ?> Packages</a><?php } ?>	
				</div>
			</div>
		</div><!-- /services-header -->