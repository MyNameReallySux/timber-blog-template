<?php
class Controller {
    static $CONTROLLER_DIR = 'controllers';
    static function get_controller_dir(){
        return get_template_directory().'/'.$CONTROLLER_DIR;
    }

    static $views = [];
    static $model = [];
    function __construct(){
        $views = static::$views;
        $model = static::$model;

        $views = is_array($views) ? $views : [$views];

        $views = $this->init_views($views);
        $model = $this->init_model($model);

        $this->render($views, $models);
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
            }
        }
    }

    function render($views, $model){
        Timber::render($views, $model);
    }
}