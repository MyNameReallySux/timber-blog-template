<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  Beautiful Code
 * @subpackage  Chris Coppola Blog
 * @since   Chris Coppola Blog 0.1
 */

$context = Timber::get_context();

$post = Timber::query_post();
$post->styleID = to_camel_case($post->slug, true);
$context['post'] = $post;
if (post_password_required($post->ID)) {
	Timber::render('views/single-password.twig', $context);
} else {
	Timber::render([
		'views/post-types/single-'.$post->ID.'.twig',
		'views/post-types/single-'.$post->post_type.'.twig',
		'views/post-types/single.twig'], 
	$context);
}
