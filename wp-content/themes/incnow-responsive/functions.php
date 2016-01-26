<?php
// lets try and disable 4.4 responsive images since it breaks certain images
add_filter( 'max_srcset_image_width', create_function( '', 'return 1;' ) );
/**
 * Migration functions and definitions.
 *
 * Sets up the theme and provides some helper functions, which are used
 * in the theme as custom template tags. Others are attached to action and
 * filter hooks in WordPress to change core functionality.
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are instead attached
 * to a filter or action hook.
 *
 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
 *
 */
// adding in menu support
register_nav_menus(
	array(
	  'header_menu' => 'Header Navigation',
	  //'foot_menu' => 'Footer Navigation' 
	)
);

/**
 * Sets up theme defaults and registers the various WordPress features that
 * the Migration theme supports.
 *
 * @uses add_editor_style() To add a Visual Editor stylesheet.
 * @uses add_theme_support() To add support for post thumbnails
 * @uses register_nav_menu() To add support for navigation menus.
 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
 *
 */
function migration_setup() {

	// This theme styles the visual editor with editor-style.css to give it some niceties.
	add_editor_style();

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', __( 'Primary Menu', 'migration' ) );

	// This theme uses a custom image size for featured images, displayed on "standard" posts.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 500, 9999 ); // Unlimited height, soft crop
}
add_action( 'after_setup_theme', 'migration_setup' );


/**
 * Enqueues scripts and styles for front-end.
 */
function migration_scripts_styles() {
	global $wp_styles;

	/*
	 * Loads our main stylesheet.
	 */
	wp_enqueue_style( 'incnow-style', get_stylesheet_uri(), array(), filemtime( get_template_directory() . '/style.css' ) );

	/*
	 * Optional: Loads the Internet Explorer specific stylesheet.
	 */
	//wp_enqueue_style( 'migration-ie', get_template_directory_uri() . '/css/ie.css', array( 'migration-style' ), '20121010' );
	//$wp_styles->add_data( 'migration-ie', 'conditional', 'lt IE 9' );
}
add_action( 'wp_enqueue_scripts', 'migration_scripts_styles' );

function load_main_scripts() {
 
 	wp_register_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array( 'jquery' ), filemtime( get_template_directory() . '/assets/js/scripts.js' ), true ); // Loads in the footer with cache busting
	wp_register_script( 'collapsible', get_template_directory_uri() . '/assets/js/jquery.collapsible.min.js', array( 'jquery' ), 1.0, true  );
	wp_register_script( 'modernizer', get_template_directory_uri() . '/assets/js/modernizr-2.6.1-respond-1.1.0.min.js' );
	wp_register_script( 'magnific', get_template_directory_uri() . '/assets/js/jquery.magnific.min.js', array( 'jquery' ) );
	wp_register_script( 'select', get_template_directory_uri() . '/assets/js/bootstrap-select.min.js', array( 'jquery' ) );
	wp_register_script( 'dropdown', get_template_directory_uri() . '/assets/js/bootstrap-dropdown.js', array( 'jquery' ), 1.0, true  );
	wp_register_script( 'fitvids', get_template_directory_uri() . '/assets/js/jquery.fitvids.js', array( 'jquery' ), 1.0, true  );
	wp_register_script( 'tabaccord', get_template_directory_uri() . '/assets/js/easyResponsiveTabs.js', array( 'jquery' ), 1.0, true  );
	//wp_register_script( 'placeholders', get_template_directory_uri() . '/assets/js/Placeholders.js', array( 'jquery' ), 1.0, true  );
	//wp_register_script( 'glossary', get_template_directory_uri() . '/assets/js/jquery.zglossary.min.js', array( 'jquery' ), 1.0, true  );
		
	wp_enqueue_script( 'modernizer' );
	wp_enqueue_script('scripts');
	wp_enqueue_script('select');
	wp_enqueue_script('dropdown');
	wp_enqueue_script( 'magnific' );
	wp_enqueue_script( 'fitvids' );
	//wp_enqueue_script( 'placeholders' );
	wp_enqueue_script( 'tabaccord' );
	  	  
	if( is_page() OR get_post_type() == 'state' OR get_post_type() == 'faq' ) {
	  wp_enqueue_script( 'collapsible');
	}
	
	if( ! is_front_page() OR ! is_post_type_archive( 'glossary' ) ) {		
	  wp_enqueue_script( 'glossary' );
	}

	if(is_page_template('page-templates/template-video-gallery.php')) { // load only on video gallery
		wp_enqueue_script('lazyYT', get_template_directory_uri() . '/assets/js/lazyYT.js', array( 'jquery' ), 1.0, true); // lazy load youtube
	}
	
 
}
add_action( 'wp_enqueue_scripts', 'load_main_scripts' );


function p2p_connections() {
 	p2p_register_connection_type( array(
 		'name' => 'state_to_faq',
 		'from' => 'state',
 		'to' => 'faq'
 	) );
 }

add_action( 'p2p_init', 'p2p_connections' );


/**
 * Modifications to the main query
 */
function incnow_query_modifications( $query ) {
   
    if ( is_admin() || ! $query->is_main_query() )
        return;

    if ( is_post_type_archive( 'testimonial' ) ) {
        $query->set( 'posts_per_page', -1 );
        return;
    }
    
    if ( is_post_type_archive( 'faq' ) ) {        
        $query->set( 'posts_per_page', 10 );        
        return;
    }
    
    if ( is_tax( 'glossary-letter' ) ) {        
        $query->set( 'posts_per_page', -1 );        
        return;
    }
    
}
add_action( 'pre_get_posts', 'incnow_query_modifications', 1 );	


// custom function for grabbing youtube video ID from a youtube full link
function px_getYoutubeURL($text) {
    $text = preg_replace('~
        # Match non-linked youtube URL in the wild. (Rev:20130823)
        https?://         # Required scheme. Either http or https.
        (?:[0-9A-Z-]+\.)? # Optional subdomain.
        (?:               # Group host alternatives.
          youtu\.be/      # Either youtu.be,
        | youtube         # or youtube.com or
          (?:-nocookie)?  # youtube-nocookie.com
          \.com           # followed by
          \S*             # Allow anything up to VIDEO_ID,
          [^\w\s-]       # but char before ID is non-ID char.
        )                 # End host alternatives.
        ([\w-]{11})      # $1: VIDEO_ID is exactly 11 chars.
        (?=[^\w-]|$)     # Assert next char is non-ID or EOS.
        (?!               # Assert URL is not pre-linked.
          [?=&+%\w.-]*    # Allow URL (query) remainder.
          (?:             # Group pre-linked alternatives.
            [\'"][^<>]*>  # Either inside a start tag,
          | </a>          # or inside <a> element text contents.
          )               # End recognized pre-linked alts.
        )                 # End negative lookahead assertion.
        [?=&+%\w.-]*        # Consume any URL (query) remainder.
        ~ix', 
        '$1', $text);
    return $text;
}

// remove wp version param from any enqueued scripts
function remove_cssjs_ver( $src ) {
    if( strpos( $src, '?ver=' ) )
        $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'remove_cssjs_ver', 1000 );
add_filter( 'script_loader_src', 'remove_cssjs_ver', 1000 );