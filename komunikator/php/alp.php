<?php

$mem = new Memcache();
$mem->connect('127.0.0.1', 50759);


if($mem->get("messages") == false){
   $mem->set("messages", array()); 
}

$time = time();

$old = $mem->get("messages");
$old_one = 0;
if(count($old) > 0){
    $old_one = end($old)['time'];
}

while (time() - $time < 10) {
    $new = $mem->get("messages");
    $new_one = 0;
    if(count($new) > 0){
        $new_one = end($new)['time'];
    }


    // if($new_one > $old_one){
        
    //     echo json_encode($new);
    //     break;
    // }

    if(count($new) != 0){
        if(count($old) == 0){
            echo json_encode(end($new));
            break;
        }    
        else if(end($old)['time'] != end($new)['time']){
            echo json_encode(end($new));
            break;
        }
    }

    usleep(1000);
}
