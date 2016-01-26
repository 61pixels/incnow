<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<script src="//cdn.optimizely.com/js/1989040282.js"></script>	
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />   
	<title><?php wp_title(); ?></title>   
	<meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/incnow-logor.png"/>
	<meta property="og:site_name" content="IncNow"/>
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/favicon.ico?4" type="image/x-icon" />
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/foundation.css" type="text/css" media="all" />
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" media="all"/>
	<?php wp_head(); ?>	
</head>

<body <?php body_class(); ?>>

<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-PPMZHS"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPMZHS');</script>
<!-- End Google Tag Manager -->

<header id="header">
	   <div id="head-top">
	    	<div class="row">
	    		<div class="twelve columns">
	    			<nav id="state-nav">	    				
				    	<ul id="states">
				    		<li class="uppercase">I want to incorporate in:</li>
				    	<?php 				    	
				    		// Set the variables we need
							$is_Florida = incnow_is_state('FL');
							$is_Nevada = incnow_is_state('NV');
							$state_name = get_the_title( incnow_get_state_id() ); 
							$state_code = get_field( 'state_abbreviation', incnow_get_state_id() );

				    		echo '<li><a ' . ( ( ! $is_Florida && !$is_Nevada && strlen( $state_code ) <> 2  ) ? 'class="active" ' : '' ) . 'href="/">Delaware</a></li>';
				    		echo '<li><a ' . ( ( $is_Florida ) ? 'class="active" ' : '' ) . 'href="/florida/">Florida</a></li>';
				    		echo '<li><a ' . ( ( $is_Nevada ) ? 'class="active" ' : '' ) . 'href="/nevada/">Nevada</a></li>';
				    		?>				    		
				    	</ul>

			   		</nav>
			    	
			    </div>
	    	</div>
	    </div>


	    <div class="row">
		    <div class="three columns">
			    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo">
			    	<img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/incnow-logor.png" alt="IncNow Agents and Corporations, Inc" />				  
			    </a>
			</div>
			<div class="nine columns">
			    <div class="head-contact">
			  		<?php if (is_page('states')) { // if its the state page, we won't have the other navigation so let's adjust spacing here. Hack because not sure where else to adjust ?>
			    		<h3 class="mtop40">We're here to help. <span>1.800.759.2248</span></h3>
			    	<?php } else { ?>
						<h3>We're here to help. <span>1.800.759.2248</span></h3>
					<?php } ?>
				</div>
			    <nav id="main-nav">	 
					<?php // Load the appropriate "Mega Menu" for each of the three main States and the FAQs
						if ( is_singular( 'faq' ) ) {
							
							// Check posts2posts to see if this post is connected			
							$p2p_florida = p2p_type( 'state_to_faq' )->get_p2p_id( $post->ID, incnow_get_state('FL') );
							$p2p_nevada = p2p_type( 'state_to_faq' )->get_p2p_id( $post->ID, incnow_get_state('NV') );
													
							// Florida 			
							if( $p2p_florida ) {
								//get_template_part( 'partials/menu-header', 'florida' ); 
								wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-florida' )); 
							
							// Nevada
							} elseif( $p2p_nevada ) {
								//get_template_part( 'partials/menu-header', 'florida' ); 
								wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-nevada' )); 	
							
							// Delaware / Catchall
							} else {
								wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-delaware' )); 
							}
						
						} else if (is_page('states')) { // if it's our new states page we don't want the extra navigation

						} else if ( incnow_is_state( 'DE' ) || is_page() || is_archive() || is_post_type_archive() || is_home() || is_singular( 'post' ) ) { 
							wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-delaware' )); 					
						} else if( incnow_is_state( 'FL' ) ) { 		
							//get_template_part( 'partials/menu-header', 'florida' ); 
							wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-florida' )); 
						} else if( incnow_is_state( 'NV' ) ) { 		
							wp_nav_menu( array('container' => 'false', 'menu' => 'header-main-nevada' )); 	
							//get_template_part( 'partials/menu-header', 'nevada' ); 											
						}		
	 				?>				
			    </nav>
			</div>
	    </div>
	</header> <!-- end #header -->

	<?php if( ! ( is_front_page() OR is_single( 'florida' ) OR is_single( 'nevada') ) ) { // Hide breadcrumbs on the three homepages  ?>
	<div class="breadcrumbs">
		<div class="container">
			<?php if ( function_exists('yoast_breadcrumb') ) yoast_breadcrumb(); ?>
		</div>
	</div>
	<?php } ?>