<?php

$model = [
    'post' => new TimberPost()
];

class HomeController extends Controller {
    static $views = ['components/home/home.view.twig'];
}

new HomeController()

?>