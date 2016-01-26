<?php
/**
 * Template Name: Delaware Series LLC Comparision Tables
 */

get_header(); ?>

	<div id="main-content">
		<div class="row standard-styles full-width">
			<div id="content">	
				<div class="twelve columns">
					<?php if(have_posts()) : ?>
					<?php while(have_posts()) : the_post(); ?>
						<?php the_content(); ?>
					<?php endwhile; endif; ?>
				</div>
			</div><!-- /content -->		
			</div>
		<div class="row ">
         	<div class="twelve columns">
         		<ul id="pricing-tables" class="clearfix">
					<li class="one-third plan">
						<ul class="pricing-titles ">
							<li class="name"></li>
							<li class="price"><h4>Price</h4></li>
							<li class="pricing-item">Name Search</li>
							<li class="pricing-item">Draft Series LLC Certificate of Formation</li>	
							<li class="pricing-item">Annual Registered Agent Service</li>					
							<li class="pricing-item">$90 Filing Fee</li>			
							<li class="pricing-item">Domestic and International Priority Mail Delivery</li>										
							<li class="pricing-item">IRS Forms</li>
							<li class="pricing-item">Professionally-Prepared 50+ page Series LLC Operating Agreement with 2 series</li>		
							<li class="pricing-item">Operating Agreement Required by Statute</li>		
						</ul>
					</li>
					<li class="one-third">
						<ul class="">
							<li class="name"><h3>Basic Series LLC</h3></li>
							<li class="price"><h4>$189</h4></li>
							<li class="pricing-item"><h5>Name Search</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Draft Series LLC Certificate of Formation</h5><i class="fa fa-check-circle clrgr"></i></li>	
							<li class="pricing-item"><h5>Annual Registered Agent Service</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>$90 Filing Fee</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Domestic and International Priority Mail Delivery</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>IRS Forms</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Professionally-Prepared 50+ page Series LLC Operating Agreement with 2 series</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Operating Agreement Required by Statute</h5><i class="fa fa-times clred"></i></li>
							<li class="button-row"><a class="button" href="https://www.incnow.com/order/?type=new&entity=seriesllc">Get Started</a></li>
						</ul>
					</li>
					<li class="one-third">
						<ul class="popular">
							<li class="name"><h3>Complete Series</h3></li>
							<li class="price"><h4>$598</h4></li>
							<li class="pricing-item"><h5>Name Search</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Draft Series LLC Certificate of Formation</h5><i class="fa fa-check-circle clrgr"></i></li>	
							<li class="pricing-item"><h5>Annual Registered Agent Service</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>$90 Filing Fee</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Domestic and International Priority Mail Delivery</h5><i class="fa fa-check-circle clrgr"></i></li>	
							<li class="pricing-item"><h5>IRS Forms</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Professionally-Prepared 50+ page Series LLC Operating Agreement with 2 series</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Operating Agreement Required by Statute</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="button-row"><a class="button" href="https://www.incnow.com/order/?type=new&entity=seriesllc">Get Started</a></li>
						</ul>
					</li>					
				</ul>
         	</div>
         
         </div><!-- /row -->
	</div><!-- /main-content -->

<?php get_footer(); ?>