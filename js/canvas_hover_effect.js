// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
var x,y,count=0,
	winx=$(window).width(),
	winy=$(window).height();//height and width of window element
var scx=winx/1366,
	scy=winy/768;//scale ratio
var canvas=document.getElementById('front');
var frntcntxt=canvas.getContext('2d');//to get context---canvas context is an object with properties and methods that can be used to render graphics inside canvas
var img=document.getElementById('img');
var imgcntxt=img.getContext('2d');
//set styles for both canvas
var imgURLs=[],
	imagesOK=0,
	imgs=[];
imgURLs.push("images/rand.jpg");
imgURLs.push("images/logo.png");
//var imag=document.createElement('IMG');//refer to window.images
//imag.src="images/rand.jpg";
loadAllimages();
//alert("length="+imgURLs.length);
function loadAllimages()
{
	//alert('Nope');
	for (var i = 0; i < imgURLs.length; i++) {
		var dummy=new Image();
		imgs.push(dummy);
		//alert("i="+i);
		dummy.src=imgURLs[i];
		dummy.onload=function(){
			imagesOK++;
			if(imagesOK>=imgURLs.length)
			{
				imgcntxt.drawImage(imgs[0],0,0);//0,0 is for top left corner AND draw image on image container
				stackBlr();
				//alert('No');
				//Drawimageoncanvas(imgs[0],)
			}
		};
			//Drawimageoncanvas();
	}
}
var fadeOutIndex = 0;
//alert(fadeOutIndex);
var fadeInIndex = 0;
var fadePct = 0;
function animateFade() {
    if (fadePct > 100) {
        return;
    }
    //stackBlr();
    requestAnimationFrame(animateFade);
    imgcntxt.clearRect(0,0,1366,768);
    draw(imgs[fadeInIndex], fadePct / 100);
    draw(imgs[fadeOutIndex], (1 - fadePct / 100));
    stackBlr();
    $('#front').fadeOut(400);
					//count=0;
	setTimeout(function(){
		frntcntxt.clearRect(0,0,1366,768);
		$('#front').fadeIn(0);
	},400);
    fadePct+=100;
}
function draw(img, opacity) {
	//stackBlr();
    imgcntxt.save();
    imgcntxt.globalAlpha = opacity;
    imgcntxt.drawImage(img, 0, 0);
    imgcntxt.restore();
}
animate();
function animate()
{
	//stackBlr();
    //alert(count);
    //setTimeout(animate,10000);
    setTimeout(function(){
    	requestAnimationFrame(animate);
    },10000);
	$('#backSide').mousemove(function(ev){
				ev=window.event||ev;
				if(count<1000)//if number of changes in mouse co. is less than 150
				{
					//alert('Here');
					++count;
					//obtain current pos. of mouse
					x=ev.clientX,y=ev.clientY;
					/*
       				* save() allows us to save the canvas context before
		       		* defining the clipping region so that we can return
		       		* to the default state later on
		       		*/
					frntcntxt.save();//save old state
					frntcntxt.beginPath();//begin to form new path
					/*we can draw a path and then use the clip() method of the canvas context.  Everything drawn afterwards will be bound inside the clipping region.  Once we are done drawing things inside the clipping region, we can return the canvas context to its original state with the restore() method so that further drawings are not bound to the clipping region.

					*/
					frntcntxt.arc(x/scx,y/scy,50,0,Math.PI*2);//obj.arc(centerx,centery,radius,startangle,endangle);
					frntcntxt.clip();//clip it
					frntcntxt.globalAlpha=0.1;//to set opacity of elements..0<1..0-> fully transparent 1->fully opaquer
					//console.log('inside with in='+fadeInIndex+' and out='+fadeOutIndex);
					frntcntxt.drawImage(imgs[fadeOutIndex],0,0);//clip only that arc image
					frntcntxt.restore();//save the state and make it immune from further transformation
				}
				else//now restore to original image ....here is where magic lies...LOL
				{
					$('#front').fadeOut(400);
					count=0;
					setTimeout(function(){
						frntcntxt.clearRect(0,0,1366,768);
						$('#front').fadeIn(0);
					},400);
					fadePct=0;
					if (++fadeOutIndex == imgs.length) {
        				fadeOutIndex = 0;
    				}
    				if (++fadeInIndex == imgs.length) {
        				fadeInIndex = 0;
    				}
    				//alert("wooooh! in="+fadeInIndex+'and out='+fadeOutIndex);
    				animateFade();
					//animateFade();*/
				}
		});
}
$(window).resize(function(ev){
	winx=$(window).width();
	winy=$(window).height();
	scx=winx/1366;
	scy=winy/768;
	canvas.style.width=img.style.width=winx+'px';//px is concatenated to windowY
	canvas.style.height=img.style.height=winy+'px';
});
function stackBlr()
{
//	alert('Yes');
	stackBlurCanvasRGBA('img',0,0,1920,1080,15);//stackBlurCanvasRGBA(targetCanvas, top_x, top_y, width, height, radius)
	//return ;
}