<?php
	ob_start();
	session_start();
	include 'testmysql.php';
	$club=$_REQUEST['club'];
	$ename=$_REQUEST['ename'];
	$info=$_REQUEST['info'];
	$prize=$_REQUEST['prize'];
	$contactName=$_REQUEST['contactName'];
	$contactNumber=$_REQUEST['contactNumber'];
	$contactMail=$_REQUEST['contactMail'];
	$date=$_REQUEST['date'];
	$time=$_REQUEST['time'];
	$link=isset($_REQUEST['link'])?$_REQUEST['link']:'';
	if(empty($_FILES["short"]["name"]))
	{
		echo "Please choose a file";
		exit();
	}
	$shortName=$_FILES["short"]["name"];
	//echo $shortName;
   	$shortType=$_FILES['short']['type'];
   	$bigName=$_FILES['big']['name'];
   	$bigType=$_FILES['big']['type'];
   	if(($shortType=='image/jpeg' || $shortType=='image/png' || $shortType=='image/gif' || $shortType=='image/pjpeg')&&($bigType=='image/jpeg' || $bigType=='image/png' || $bigType=='image/gif' || $bigType=='image/pjpeg'))
   	{
   		$query=mysqli_query($con,"SELECT * FROM evenTable where eName='$ename'") or die(mysqli_error($con));
   		$rows=$query->num_rows;
   		if($rows>=1)//eventName exist
   		{
   			echo "Event Name already exist!!";
   		}
   		else
   		{
   			if (!file_exists($_SERVER['DOCUMENT_ROOT'].'/Fest/images/'.$shortName) && !file_exists($_SERVER['DOCUMENT_ROOT'].'/Fest/images/'.$bigName))
   			{

   				$shortUpload=move_uploaded_file($_FILES['short']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/Fest/images/'.$shortName);
   				$bigUpload=move_uploaded_file($_FILES['big']['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/Fest/images/'.$bigName);
   				$insert=mysqli_query($con,"INSERT into evenTable(club,eName,eInfo,ePrize,eContactName,eContactNumber,eContactMail,eDate,eTime,resgister,imageURI,bigimageURI) values('$club','$ename','$info','$prize','$contactName','$contactNumber','$contactMail','$date','$time','$link','$shortName','$bigName')") or die(mysql_error($con));
   				echo "added successfully!!!";
   			# code...
   			}
   			else
   			{
   				echo "Change File name and upload file again";
   			}
   		}
   	}
?>