<?php
/**
 * The sidebar throughout the blog
 */
?>

	<aside id="sidebar">   
	    
	    <?php get_template_part( 'partials/widget', 'ask-question' ); ?>
	    
	    <div class="block">
			<a href="/blog/"><img src="/wp-content/uploads/2015/10/incnow_blog_logo_2013.png" alt="IncNow Blog Logo" width="100%" /></a>
		</div>
		
		<div class="block">
			<h3 style="color: #1C75BB;font-size: 24px;border-bottom: 1px solid #aaa;margin-bottom: 15px;">Form a Delaware LLC</h3>
				<ol style="padding-left: 20px;line-height: 1.4em;">
					<li style="margin-bottom: 8px;">Fill out a simple online form</li>
					<li style="margin-bottom: 8px;">We prepare and file your LLC</li>
					<li style="margin-bottom: 8px;">You receive your LLC package</li>
		    	</ol>
		    	<a href="/order/?type=new&entity=llc" class="button" style="margin:0px;"><span>Get Started!</span></a>
		</div>
	    
	    <?php get_template_part( 'partials/widget', 'photo' ); ?>
	    
	    <!--<?php get_template_part( 'partials/widget', 'subscribe' ); ?>-->
	    	    
	</aside><!-- #sidebar -->