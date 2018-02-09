<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  Beautiful Code
 * @subpackage  Chris Coppola Blog
 * @since   Chris Coppola Blog 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$post->styleID = to_camel_case($post->slug, true);
$context['post'] = $post;

Timber::render([
	'views/page-types/page-'.$post->post_name.'.twig', 
	'views/page-types/page.twig'], 
$context );