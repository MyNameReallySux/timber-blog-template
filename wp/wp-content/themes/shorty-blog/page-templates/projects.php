<?php 
/**
 * Template Name: Projects
 * 
 * @package BeautifulCode
 * @subpackage ShortyBlog
 */

$context = Timber::get_context();

$args = [
	'post_type' => 'project',
	'order_by' => [
		'title' => 'DESC'
	]
];

$projects = Timber::get_posts($args);

$context['projects'] = $projects;
$context['post'] = new TimberPost();

$templates = array( 'views/page-templates/projects.twig' );
if (is_home()) {
	array_unshift( $templates, 'views/page-templates/projects.twig' );
}

Timber::render($templates, $context);