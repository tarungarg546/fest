<?php
	ob_start();
	$con= mysqli_connect('localhost','tarun','sponsors@culmyca','sponsors'); 
	//$con= mysqli_connect('mysql.hostinger.in','u316193469_tarun','tarungarg','u316193469_test');
	if (mysqli_connect_errno()) { 
		echo "Failed to coonect". mysqli_connect_error(); 
	}
	$insert=mysqli_query($con,"INSERT ") 
?>