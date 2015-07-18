if(typeof angular == 'undefined' )
{
	alert("Angular not supported");
}
else
{
	//alert("good");
}
var myapp = angular.module("fest", ['ngRoute','ngResource','ngAnimate']);	
console.log("ok");
myapp.controller("homeController", function ($scope)
{
	//alert("here");
	//document.getElementById("homepage-logo").src = 'images/zwhite.png';//'data:image/png;base64,' + homeimage;
	$scope.id = "hahah";
	$("#logospan").css({"display":"block"});
});
myapp.controller("eventController",function ($scope)
{
	console.log("fu**");
	$scope.id = "asdsa";
	$("#logospan").css({"display":"block"});
});
myapp.controller("galleryController",function($scope)
{
	$scope.id = "nothing";
	$("#logospan").css({"display":"block"});
});

myapp.controller("sponsorsController",function($scope)
{
	$scope.id = "nothing";
	$("#logospan").css({"display":"block"});
});

myapp.controller("aboutController",function($scope)
{
	$scope.id = "nothing";
	$("#logospan").css({"display":"block"});
});

myapp.config(['$routeProvider',function($routeProvider)
{
	$routeProvider.
	when
	('/',
	{
		templateUrl: "homepage.html",
		controller: "homeController"
	}).
	when
	('/events',
	{
		templateUrl : "events.php",
		controller : "eventController"
	}).
	when
	('/sponsors',
	{
		templateUrl : "sponsors.html",
		controller : "sponsorsController"
	}).
	when
	('/contact',
	{
		templateUrl : "contact.html",
		controller : "sponsorsController"
	}).
	when
	('/gallery',
	{
		templateUrl : "gallery.html",
		controller : "galleryController"
	}).
	when
	('/about',
	{
		templateUrl : "about.html",
		controller : "aboutController"
	}).
	otherwise
	({
		redirectTo: '/'
	});
}]);
	