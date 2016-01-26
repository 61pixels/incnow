<?php
# Database Configuration
define( 'DB_NAME', 'wp_incnow' );
define( 'DB_USER', 'incnow' );
define( 'DB_PASSWORD', 'ZinRHkw2pPct4lQk' );
define( 'DB_HOST', '127.0.0.1' );
define( 'DB_HOST_SLAVE', '127.0.0.1' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', 'utf8_unicode_ci' );
$table_prefix = 'wp_';



# Security Salts, Keys, Etc
define( 'AUTH_KEY', 'A.bJ =M!P#-sI;c1^%iJ.jG<XIH|$bcJM9|>0E2P]8@0?Q=xsXK,<p^D }:J-h} ' );
define( 'SECURE_AUTH_KEY', 'i|sI,+k*-;*QS/,F%k8H1>Wl?zbvAtTJu*=f|z+?Y3!iJw;B_)hA=&j}8t/ #^)`' );
define( 'LOGGED_IN_KEY', '%j0%6+~($+&72M-oVq!`TbD76l<|Bpn s(/J~+DyuJFeS4#-HjQGDV@K;^%@a,!$' );
define( 'NONCE_KEY', '{<ILD*g<^~L|J^qoLUysV,QZya_P8lGK9+Z!;Ls=$y0 I UvU#YDO-3%95.U6}}-' );
define( 'AUTH_SALT', '/j(%UcYeK2YAXeLRc$1U;uhH]+[BCr~m^CiIGFA "v"N[8rmQ3CBR]F3cA"VNa%@' );
define( 'SECURE_AUTH_SALT', 'LLLlbi,=bP$]45O]H2]? Syr{ =XmW/cX/m%`lh?13Y}iE@S$^u^/"8^/b7!%(%Q' );
define( 'LOGGED_IN_SALT', '62Wyd.KjR}~hE<ZT7!zmS"8dDI~p?$.m>>+lRZSI8s{)NlDF-zI1T"Jnu|baJB_y' );
define( 'NONCE_SALT', 'bknkPPX=OmlBW`=i_x^5[au[$/h{AL)?t??k{l<Et@~HWMVwC~y{aR!mR|8>z"IX' );



# Localized Language Stuff

define( 'WP_CACHE', TRUE );

define( 'WP_AUTO_UPDATE_CORE', false );

define( 'PWP_NAME', 'incnow' );

define( 'FS_METHOD', 'direct' );

define( 'FS_CHMOD_DIR', 0775 );

define( 'FS_CHMOD_FILE', 0664 );

define( 'PWP_ROOT_DIR', '/nas/wp' );

define( 'WPE_APIKEY', '810d96d60c9ce951aa2756dd62f6d91cbd605358' );

define( 'WPE_FOOTER_HTML', "" );

define( 'WPE_CLUSTER_ID', '10519' );

define( 'WPE_CLUSTER_TYPE', 'pod' );

define( 'WPE_ISP', true );

define( 'WPE_BPOD', false );

define( 'WPE_RO_FILESYSTEM', false );

define( 'WPE_LARGEFS_BUCKET', 'largefs.wpengine' );

define( 'WPE_SFTP_PORT', 22 );

define( 'WPE_LBMASTER_IP', '104.130.52.179' );

define( 'WPE_CDN_DISABLE_ALLOWED', false );

define( 'DISALLOW_FILE_EDIT', FALSE );

define( 'DISALLOW_FILE_MODS', FALSE );

define( 'DISABLE_WP_CRON', false );

define( 'WPE_FORCE_SSL_LOGIN', true );

define( 'FORCE_SSL_LOGIN', true );

/*SSLSTART*/ if ( isset($_SERVER['HTTP_X_WPE_SSL']) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on'; /*SSLEND*/

define( 'WPE_EXTERNAL_URL', false );

define( 'WP_POST_REVISIONS', FALSE );

define( 'WPE_WHITELABEL', 'wpengine' );

define( 'WP_TURN_OFF_ADMIN_BAR', false );

define( 'WPE_BETA_TESTER', false );

umask(0002);

$wpe_cdn_uris=array ( );

$wpe_no_cdn_uris=array ( );

$wpe_content_regexs=array ( );

$wpe_all_domains=array ( 0 => 'blog.incnow.com', 1 => 'florida.incnow.com', 2 => 'nevada.incnow.com', 3 => 'www.incnow.com', 4 => 'incnow.wpengine.com', 5 => 'incnow.com', );

$wpe_varnish_servers=array ( 0 => 'pod-10519', );

$wpe_special_ips=array ( 0 => '162.242.229.243', );

$wpe_ec_servers=array ( );

$wpe_largefs=array ( );

$wpe_netdna_domains=array ( );

$wpe_netdna_domains_secure=array ( );

$wpe_netdna_push_domains=array ( );

$wpe_domain_mappings=array ( );

$memcached_servers=array ( 'default' =>  array ( 0 => 'unix:///tmp/memcached.sock', ), );

define( 'WP_SITEURL', 'http://www.incnow.com' );
define( 'WP_HOME', 'http://www.incnow.com' );
define( 'WPLANG', '' );

# WP Engine Settings
define( 'PWP_DOMAIN_CONFIG', 'www.incnow.com' );
define( 'WPE_CACHE_TYPE', 'generational' );



























/*SSLSTART*/
if ( isset( $_SERVER['HTTP_X_WPE_SSL'] ) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on';
/*SSLEND*/



# Custom Settings












$_wpe_preamble_path = null;



# That's It. Pencils down
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname(__FILE__) . '/' );
}
require_once( ABSPATH . 'wp-settings.php' );

$_wpe_preamble_path = null; if(false){}
