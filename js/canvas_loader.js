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
canvas.style.width=img.style.width=winx+'px';//px is concatenated to windowY
canvas.style.height=img.style.height=winy+'px';
var imag=document.createElement('IMG');//refer to window.images
imag.src="images/rand.jpg";
$(window).resize(function(ev){
	winx=$(window).width();
	winy=$(window).height();
	scx=winx/1366;
	scy=winy/768;
	canvas.style.width=img.style.width=winx+'px';//px is concatenated to windowY
	canvas.style.height=img.style.height=winy+'px';
});
//image is drawn on canvas after it has been loaded
imag.onload=function(){
	Drawimageoncanvas();
	$('#backSide').mousemove(function(ev){
		ev=window.event||ev;
		if(count<1000)//if number of changes in mouse co. is less than 150
		{
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
			frntcntxt.drawImage(imag,0,0);//clip only that arc image
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
		}
	});
};
function Drawimageoncanvas()
{
	imgcntxt.drawImage(imag,0,0);//0,0 is for top left corner AND draw image on image container
	stackBlurCanvasRGBA('img',0,0,1920,1080,15);//stackBlurCanvasRGBA(targetCanvas, top_x, top_y, width, height, radius)
}