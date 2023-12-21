<?php

if(isset($_POST['nick'])){
    $mem = new Memcache();
    $mem->connect('127.0.0.1', 50759);    

    $time = floor(microtime(true) * 1000); 

    if($mem->get("messages") != false){
        $arr = $mem->get("messages");

        if(count($arr) > 50){
            array_shift($arr);
        }

        array_push($arr, array("time" => $time,"nick" => $_POST['nick'], "message" => $_POST['message'],"color"=> $_POST['color']));
        $mem->set("messages", $arr);
    }
    else{
        $mem->set("messages", array(array("time" => $time,"nick" => $_POST['nick'], "message" => $_POST['message'],"color"=> $_POST['color'])));
    }

}