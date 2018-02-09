<?php 
/**
 * Template Name: Bio
 * 
 * @package BeautifulCode
 * @subpackage ShortyBlog
 */

$context = Timber::get_context();
$projects = Timber::get_posts();

$post = new TimberPost();

$user_id = $post->custom['user'];
$user = new Timber\User($user_id);

print_code($user);

$context['post'] = $post;
$context['user'] = $user;


$templates = array( 'views/page-templates/bio.twig' );
if (is_home()) {
	array_unshift( $templates, 'views/page-templates/bio.twig' );
}

Timber::render($templates, $context);