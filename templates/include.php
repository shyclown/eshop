<?php

function addScriptsFolder($folder){
  foreach (glob($folder.'/*.js') as $filename) {
    echo '<script src="'.$filename.'"></script>';
  }
}
function addCSSFolder($folder){
  foreach (glob($folder.'/*.css') as $filename) {
    echo '<link href="'.$filename.'" rel="stylesheet" type="text/css">';
  }
}

addCSSFolder('asset');
addScriptsFolder('app');
addScriptsFolder('app/service');
addScriptsFolder('app/directive');
addScriptsFolder('app/controller');
