<?php

// Data?	

?>

	    <div id="popup-entity-name" class="popup entity-name mfp-hide">
	    	
	        <header>
		       <span  style="font-size: 2em; color: #676767; font-family: 'arch-bold';" class="title">Entity Name Check</span>
		        <p class="closeBtn">Close</p>
	        </header>	        
	       
			<form id="entity-name-form">
			
				<div class="row">
					<label for="FirstName">First Name</label>
					<input id="FirstName" name="FirstName" type="text" />
					
					<label for="LastName">Last Name</label>
					<input id="LastName" name="LastName" type="text" />
				</div>
				
				<div class="row">
					<label for="EmailAddress">Email Address</label>
					<input id="EmailAddress" name="EmailAddress" type="text" />
				</div>
				
				<div class="row">
					<label for="Phone">Phone</label>
					<input id="Phone" name="Phone" type="text" />
				</div>
				
				<div class="row">
					<label for="EntityName">Desired Entity Name</label>
					<input id="EntityName" name="EntityName" type="text" />
				</div>
				
				<div class="row">
					<label for="EntityType">Entity Type</label>
					<select id="EntityType" name="EntityType">
						<option value="LLC">LLC</option>
						<option value="Incorporation">Incorporation</option>
						<option value="Series LLC">Series LLC</option>
						<option value="LP">LP</option>
						<option value="Non-Profit Corp">Non-Profit Corp</option>
					</select>
				</div>
				
				<div class="row">
					<label for="Questions">Questions</label>
					<textarea id="Questions" name="Questions" cols="20" rows="3"></textarea>
				</div>
				
				<div class="row">
					<input class="submit" type="submit" value="Search Entity Name" />
				</div>			
			
			</form>
			<div id="popup-entity-name-acknowledge" class="popup mfp-hide">
				<header>
					<span class="title">Thank You</span>
				</header>
				<div>
					<p>Thank you for submitting your question. Within 1 business day, you will be contacted by one of our agents. </p>
				</div>
			</div>

				        
	    </div>