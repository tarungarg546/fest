<?php 
  require 'core.inc.php';
  require 'connect.inc.php';
   //echo "Yes!";
   //exit();
  if(isset($_SESSION['user_id']))
  {
      header('Location:level.php');
      exit();
  }

?>

<!DOCTYPE html>
<html>

<head>
<link rel="icon" 
      type="image/png" 
      href="logo.jpg" />
  
  <meta charset="UTF-8">
 <link rel='stylesheet prefetch' href=http://fonts.googleapis.com/css?family=Lato:300,400,700|Satisfy>

  <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Roboto:100,700'>
<title>Treasure Hunt'15</title>

    <style>
    *, *:after, *:before {
  box-sizing: border-box;
}
body, html { font-size: 100%; padding: 0; margin: 0;}
body {
  background-image:url('i.jpg') ;
  height: 100%;
  overflow: hidden;

  -webkit-background-size: cover;
     -moz-background-size: cover;
       -o-background-size: cover;
          background-size: cover; 
          repeat:no-repeat;
}
h3
{
font-family: 'Satisfy', serif;
	font-size: 10em;
	
	
letter-spacing: 6px;
margin: 0;
top: 12%;
width: 100%;

text-align: center;
text-transform: none;
	word-spacing: 0;
	letter-spacing: 0;
	display: block;
	  opacity:0.9;
  color:#fff;
margin-top:6%;


	

}

h1
{
 font-family: 'Satisfy', serif;
	font-size: 4em;
	
margin: 0;
width: 100%;
text-align: center;

color:#779ECB;
word-spacing: 0;
	letter-spacing: 0;
	display: block;
	opacity: 0.4;

}


a{

margin-left:38%;



}





.loader {
  font-size: 10px;
  /* 1em */
  width: 10em;
  height: 10em;
  margin: 0 auto;
  position: relative;
  border-radius: 100%;
  background: transparent;
  border: 1em dashed rgba(138, 189, 195, 0.5);
  box-shadow: 0 0 0 0.5em skyblue;
  animation: rota 8.5s linear infinite;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  border-radius: inherit;
}
.loader:before {
  border: 0.75em dashed rgba(138, 189, 195, 0.2);
  top: 0.5em;
  right: 0.5em;
  bottom: 0.5em;
  left: 0.5em;
  animation: rota 3.0s linear infinite;
}
.loader:after {
  border: 0.7em dashed rgba(138, 189, 195, 0.4);
  top: 2em;
  right: 2em;
  bottom: 2em;
  left: 2em;
  animation: rota 1.0s linear  infinite;
}
.login{

    margin-left: 43%;
    
}
@keyframes rota {
  to {
    transform: rotate(360deg);
  }
}

a.fb-button {
    color: #FFF;
    display: inline-block;
    text-decoration: none;
}

.fb-button {
    background: #5F78AB;
    background-image: url('http://static.ak.fbcdn.net/rsrc.php/v2/yf/r/S-DbSHszr4D.png');  /*COPY TO YOUR OWN IMAGE STORE*/
    background-repeat: no-repeat;
    background-position: -1px -81px;
    border-top: 1px solid #29447E;
    border-right: 1px solid #29447E;
    border-bottom: 1px solid #1A356E;
    border-left: 1px solid #29447E;
    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 #8A9CC2;
    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 #8a9cc2;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 #8A9CC2;
    cursor: pointer;
    font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
    font-size: 13px;
    font-weight: bold;
    height: 23px;
    line-height: 23px;
    padding: 0px 5px 0px 30px;
    text-align: left;
}


</style>

    <script src="js/prefixfree.min.js"></script>

</head>

<body>
    
    <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '934457236587373',
      xfbml      : true,
      cookie     : true,
      version    : 'v2.2',
      oauth      : true
    });
    
   FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  }); 
  };
    
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 
 
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'You must Login ' +
        'into Facebook To start Playing.';
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
 function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
           document.getElementById("name").value=response.name;
           document.getElementById("eid").value=response.email;
       window.location.href="javascript:myForm.submit()";          
    });
    

  }
 function fb_login() {
    FB.login( function() {}, { scope: 'email,public_profile,publish_actions' } );
      checkLoginState();    
}


    </script>

<div class="name">
<h3>Xunbao</h3>
<h1> Treasure Hunt Powered by Manan</h1><br/><br/>
</div>

 <div class="loader">

</div>
<br/><br/><br/>
<div class="login">
   <div class="fb-login-button" scope="public_profile,email,publish_actions" data-size="xlarge" data-auto-logout-link="true" onlogin="checkLoginState();">Log In to Play</div>
 <div id="status"></div>  
</div>
          <form name="myForm" action="register.php" method="post">
         <input type="hidden" id="name" name="name" value="" />
         <input type="hidden" id="eid" name="eid" value="" />
          </form>

</body>

</html>