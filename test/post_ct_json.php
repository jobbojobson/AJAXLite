<?php 
header('Content-Type:application/json; charset=UTF-8');
$posted = file_get_contents('php://input');
if(is_array($posted) || is_object($posted)){
	echo json_encode([ 'result' => $posted ]);
} else {
	echo json_encode([ 'result' => [ 'artist' => 'Frost', 'album' => 'Falling Satellites' ]]);
}
?>