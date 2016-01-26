<?php
/**
 * Template Name: Florida Corporation Comparision Tables
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
							<li class="pricing-item">Draft Certificate of Incorporation 1500 Shares, No Par</li>	
							<li class="pricing-item">Annual Registered Agent Service</li>					
							<li class="pricing-item">$70 Filing Fee</li>			
							<li class="pricing-item">Domestic and International Priority Mail Delivery</li>
							<li class="pricing-item">Corporate Minutes</li>								
							<li class="pricing-item">IRS Forms</li>
							<li class="pricing-item">Stock Certificates</li>		
							<li class="pricing-item">Unanimous Action of Initial Directors</li>		
							<li class="pricing-item">Bylaws</li>													
							<li class="pricing-item">Minute Book</li>													
						</ul>
					</li>
					<li class="one-third">
						<ul class="">
							<li class="name"><h3>Basic Corporation</h3></li>
							<li class="price"><h4>$188</h4></li>
							<li class="pricing-item"><h5>Name Search</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Draft Certificate of Incorporation 1500 Shares, No Par</h5><i class="fa fa-check-circle clrgr"></i></li>	
							<li class="pricing-item"><h5>Annual Registered Agent Service</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>$70 Filing Fee</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Domestic and International Priority Mail Delivery</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Corporate Minutes</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>IRS Forms</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Stock Certificates</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Unanimous Action of Initial Directors</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Bylaws</h5><i class="fa fa-times clred"></i></li>
							<li class="pricing-item"><h5>Minute Book</h5><i class="fa fa-times clred"></i></li>
							<li class="button-row"><a class="button" href="https://www.incnow.com/order/?type=new&entity=corporation&state=fl">Get Started</a></li>
						</ul>
					</li>
					<li class="one-third">
						<ul class="popular">
							<li class="name"><h3>Complete Corporation</h3></li>
							<li class="price"><h4>$298</h4></li>
							<li class="pricing-item"><h5>Name Search</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Draft Certificate of Incorporation 1500 Shares, No Par</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Annual Registered Agent Service</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>$70 Filing Fee</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Domestic and International Priority Mail Delivery</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Corporate Minutes</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>IRS Forms</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Stock Certificates</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Unanimous Action of Initial Directors</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Bylaws</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="pricing-item"><h5>Minute Book</h5><i class="fa fa-check-circle clrgr"></i></li>
							<li class="button-row"><a class="button" href="https://www.incnow.com/order/?type=new&entity=corporation&state=fl">Get Started</a></li>
						</ul>
					</li>					
				</ul>
         	</div>
         
         </div><!-- /row -->
	</div><!-- /main-content -->

<?php get_footer(); ?>