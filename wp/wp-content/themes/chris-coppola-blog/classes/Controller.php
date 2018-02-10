<?php
class Controller {
    static $views = [];
    static function get_model(){}

    function __construct(){
        $views = static::$views;
        $model = static::get_model();

        $views = is_array($views) ? $views : [$views];

        $views = $this->init_views($views);
        $model = $this->init_model($model);

        $this->views = $views;
        $this->model = $model;

        $this->model = $this->before_render($model);
        $this->render();
    }

    function init_views($views){
        return $views;
    }

    function init_model($models){
        $context = Timber::get_context();
        if(!is_array($models)){
            $models = ['model' => $models];
        }
        foreach($models as $name => $model){
            if(is_callable($model)){
                $context[$name] = $model();
            } else {
                $context[$name] = $model;
                
            }
        }
        return $context;
    }

    function before_render($model){
        return $model;
    }

    function render(){
        Timber::render($this->views, $this->model);
    }
}