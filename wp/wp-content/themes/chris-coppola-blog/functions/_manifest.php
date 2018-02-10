<?php
    require_once(__DIR__."\\header.php");
    require_once(__DIR__."\\plugins.php");

    foreach(glob(get_template_directory() . "\\classes\\*.php") as $file){
        require $file;
    }

    require_once(__DIR__."\\init.php");
?>