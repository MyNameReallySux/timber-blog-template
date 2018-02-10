<?php

class HomeController extends Controller {
    static $views = ['home/home.view.twig'];

    static function get_model(){
        return [
            'page' => new TimberPost()
        ];
    }
}

new HomeController();

?>