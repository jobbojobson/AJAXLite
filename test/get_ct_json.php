<?php 
header('Content-Type:application/json; charset=UTF-8');
if(sizeof($_GET) > 0){
	echo json_encode([ 'result' => $_GET ]);
} else {
	echo json_encode([ 'result' => [ 'artist' => 'Frost', 'album' => 'Falling Satellites' ]]);
}
?>