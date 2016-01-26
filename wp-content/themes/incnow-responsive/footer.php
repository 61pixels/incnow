<?php // The template for displaying the footer. ?>

<footer id="footer">
    <div id="info">
	    <div class="row">
	    	<div class="four columns">	
			    <?php if( incnow_is_state( 'FL' ) OR incnow_is_state( 'NV' ) ) { ?>
			   	<h3>1.800.759.2248</h3>	
			    <?php } else { ?>
			    	<h3>1.800.759.2248</h3>
			    <?php } ?>	
			</div>
		    <div class="four columns">
			    <h3><a href="mailto:agents@incnow.com">agents@incnow.com</a></h3>
		    </div>
		    <div class="four columns">
			    <ul id="social">
			    	<li><a id="email" href="mailto:agents@incnow.com">Email</a>
			    	<li><a id="facebook" href="https://www.facebook.com/incnow">Facebook</a>
			    	<li><a id="twitter" href="https://twitter.com/incnow">Twitter</a>
			    	<li><a id="google" href="https://plus.google.com/+IncNow">Google+</a>
			    	<li><a id="youtube" href="https://www.youtube.com/user/incnow360">YouTube</a>
			    </ul>
			</div>
		</div><!-- /row -->
		<div class="row">
			<div class="twelve columns">
	    		<hr/>
	    	</div>
	    </div><!-- /row -->
		
		<div class="row">   
			
    		<?php // Load the appropriate "Mega Menu" for each of the three main States		
				if( incnow_is_state( 'FL' ) ) { 		
					get_template_part( 'partials/menu-footer', 'florida' ); 
				}
				elseif( incnow_is_state( 'NV' ) ) { 			
					get_template_part( 'partials/menu-footer', 'nevada' ); 
				} 
				else { // For everything else, load Delaware			
					get_template_part( 'partials/menu-footer', 'delaware' ); 
				} 				
			?>

			    <div class="block four columns" id="four">		    
			    	<a id="srg" target="_blank" href="http://www.bbb.org/delaware/business-reviews/incorporating-companies/agents-and-corporations-inc-in-wilmington-de-21002064/#bbbonlineclick"><img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/bbb.jpg" alt="A+ Rated by Better Business Bureau" /></a> 	
			    	<a target="_blank" id="mcafee" href="https://www.mcafeesecure.com/verify?host=www.incnow.com"><img src="//images.scanalert.com/meter/www.incnow.com/23.gif" alt="McAfee Secure Website"></a>
			    </div>

	    </div><!-- /row -->

    </div><!-- /info -->

    <div id="rights">
    	<div class="row">
    		<div class="twelve columns">
	    		<?php if( incnow_is_state( 'FL' ) ) {  ?>
	    			<p>Agents and Corporations, Inc. 300 Fifth Avenue South, Suite 101-330, Naples, Florida 34102</p>
	    		<?php } else if( incnow_is_state( 'NV' ) ) {  ?>
	    			<p>Agents and Corporations, Inc. 18124 Wedge Parkway, Suite 925, Reno, Nevada 89511-8134</p>
	    		<?php } else { ?>
	    			<p>Agents and Corporations, Inc. 1201 Orange Street, Suite 600 Wilmington, Delaware 19801</p>
	    		<?php } ?>
				<p><?php if( incnow_is_state( 'DE' ) ) { ?>Phone: 302-575-0877 &nbsp; &nbsp; <?php } ?>Toll-free: 800-759-2248  &nbsp; &nbsp; Fax: 302-575-1642</p>
				<br/>
				<p>&copy; 1999-<?php echo date('Y'); ?> Agents and Corporations, Inc. <a href="/privacy-statement/">Privacy Statement</a> | <a href="/terms-of-use/">Terms of Use</a> | <a href="/sitemap/">Sitemap</a></p> 
				<p>Agents and Corporations, Inc. does not provide legal or tax advice. The information contained herein is general information and should not be relied upon for any purpose.</p>
			</div>
    	</div>
    </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>