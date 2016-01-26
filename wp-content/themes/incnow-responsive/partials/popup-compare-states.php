<?php
	
// Here's some data we need

$state_name = get_the_title( incnow_get_state_id() ); 
$delaware_id = incnow_get_state( 'DE' ); 

?>

		<!-- Popup Window -->		
	    <div id="popup-compare-states" class="popup compare-chart mfp-hide">
	        <!--<header>
		        <span class="title"><?php echo $state_name; ?> vs. Delaware LLC's: Which State Is Better?</span>
		        <p class="closeBtn">Close</p>
	        </header> -->
	        <table>

				<thead>
					<tr>
						<th colspan="11" class="theader">
						     <span class="title"><?php echo $state_name; ?> vs. Delaware LLC's: Which State Is Better?</span>    
						     <p class="closeBtn">Close</p>			  
						</th>
					</tr>
					<tr>
						<th class="state">States</th>
						<th class="filing-fee">LLC Filing Fee</th>
						<th>Required to Name Members or Managers</th>
						<th>Report Frequency</th>
						<th>Annual Fee?</th>
						<th>Reduce Fiduciary Duties?</th>
						<th>Series?</th>
						<th>Charging Order as Exclusive Remedy</th>
						<th>Maximum Freedom of Contract</th>
						<th>Separate Equity Court?</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				
					<tr>
						<td class="state">Delaware</td>
						<td class="filing-fee"><?php echo get_field( 'state_llc_filing_fee', $delaware_id );?></td>
						<td><?php echo get_field( 'state_naming_requirements', $delaware_id );?></td>
						<td><?php echo get_field( 'state_report_frequency', $delaware_id );?></td>
						<td><?php echo get_field( 'state_annual_fee', $delaware_id );?></td>
						<td><?php if ( get_field( 'state_reduced_fiduciary_duties', $delaware_id ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_series_liability_shield', $delaware_id ) != 'no' ) { echo '<img src="' .  get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_charging_order', $delaware_id ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">';} else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; }?></td>
						<td><?php if ( get_field( 'state_maximum_contract_freedom', $delaware_id ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_separate_equity_court', $delaware_id ) == 'yes' ) { echo '<img src="' .  get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						
						<?php // Call to action ?>
						<td>
							<a href="https://www.incnow.com/order/?type=new&entity=llc" class="button">Get Started</a>
						</td>
					</tr>
					
					<tr>
						<td class="state"><?php echo $state_name; ?></td>
						<td class="filing-fee"><?php if ( get_field( 'state_llc_filing_fee' ) ) { the_field( 'state_llc_filing_fee' ); } ?></td>
						<td><?php if ( get_field( 'state_naming_requirements' ) ) { the_field( 'state_naming_requirements' ); } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_report_frequency' ) ) { the_field( 'state_report_frequency' ); } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_annual_fee' ) ) { the_field( 'state_annual_fee' ); } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_reduced_fiduciary_duties' ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_series_liability_shield' ) != 'no' ) { echo '<img src="' .  get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_charging_order' ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_maximum_contract_freedom' ) == 'yes' ) { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; }  else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
						<td><?php if ( get_field( 'state_separate_equity_court' ) == 'yes' ) { echo '<img src="' .  get_stylesheet_directory_uri() . '/assets/images/icon-check.png">'; } else { echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/x-red.png">'; } ?></td>
					</tr>
					
				</tbody>
	        </table>
	    </div>