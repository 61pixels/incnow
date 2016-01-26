<?php
/**
 * The template used for displaying page content in page.php
 */
?>	
		
<?php get_template_part( 'partials/cta', 'header' ); // "Get Started" call to action ?>

<?php get_template_part( 'partials/dyk', 'page' ); // "Did You Know" section ?>

<?php get_template_part( 'partials/content', 'flexible' ); // Content  ?>

<?php get_template_part( 'partials/cta', 'footer' ); // "Get Started" call to action ?>

<?php get_template_part( 'partials/bottom', 'media' ); // YouTube video and Twitter feed ?>

<?php if ( function_exists( 'sharing_display' ) ) echo sharing_display(); ?>