<?php

if (!class_exists('Timber')) {
	add_action('admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = ['templates', 'views'];

function to_camel_case($str, bool $capital, array $noStrip = []){
	// non-alpha and non-numeric characters become spaces
	$str = preg_replace('/[^a-z0-9' . implode("", $noStrip) . ']+/i', ' ', $str);
	$str = trim($str);
	// uppercase the first character of each word
	$str = ucwords($str);
	$str = str_replace(" ", "", $str);

	return $capital ? $str : lcfirst($str);
}

function print_code($str){
	echo "<pre>";
	var_dump($str);
	echo "</pre>";
}

function print_style($page_style){
	echo '<style id="Page_Stylesheet">';
	echo $page_style;
	echo '</style>';
}

function get_page_style_contents($name, $media = 'all') {
	$template_directory = get_template_directory_uri();
	$page_css_url = "{$template_directory}/css/pages/{$name}.css";
	$page_style = file_get_contents($page_css_url);
	return $page_style;
}