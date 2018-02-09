<?php

class StarterSite extends TimberSite {
	function __construct() {
		add_theme_support('post-formats', ['gallery', 'quote', 'video', 'aside', 'image', 'link' ]);
		add_theme_support('post-thumbnails');
		add_theme_support('menus');
		add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));
		add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('get_twig', array($this, 'add_to_twig'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
		$this -> register_scripts();
		$this -> register_styles();
		$this -> register_page_specific_styles();
		parent::__construct();
	}
	function register_scripts() {
		is_admin() ? $this -> register_admin_scripts() : $this -> register_live_scripts();
	}

	function register_live_scripts() {
		$template_directory = get_template_directory_uri();
		$scripts = [
			'app' => [
				'path' => '/js/app.js',
				'deps' => ['vendor'],
				'in_footer' => true
			],
			'vendor' => [
				'path' => '/js/vendor.js',
				'in_footer' => true
			]
		];
		foreach($scripts as $handle => [
			"path" => $path,
			"deps" => $deps,
			"in_footer" => $in_footer
		]){
			wp_register_script($handle, $template_directory.$path, $deps, null, $in_footer);
			wp_enqueue_script($handle);
		}
	}

	function register_admin_scripts(){
		$template_directory = get_template_directory_uri();
		$scripts = [
			'admin' => [
				'path' => '/js/admin.js',
				'deps' => ['vendor'],
				'in_footer' => true
			],
			'vendor' => [
				'path' => '/js/vendor.js',
				'in_footer' => true
			]
		];
		foreach($scripts as $handle => [
			"path" => $path,
			"deps" => $deps,
			"in_footer" => $in_footer
		]){
			wp_register_script($handle, $template_directory.$path, $deps, null, $in_footer);
			wp_enqueue_script($handle);
		}
	}

	function register_styles(){
		is_admin() ? $this -> register_admin_styles() : $this -> register_live_styles();		
	}

	function register_live_styles(){
		$template_directory = get_template_directory_uri();
		$styles = [
			'app' => [
				'path' => '/css/app.css',
				'media' => 'all',
			]
		];
		foreach($styles as $handle => [
			"path" => $path,
			"deps" => $deps,
			"media" => $media
		]){
			wp_register_style($handle, $template_directory.$path, $deps, null, $media);
			wp_enqueue_style($handle);
		}
	}

	function register_admin_styles(){

	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context($context) {
		$context['menus'] = [
			'primary' => new TimberMenu('Primary Navigation')
		];
		$context['site'] = $this;
		return $context;
	}

	function filter_camelcase( $text ) {
		$text = to_camel_case($text);
		return $text;
	}

	function add_to_twig($twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension(new Twig_Extension_StringLoader());
		$twig->addExtension(new Twig_Extension_Debug());		
		$twig->addFilter('camelcase', new Twig_SimpleFilter('camelcase', array($this, 'filter_')));
		return $twig;
	}
}

new StarterSite();
