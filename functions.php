<?php
/**
 * Custom functions that load before the parent theme's functions.php file.
 */

/**
 * Turn on output buffering to allow writing to $_POST.
 */
function start_output_buffering() {
    ob_start();
}
add_action( 'init', 'start_output_buffering' );

/**
 * Register and enqueue the requred CSS and Javascript.
 */
function custom_styles_scripts() {

    $theme_uri = get_stylesheet_directory_uri();

    wp_register_style( 'custom-css', $theme_uri . '/css/custom.css' );
    wp_enqueue_style( 'custom-css' );
    
    if ( is_page_template('pjs-canvas.php') ) {
        wp_register_style( 'processing-css', $theme_uri . '/css/pjs.css' );
        wp_enqueue_style( 'processing-css' );
    }
    
    wp_register_script(
        'custom-js',
        $theme_uri . '/js/custom.js',
        array( 'jquery' ),
        false,
        true
    );
	wp_enqueue_script( 'custom-js' );
	
	// Make some PHP data available to our custom Javascript file.
	$data = array(
	    'siteUrl' => __( $theme_uri ),
	    'adminAjaxUrl' => __( admin_url( 'admin-ajax.php' ) )
	);
	wp_localize_script('custom-js', 'SiteData', $data);
}
add_action( 'wp_enqueue_scripts', 'custom_styles_scripts' );


/**
 * Return post content upon Ajax request.
 */
function display_post_with_js() {

    
    $post = get_post( $_POST['requested_post'] );
    $post->post_content = do_shortcode( $post->post_content );
    $post->post_thumbnail = get_the_post_thumbnail( $post->ID, 'thumbnail' );
    
    echo json_encode( $post );
    die();
}
add_action('wp_ajax_display_post_with_js', 'display_post_with_js');
add_action('wp_ajax_nopriv_display_post_with_js', 'display_post_with_js');


function list_post_links() {
    $categories = get_categories( array(
        'orderby' => 'id',
    ) );
    $list = '';
    foreach( $categories as $category ) {
        $list .= '<dt>' . $category->name . '</dt>';
        $posts = get_posts( array(
            'category' => $category->term_id,
            'order'    => 'ASC',
            'status'   => 'publish'
        ) );
        foreach ( $posts as $post ) {
	        $list .= '<dd class="post-button"><a href="' . $post->guid
	            . '" data-postid="' . $post->ID . '">'
	            . $post->post_title . '</a></dd>';
	    }
    }
    echo $list;
}
