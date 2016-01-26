<?php include( get_stylesheet_directory() .'/partials/cta-compare-conditional.php' ); ?>			
		<div id="services-header">
			<div class="row">
				<div class="six columns">
					<ol>
						<li>Fill out a simple online form</li>
						<li>We prepare and file your <?php echo $type; ?></li>
						<li>You receive your <?php echo $type; ?> package</li>
					</ol>
				</div>
				<div class="six columns tcenter ctaheadr">					
					<a class="get-started" href="<?php echo $options[0]['url']; ?>">Get Started!</a>
					<?php if( $compare ) { ?><a class="button blue" href="<?php echo $pricingurl; ?>">Compare <?php echo $type; ?> Packages</a><?php } ?>		
				</div>
			</div>
		</div><!-- /services-header-->