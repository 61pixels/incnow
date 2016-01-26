<?php // Grab our data 

$button_link = get_field( 'service_order_link' );
$button_text = get_field( 'service_order_text' );

?>

<div class="section cta">
	
	<?php if( $button_link ) : 
	
		// Check for a popup link			
		if( strpos( $button_link, '#popup' ) !== FALSE ) { 
		
			// Prepare our trigger 
			$trigger = str_replace( '#popup', 'trigger-popup', $button_link );
			
			echo '<a href="' . $button_link . '" class="button cta ' . $trigger . '">' . $button_text . '</a>';
			
		// No popup, so let's display a standard link
		} else {
		
			echo '<a href="' . $button_link . '" class="button cta">' . $button_text . '</a>';
		}
	
	 endif; ?>

</div>
