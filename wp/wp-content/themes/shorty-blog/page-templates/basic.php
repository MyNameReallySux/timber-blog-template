<?php 
/**
 * Template Name: Basic
 * 
 * @package BeautifulCode
 * @subpackage ShortyBlog
 */

$context = Timber::get_context();
$post = new TimberPost();
$post->styleID = to_camel_case($post->slug, true);
$context['post'] = $post;

$templates = ['views/page-templates/basic.twig', '404.twig'];
if (is_home()) {
	array_unshift($templates, 'views/page-templates/basic.twig');
}

Timber::render($templates, $context);