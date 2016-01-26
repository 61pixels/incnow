<?php
/**
 * Template Name: Homepage Template (Delaware)
 *
 */

$home_faqs = get_field( 'home_faqs' );
$home_text = get_field( 'home_text' );

$entity_url = $_GET['entity'];

get_header(); ?>


	<div id="home-header">
		<div class="row">
			<div class="twelve columns">
				<h1>Fast Delaware LLC Formation &amp; Series LLC Experts</h1>
			</div>
		</div>	
		<div class="row">
			 <div id="home-tabs">
			 	<div class="three columns">
			        <ul class="resp-tabs-list vert_1">
			            <li class="resp-tab-item" data-select="llc">Form a Delaware LLC</li>
			            <li class="resp-tab-item" data-select="corporation">Form a Delaware Corporation</li>
			            <li class="resp-tab-item" data-select="seriesllc">Series LLC, Non-profit, DBA, LP, &amp; Other Services</li>
			        </ul>
		   		</div>
		        <div class="resp-tabs-container vert_1 nine columns">
		            <div class="tab-content">
		            	<div class="row collapse-fl">
			            	<div class="seven columns fit-vid">
			             		 <iframe src="https://www.youtube.com/embed/slD0ed3wbz0?rel=0&wmode=opaque&enablejsapi=1&modestbranding=1&showinfo=0<?php if( ! isset( $entity_url ) ) echo '&autoplay=1'; ?>" frameborder="0" allowfullscreen id="video1"></iframe>	   
			             	</div>
			             	<div class="five columns">
			             		<a id="coupon-llc" href="https://www.incnow.com/order/?type=new&entity=llc"><img src="<?php echo get_stylesheet_directory_uri(); ?>	/assets/images/coupon-llc.png" title="Special Offer - Get $50 Off Now" alt="Coupon for $50 Off"></a>
			             	</div>
			             </div>
			             <!-- delaware LLC compare table include -->
			             <?php get_template_part( 'partials/compare', 'delaware-llc' ); ?>
		            </div><!-- /tab content -->
		            <div class="tab-content data-tab-1">
		            	<div class="row collapse-fl">
		            		<div class="seven columns fit-vid">
			             		<iframe src="https://www.youtube.com/embed/7hK-UFM3yII?rel=0&wmode=opaque&enablejsapi=1&modestbranding=1&showinfo=0<?php if ( $entity_url == 'corporation' ) echo '&autoplay=1'; ?>" frameborder="0" allowfullscreen id="video2"></iframe>
			             	</div>
			             	<div class="five columns">
			             		<div class="get-started-wrap">
									<select id="" class="selectpicker home" data-tab-num="1">
										<option value="llc" 
											data-name="LLC"
											data-link-order="https://www.incnow.com/order/?type=new&entity=llc"
											data-link-more="/delaware-llc/"
											data-step2="We prepare and file your LLC"
											data-step3="You receive your LLC package"											
											data-compare="/delaware-llc/compare/">Delaware LLC (Limited Liability Co.)</option>
										<option value="corporation" selected="selected"
											data-name="Corporation"
											data-link-order="https://www.incnow.com/order/?type=new&entity=corporation"
											data-link-more="/delaware-corporation/"
											data-step2="We prepare and file your Corporation"
											data-step3="You receive your Corporation package"											
											data-compare="/delaware-corporation/compare/">Delaware Corporation (S-corp or C-Corp)</option>
										<option value="seriesllc"
											data-name="Series LLC"
											data-link-order="https://www.incnow.com/order/?type=new&entity=seriesllc"
											data-link-more="/delaware-series-llc/"
											data-step2="We prepare and file your Series LLC"
											data-step3="You receive your Series LLC package"										
											data-compare="/delaware-series-llc/compare/">Delaware Series LLC</option>
										<option value="lp"
											data-name="LP"
											data-link-order="https://www.incnow.com/order/?type=new&entity=lp"
											data-link-more="/limited-partnership/"
											data-step2="We prepare and file your LP"
											data-step3="You receive your LP package">Delaware LP (Limited Partnership)</option>
										<option value="nonprofitcorporation"
											data-name="Non-Profit"
											data-link-order="https://www.incnow.com/order/?type=new&entity=nonprofitcorporation"
											data-link-more="/non-profit/"
											data-step2="We prepare and file your Non-Profit"
											data-step3="You receive your Non-Profit package"											
											data-compare="/non-profit/compare/">Delaware Non-profit Corporation</option>
										<option value="6"
											data-link-order="https://www.incnow.com/order/?type=existing"
											data-step2="We obtain what you order"
											data-step3="You receive your package">Other Services</option>
									</select>
									<a class="get-started" href="https://www.incnow.com/order/?type=new&entity=llc">Get Started!</a>
									<ol class="steps">
										<li class="step1">Fill out a simple online form</li>
										<li class="step2">We prepare and file your LLC</li>
										<li class="step3">You receive your LLC package</li>
									</ol>
									<ul class="start-button-group">
										<li class="pricing-but"><a href="#" id="" class="button">LLC Pricing</a></li>
										<li class="info-but"><a href="/delaware-llc/" class="button">More Info</a></li>
									</ul>
								</div>
			             	</div>
		              	 </div>
		            </div>
		            <div class="tab-content data-tab-2">
		            	<div class="row collapse-fl">
		            		<div class="seven columns fit-vid">
		             			<iframe  src="https://www.youtube.com/embed/MRsBI0natjc?rel=0&wmode=opaque&enablejsapi=1&modestbranding=1&showinfo=0<?php if ( $entity_url == 'seriesllc' ) echo '&autoplay=1'; ?>" frameborder="0" allowfullscreen id="video3"></iframe>
			             	</div>
			             	<div class="five columns">
			             		<div class="get-started-wrap">
				             		<select id="" class="selectpicker home" data-tab-num="2">
										<option value="llc" 
											data-name="LLC"
											data-link-order="https://www.incnow.com/order/?type=new&entity=llc"
											data-link-more="/delaware-llc/"
											data-step2="We prepare and file your LLC"
											data-step3="You receive your LLC package"											
											data-compare="/delaware-llc/compare/">Delaware LLC (Limited Liability Co.)</option>
										<option value="corporation" selected="selected"
											data-name="Corporation"
											data-link-order="https://www.incnow.com/order/?type=new&entity=corporation"
											data-link-more="/delaware-corporation/"
											data-step2="We prepare and file your Corporation"
											data-step3="You receive your Corporation package"											
											data-compare="/delaware-corporation/compare/">Delaware Corporation (S-corp or C-Corp)</option>
										<option value="seriesllc"
											data-name="Series LLC"
											data-link-order="https://www.incnow.com/order/?type=new&entity=seriesllc"
											data-link-more="/delaware-series-llc/"
											data-step2="We prepare and file your Series LLC"
											data-step3="You receive your Series LLC package"										
											data-compare="/delaware-series-llc/compare/">Delaware Series LLC</option>
										<option value="lp"
											data-name="LP"
											data-link-order="https://www.incnow.com/order/?type=new&entity=lp"
											data-link-more="/limited-partnership/"
											data-step2="We prepare and file your LP"
											data-step3="You receive your LP package"																					
											>Delaware LP (Limited Partnership)</option>
										<option value="nonprofitcorporation"
											data-name="Non-Profit"
											data-link-order="https://www.incnow.com/order/?type=new&entity=nonprofitcorporation"
											data-link-more="/non-profit/"
											data-step2="We prepare and file your Non-Profit"
											data-step3="You receive your Non-Profit package"											
											data-compare="/non-profit/compare/">Delaware Non-profit Corporation</option>
										<option value="6"
											data-link-order="https://www.incnow.com/order/?type=existing"
											data-step2="We obtain what you order"
											data-step3="You receive your package">Other Services</option>
									</select>
									<a class="get-started" href="https://www.incnow.com/order/?type=new&entity=llc">Get Started!</a>
									<ol class="steps">
										<li class="step1">Fill out a simple online form</li>
										<li class="step2">We prepare and file your LLC</li>
										<li class="step3">You receive your LLC package</li>
									</ol>
									<ul class="start-button-group">
										<li class="pricing-but"><a href="#" id="" class="button">LLC Pricing</a></li>
										<li class="info-but"><a href="/delaware-llc/" class="button">More Info</a></li>
									</ul>		
			             		</div><!-- /get started -->		                
		              		</div><!-- /five -->
		              	</div><!-- /row -->
		            </div><!-- /tab-content -->
		        </div>
		    </div>
		</div><!-- /row -->    


	</div> <!-- /home-header -->

	<div id="main-content" class="home">
		<div class="row">
			<div class="eight columns">
				<section id="content">
					<div class="feature">
						<div class="text">
							<h2><a href="/about-us/">Why Choose Incnow?</a></h2>
							<?php if( $home_text ) echo $home_text; ?>
						</div>
						<a href="/about-us/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/graphic-shake.jpg" alt="Delaware LLC services graphic"></a>
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
				    <div class="block homeinfograph-button">
				    	<h3><a href="https://www.incnow.com/why-incorporate-in-delaware/">Why Delaware is the #1 state for incorporating <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/button-arrow.png" alt="" /></a></h3>
				    </div>
				</aside><!-- #sidebar -->
			</div>
		</div><!-- /row -->
		<?php  
		/*
		*  Loop through a Flexible Content field and display it's content with different views for different layouts
		*/
		 
		while( has_sub_field( 'content_layouts' ) ): ?>
			<?php if( get_row_layout() == 'standard_content' ): // layout: Standard WYSIWYG ?>
		 	<div class="row">
				<div class="section content twelve columns">					
					<article class="page content ornge-h2">				
					<?php if( get_sub_field( 'full_editor' ) ) :  ?>
						<?php the_sub_field( 'full_editor' ); ?>
					<?php endif; ?>		
					</article>	
				</div>
		 	</div>
			<?php endif; ?>		 
		<?php endwhile; ?>
	</div><!-- /main-content -->

<?php get_footer(); ?>
