<?php

// Here's some data we need

$state_name = get_the_title( incnow_get_state_id() );
$state_code = get_field( 'state_abbreviation', incnow_get_state_id() ); // The two letter abbreviation for each State

?>

	<section id="page-topper">
		<div id="state-header">
			<div class="row">
				<div class="twelve columns">
					<h1>Yes, we can help you form an LLC in <?php echo $state_name; ?>!</h1>
				</div>
			</div>
			<div class="row">
				<div class="six columns state-l">
					<ol class="custom-numbers">
						<li><span class="li-one">1</span> Search the LLC name now.</li>
						<li><span class="li-two">2</span> Offer payment upon response.</li>
						<li><span class="li-three">3</span> Receive your LLC order.</li>
					</ol>
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/states/state-<?php echo strtolower( $state_code ); ?>.png">
					<a href="#popup-price-guarantee" id="trigger-popup-price-guarantee" class="button blue">Price Match Guarantee...<br>How does this work?</a>
					
					<div id="popup-price-guarantee" class="popup mfp-hide">
						<p>Without committing to an order, this is an easy way to check your LLC name before filing it. For all 50 states (except, Delaware, Florida and Nevada, which Incnow processes internally at the advertised prices), when you submit your LLC name request, Incnow will submit your request to our affiliate instantly for them to check the name and get back to you as soon as possible with the availability of the name for filing.</p>
						<p>The affiliate will then request the order information and let you know the package options. Should you find a lower advertised price for identical services, at the time of the order, the affiliate will match that price, pursuant to their terms of use. Services will then be provided by the affiliate as the formation agent and also registered agent should you request a registered agent. The affiliate will then manage the relationship without Incnow’s involvement.</p>
						<p>While Incnow cannot provide a price quote at this time or a list of packages, we do expect the affiliate to provide the price and package options to your satisfaction prior to your order.  We appreciate your business and hope you find this process to be easy, convenient and affordable. Thank you.</p>				
					</div>					
				</div>
				<div class="state-r six columns">
					<form>
						<input id="pt-firstname" type="text" placeholder="First Name"/>
						<input id="pt-lastname" type="text" placeholder="Last Name"/>
						<input id="pt-email" type="text" placeholder="Email Address"/>
						<input id="pt-phone" type="text" placeholder="Phone"/>
						<input id="pt-desired-llc-name" type="text" placeholder="Desired LLC Name"/>
						<input id="pt-state-name" type="hidden" value=<?php echo "\"" . $state_name . "\""; ?> />
						<input id="pt-state-code" type="hidden" value=<?php "\"" . $state_code  . "\""; ?> />
						<a href="#" onclick="sendStateTopperLead();return false;" class="get-started">Search LLC Name Now!</a>
					</form>
				</div>
			</div>
		</div><!-- /state-header-->		
	</section>
	
	<a style="display:none" href="#popup-lead-acknowledge" id="trigger-popup-lead-acknowledge"></a>

	<div id="popup-lead-acknowledge" class="popup mfp-hide">
		<header>
			<span class="title">Thank You</span>
		</header>
		<div>
			<p>Thank you for submitting your requested business name. We have forwarded your information to a service to check it for you. Within 1 business day, you will be contacted by Incorp Services, Inc.  You can then decide what package you want, provide your information and complete the order. They offer a low price match. For more information you can contact them at <a href="http://www.incorp.com">www.incorp.com</a> or toll-free at 800-246-2677.</p>
		</div>
	</div>
