<?php

// First, let's get WordPress in here
define('WP_USE_THEMES', false);
require( '../wp-load.php');

// Now, let's get the data we need
$glossary = new WP_Query( array( 
		'post_type' => 'glossary',
		'posts_per_page' => -1
	)
);

$output = array();

// Next, let's loop through it and add the content to our array
while ( $glossary->have_posts() ) : $glossary->the_post();
   // Create the appropriate array
   // Pull in the "excerpt", if it exists, and display that in "definition" (see output format below)
   // If no excerpt exists, display the main content.
   // the post title is the "term"
    if( get_field( 'glossary_excerpt' ) ) { 
      $excerpt =  get_field('glossary_excerpt');
    }
    else{
      $excerpt = get_the_content();
    }
    $output[] =   array(
      "term" => get_the_title(),
      "type" => "0",
      "definition" => $excerpt
    );
  endwhile;
  

  
// Example of how array should be formatted.
/*$output = array( 
	array(
  		"term" => "large corporation",
  		"type" => "0",
  		"definition" => "A large business."
  	),
      	
  	array(
  		"term" => "Delaware LLC",
  		"type" => "0",
  		"definition" => "A Delaware entity."
  	)
);
*/
// Now, let's make this file a JSON file so it can be read by the glossary script or a browser
header( "Content-type: application/json" );
die( json_encode( $output ) );

?>