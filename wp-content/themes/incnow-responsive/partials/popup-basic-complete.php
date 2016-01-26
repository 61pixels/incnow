<?php
	
// Here's some data we need

if( is_page( '388' ) || is_page( '477' ) ) { // Delaware Corporation or Incorporation Overview
	
	$title = 'Delaware Corporation: Basic vs. Complete Packages';
	$state = 'Delaware';
	$type = 'Corporation';
	$options = array( 
		array( 
			'name' => 'Complete Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=corporation',
		),
		array( 
			'name' => 'Basic Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=corporation',
		)		
	);

} elseif( is_page( 1025 ) ) { // Delaware Series LLC
	
	$title = 'Delaware Series LLC: Basic vs. Complete Packages';
	$state = 'Delaware';
	$type = 'Series LLC';
	$options = array( 
		array( 
			'name' => 'Complete Series LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=seriesllc',
		),
		array( 
			'name' => 'Basic Series LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=seriesllc',
		)		
	);
	
} elseif( is_page( '1075' ) ) { // Delaware Non-Profit
	
	$title = 'Delaware Non-Profit Corporation: Basic vs. Complete Packages';
	$state = 'Delaware';
	$type = 'Non-profit Corporation';
	$options = array( 
		array( 
			'name' => 'Non-profit Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=nonprofitcorporation',
		)	
	);
	
} elseif( is_page( 475 ) || incnow_is_state( 'DE' ) ) { // Delaware LLC
	
	$title = 'Delaware LLC: Basic vs. Complete Packages';
	$state = 'Delaware';
	$type = 'LLC';
	$options = array( 
		array( 
			'name' => 'Complete LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=llc',
		),
		array( 
			'name' => 'Basic LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=llc',
		)		
	);

} elseif( is_single( 469 ) || incnow_is_state( 'FL' ) ) { // Florida LLC & subpages where this popup included
	
	$title = 'Florida LLC: Basic vs. Complete Packages';
	$state = 'Florida';
	$type = 'LLC';
	$options = array( 
		array( 
			'name' => 'Complete LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=fl&entity=llc',
		),
		array( 
			'name' => 'Basic LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=fl&entity=llc',
		)		
	);

} elseif( is_single( 464 ) ) { // Florida Corporation
	
	$title = 'Florida Corporation: Basic vs. Complete Packages';
	$state = 'Florida';
	$type = 'Corporation';
	$options = array( 
		array( 
			'name' => 'Complete Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=fl&entity=corporation',
		),
		array( 
			'name' => 'Basic Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=fl&entity=corporation',
		)		
	);
}

?>

	    <div id="popup-basic-complete" class="popup mfp-hide compare-chart<?php echo ' ' . strtolower( $type ); ?>">
	      <!--  <header>
		        <span class="title"><?php echo $title; ?></span>
		        <p class="closeBtn">Close</p>
	        </header> -->
	        
	        <?php if( $type == 'LLC' ) { ?>
	        <table>
	        	<tr>
					<th colspan="10">
					  <span class="title"><?php echo $title; ?></span>
	      			  <p class="closeBtn">Close</p>
					</th>
				</tr>
				<thead>					
					<tr>
						<th class="state">Package</th>
						<th>Name Search</th>
						<th>Draft LLC Certificate of Formation</th>
						<th>Annual Registered Agent Service</th>
						<th>IRS Forms</th>
						<th><?php if( $state == 'Delaware' ) { echo '$90 Filing Fee'; } else { echo '$125 Filing Fee'; } // Florida ?></th>
						<th>Domestic and International Priority Mail Delivery</th>
						<th>Professionally-Prepared 20 page LLC Operating Agreement</th>
						<th class="filing-fee">Total Cost</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				
					<?php /* if( $state == 'Delaware' ) { ?>
					<tr>
						<td class="state">$9 LLC Package without Agent</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td></td>
						<td></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td class="filing-fee">$99</td>
						<td><a href="<?php echo $options[0]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					<?php } */ ?>
					
					<tr class="complete">
						<td class="state">
							<strong>Complete LLC*</strong>
							<span class="details">*Includes Operating Agreement Required by Statute</span>
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td class="filing-fee">$298</td>
						<td><a href="<?php echo $options[1]['url']; ?>" class="button">Get Started</a></td>
					</tr>

					<tr>
						<td class="state">
							<strong>Basic LLC**</strong>
							<span class="details">**Does NOT Include Operating Agreement Required by Statute</span>
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td class="filing-fee">$189</td>
						<td><a href="<?php echo $options[0]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					

					
				</tbody>
	        </table>
	        
	        <?php } else if( $type == 'Series LLC' ) { ?>
	        <table>
				<thead>
					<tr>
						<th class="state">Package</th>
						<th>Name Search</th>
						<th>Draft Series LLC Certificate of Formation</th>
						<th>Annual Registered Agent Service</th>
						<th>IRS Forms</th>
						<th>$90 Filing Fee</th>
						<th>Domestic and International Priority Mail Delivery</th>
						<th>Professionally-Prepared 50+ page Series LLC Operating Agreement with 2 series</th>
						<th class="filing-fee">Total Cost</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
						
					<tr class="complete">
						<td class="state">
							<strong>Complete Series LLC*</strong>
							<span class="details">*Includes Operating Agreement Required by Statute</span>
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td class="filing-fee">$598</td>
						<td><a href="<?php echo $options[1]['url']; ?>" class="button">Get Started</a></td>
					</tr>
								
					<tr>
						<td class="state">
							<strong>Basic Series LLC**</strong>
							<span class="details">**Does NOT Include Operating Agreement Required by Statute</span>
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td class="filing-fee">$189</td>
						<td><a href="<?php echo $options[0]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					
					
					
				</tbody>
	        </table>
	        
	        <?php } else if( $type == 'Corporation' || $type == 'Non-profit Corporation' ) { ?>
	        <table>
				<thead>
					<tr>
						<th class="state">Package</th>
						<th>Name Search</th>
						<th>Draft Certificate of Incorporation 1500 Shares, No Par</th>
						<th>Annual Registered Agent Service</th>
						<th>IRS Forms</th>
						<th><?php if( $type == 'Delaware' ) { echo '$89 Filing Fee'; } else { echo '$70 Filing Fee'; } // Florida ?></th>
						<th>Domestic and International Priority Mail Delivery</th>
						<th>Corporate Minutes</th>
						<th>Stock Certificates</th>
						<th>Unanimous Action of Initial Directors</th>
						<th>Bylaws</th>
						<th>Minute Book</th>
						<th class="filing-fee">Total Cost</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
			
					<?php /* if( $type == 'Corporation' && $state == 'Delaware' ) { //  Hide on Florida ?>
					<tr>
						<td class="state">$9 Corporation Package without Agent</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td></td>
						<td></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td class="filing-fee">$99</td>
						<td><a href="<?php echo $options[0]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					<?php } */ ?>
				
					<tr class="complete">
						<td class="state">
							<strong>Complete <?php echo $type; ?> Package</strong>
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td class="filing-fee">$298</td>
						<td><a href="<?php echo $options[1]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					
					<tr>
						<td class="state">
							<strong>Basic <?php echo $type; ?> Package</strong>=
						</td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-check.png"></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td class="filing-fee">$188</td>
						<td><a href="<?php echo $options[0]['url']; ?>" class="button">Get Started</a></td>
					</tr>
					
				</tbody>
	        </table>
	        
	        <?php } ?>
	        
	    </div>