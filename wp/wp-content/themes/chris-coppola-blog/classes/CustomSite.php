<?php

if(class_exists('TimberSite')){
	class CustomSite extends TimberSite {
		function ___construct(){
			$this->init_theme();
		}
	
		protected function init_theme(){
			$this->add_theme_support();
			$this->add_filters();
			$this->add_actions();
		}
	
		protected function add_theme_support(){
			add_theme_support('post-formats', ['gallery', 'quote', 'video', 'aside', 'image', 'link' ]);
			add_theme_support('post-thumbnails');
			add_theme_support('menus');
			add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption']);
		}
	
		protected function add_filters(){
			add_filter('timber_context', [$this, 'add_to_context']);
			add_filter('get_twig', [$this, 'add_to_twig']);
		}
	
		protected function add_actions(){
			$this->add_actions_from_list('init', [
				'register_scripts', 'register_styles'
			]);
		}
	
		protected function add_actions_from_list(String $action, array $list){
			foreach($list as $item){
				add_action($action, [$this, $item]);
			}
		}
	
		protected function register_scripts() {
			is_admin() ? $this -> register_admin_scripts() : $this -> register_live_scripts();
		}
		
		protected function register_live_scripts() {
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
	}
} else {
	class CustomSite{}
}