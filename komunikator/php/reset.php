<?php

$mem  = new Memcache();
$mem->connect('127.0.0.1',50759);

$mem->set("messages", array()); 