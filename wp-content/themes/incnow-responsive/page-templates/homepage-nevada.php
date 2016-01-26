<?php
/**
 * Nevada Homepage - Loaded via a check on single-state.php
 *
 */

$home_faqs = get_field( 'home_faqs' );
$home_text = get_field( 'home_text' );

get_header(); ?>


	<div id="home-header">
		<div class="row">
			<div class="twelve columns">
				<h1>Fast, Professional Nevada LLC Incorporation Services </h1>
			</div>
		</div>
		<div class="row">
			<div id="home-tabs">
			 	<div class="three columns">
			        <ul class="resp-tabs-list vert_1">
			            <li class="resp-tab-item" data-select="llc">Form a Nevada LLC</li>
			            <li class="resp-tab-item" data-select="corporation">Form a Nevada Corporation</li>			      
			        </ul>
		   		</div>
		   		<div class="resp-tabs-container vert_1 nine columns">
		            <div class="tab-content">
		            	<div class="row collapse-fl">
			            	<div class="seven columns fit-vid">
			             		 <iframe src="https://www.youtube.com/embed/6paTpgd5gi0?rel=0&wmode=opaque&enablejsapi=1&modestbranding=1&showinfo=0" frameborder="0" allowfullscreen id="video1"></iframe>	   
			             	</div>
			             	<div class="five columns">
			             		<div class="get-started-wrap">
									<select id="" class="selectpicker home">
										<option value="llc"
										data-name="LLC"
										data-link-order="https://www.incnow.com/order/?type=new&state=nv&entity=llc"
										data-link-more="/nevada/llc/"
										data-step2="We prepare and file your LLC"
										data-step3="You receive your LLC package" selected>Nevada LLC (Limited Liability Co.)</option>										
									<option value="corporation"
										data-name="Corporation"
										data-link-order="https://www.incnow.com/order/?type=new&state=nv&entity=corporation"
										data-link-more="/nevada/corporation/"
										data-step2="We prepare and file your Corporation"
										data-step3="You receive your Corporation package">Nevada Corporation (S or C-Corp)</option>		
									</select>
									<a class="get-started" href="https://www.incnow.com/order/?type=new&state=nv&entity=llc">Get Started!</a>
									<ol class="steps">
										<li class="step1">Fill out a simple online form</li>
										<li class="step2">We prepare and file your LLC</li>
										<li class="step3">You receive your LLC package</li>
									</ol>
									<ul class="start-button-group">
										<li class="pricing-but"><!--<a href="#" id="" class="button">LLC Pricing</a>--></li>
										<li class="info-but"><a href="/nevada/llc/" class="button">More Info</a></li>
									</ul>
								</div><!-- /get-started-wrap -->
			             	</div><!-- /row -->
		              	 </div><!-- /row -->
		            </div><!-- /tab-content -->
		            <div class="tab-content">
		            	<div class="row collapse-fl">
			            	<div class="seven columns fit-vid">
			             		 <iframe src="https://www.youtube.com/embed/dPLnerXTs80?rel=0&wmode=opaque&enablejsapi=1" frameborder="0" allowfullscreen id="video1"></iframe>	   
			             	</div>
			             	<div class="five columns">
			             		<div class="get-started-wrap">
									<select id="" class="selectpicker home">
										<option value="llc"
										data-name="LLC"
										data-link-order="https://www.incnow.com/order/?type=new&state=nv&entity=llc"
										data-link-more="/nevada/llc/"
										data-step2="We prepare and file your LLC"
										data-step3="You receive your LLC package">Nevada LLC (Limited Liability Co.)</option>										
									<option value="corporation"
										data-name="Corporation"
										data-link-order="https://www.incnow.com/order/?type=new&state=nv&entity=corporation"
										data-link-more="/nevada/corporation/"
										data-step2="We prepare and file your Corporation"
										data-step3="You receive your Corporation package" selected>Nevada Corporation (S or C-Corp)</option>	
									<option value="seriesllc"
										data-name="Series LLC"
										data-link-order="https://www.incnow.com/order/?type=new&state=nv&entity=seriesllc"
										data-link-more="/nevada/series-llc/"
										data-step2="We prepare and file your Series LLC"
										data-step3="You receive your Series LLC package">Nevada Series LLC</option>	
									</select>
									<a class="get-started" href="https://www.incnow.com/order/?type=new&state=nv&entity=llc">Get Started!</a>
									<ol class="steps">
										<li class="step1">Fill out a simple online form</li>
										<li class="step2">We prepare and file your LLC</li>
										<li class="step3">You receive your LLC package</li>
									</ol>
									<ul class="start-button-group">
										<li class="pricing-but"><!--<a href="#" id="" class="button">LLC Pricing</a>--></li>
										<li class="info-but"><a href="/nevada/llc/" class="button">More Info</a></li>
									</ul>
								</div><!-- /get-started-wrap -->
			             	</div><!-- /row -->
		              	 </div><!-- /row -->
		            </div><!-- /tab-content-- >
		        </div><!-- /resp-tabs-container -->				
			</div><!-- /home-tabs -->	
		</div><!-- /row -->
	</div><!-- /home-header -->

	<div id="main-content" class="home">
		<div class="row">
			<div class="eight columns">
				<section id="content">	
					<div class="feature">
						<div class="text">
							<h2><a href="/nevada/about/">Why Choose Incnow?</a></h2>
							<?php if( $home_text ) echo $home_text; ?>
						</div>
						<a href="/nevada/about/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/graphic-shake.jpg"></a>
					</div>
					
					<?php get_template_part( 'partials/home', 'testimonials' ); // Testimonials  ?>
					
				</section>
			</div>
			<div class="four columns">
				<aside id="sidebar">
					<?php if( $home_faqs ) : ?>
				    <div class="block" id="home-faqs">
					    <h3>FAQs</h3>
					    <ul>
					    	<?php foreach( $home_faqs as $faq ) : ?>
					    	<li><a href="<?php echo get_permalink( $faq->ID ); ?>"><?php echo get_the_title( $faq->ID ); ?></a></li>
					    	<?php endforeach; ?>
					    </ul>
				    </div>
				    <?php endif; ?>
				    <!--<div class="block" id="why">
				    	<h3>Why Delaware is the #1 state for incorporating <a class="go" class="trigger-popup-why-delaware" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/lightbox/infographic01.jpg">Why Choose Delaware?</a></h3>
				    </div> -->
				</aside><!-- #sidebar -->
			</div>
		</div><!-- /row -->
	</div><!-- /main-content -->

<?php /* Load the comparison popup */
get_template_part( 'partials/popup', 'home-compare-nevada' ); 
?>

<?php get_footer(); ?>