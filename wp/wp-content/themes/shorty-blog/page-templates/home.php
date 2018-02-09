<?php 
/**
 * Template Name: Home
 * 
 * @package BeautifulCode
 * @subpackage ShortyBlog
 */

$context = Timber::get_context();
$page = new TimberPost();
$page->style_id = to_camel_case($pagepost->slug, true);
$page->inline_style = get_page_style_contents('home');
$context['page'] = $page;
$context['layout'] = [
	'full_header' => true
];

$posts = new Timber\PostQuery([
	'post_type' => 'post',
	'number_posts' => 3
]);


$recent_posts = new Timber\PostQuery([
	'post_type' => 'post',
	'number_posts' => 5
]);

$recent_projects = new Timber\PostQuery([
	'post_type' => 'project',
	'number_posts' => 6
]);

$wp_categories = get_categories();
$categories = [];
foreach($wp_categories as $key => $category){
	$categories[] = new TimberTerm($category->cat_ID);
}

$wp_tags = get_tags();
$tags = [];
foreach($wp_tags as $key => $tag){
	$tags[] = new TimberTerm($tag->term_id);
}

$chris_coppola = get_user_by('login', 'Chris Coppola');
$me = new Timber\User($chris_coppola->id);

$me->avatar->low = str_replace('s=96', 's=96', $me->avatar->src);
$me->avatar->medium = str_replace('s=96', 's=192', $me->avatar->src);
$me->avatar->high = str_replace('s=96', 's=384', $me->avatar->src);
$me->avatar->hd = str_replace('s=96', 's=1024', $me->avatar->src);
$me->avatar->uhd = str_replace('s=96', 's=2048', $me->avatar->src);

$context['posts'] = $posts;
$context['recent_posts'] = $recent_posts;
$context['recent_projects'] = $recent_projects;

$context['categories'] = $categories;
$context['tags'] = $tags;
$context['me'] = $me;

$templates = ['views/page-templates/home.twig', '404.twig'];
Timber::render($templates, $context);