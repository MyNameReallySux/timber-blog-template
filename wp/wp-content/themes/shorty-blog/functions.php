<?php

@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

foreach(glob(get_template_directory() . "/functions/*.php") as $file){
    require $file;
}