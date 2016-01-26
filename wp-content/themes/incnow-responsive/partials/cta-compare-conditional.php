<?php

if( is_page( 475 ) ) { // Delaware LLC
	
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
	$pricingurl = '/delaware-llc/compare/';
	$compare = true;
}

elseif( is_page( '388' ) || is_page( '477' ) ) { // Delaware Corporation or Incorporation Overview

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
	$pricingurl = '/delaware-corporation/compare/';
	$compare = true;

}

elseif( is_page( 1025 ) ) { // Delaware Series LLC
	
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
	$pricingurl = '/delaware-series-llc/compare/';
	$compare = true;

}

elseif( is_page( 1073 ) ) { // Limited Partnership
	
	$state = 'Delaware';
	$type = 'Limited Partnership';
	$options = array( 
		array( 
			'name' => 'Limited Partnership Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=lp',
		)	
	);	
	$compare = false;

}

elseif( is_page( 1075 ) ) { // Non-Profit
	
	$state = 'Delaware';
	$type = 'Non-profit Corporation';
	$options = array( 
		array( 
			'name' => 'Non-profit Basic Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=nonprofitcorporation',
		),
		array( 
			'name' => 'Non-profit Complete Package',
			'url' => 'https://www.incnow.com/order/?type=new&entity=nonprofitcorporation',
		)	
	);
	$pricingurl = '/non-profit/compare/';
	$compare = true;

}

elseif( is_single( 464 ) ) { // Florida Corporation
	
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
	$pricingurl = '/florida/corporation/compare/';
	$compare = true;
}

elseif( is_single( 469 ) OR incnow_is_state( 'FL' ) ) { // Florida LLC or sub-page
	
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
	$pricingurl = '/florida/llc/compare/';
	$compare = true;

}

elseif( is_single( 473 ) ) { // Nevada Corporation
	
	$state = 'Nevada';
	$type = 'Corporation';
	$options = array( 
		array( 
			'name' => 'Nevada Corporation Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=nv&entity=corporation',
		)		
	);
	
	$compare = false;
}

elseif( is_single( 456 ) OR incnow_is_state( 'NV' ) ) { // Nevada LLC or sub-page
	
	$state = 'Nevada';
	$type = 'LLC';
	$options = array( 
		array( 
			'name' => 'Nevada LLC Package',
			'url' => 'https://www.incnow.com/order/?type=new&state=nv&entity=llc',
		)	
	);
	
	$compare = false;
}

else { // Nothing else matches? Go for the Delaware LLC
	
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
	$pricingurl = '/delaware-llc/compare/';
	$compare = true;
	
}
?>							