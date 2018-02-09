<?php

class HomeController extends Controller {
    static $views = ['components/home/home.view.twig'];
    static $model = [
        'post' => function(){
            return new TimberPost();
        }
    ]
}

new HomeController()

?>