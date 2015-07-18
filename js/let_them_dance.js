var ltd=function(){//ltd=let them dance
	var ctx;//context
	if (typeof AudioContext!="undefined") {
		ctx=new AudioContext();//refer to audio api by w3c
	}
	else if(typeof webkitAudioContext!="undefined"){
		ctx=new webkitAudioContext();
	}
	else//audio api not supported
	{
		$('#dancingbars').hide();
		return ;
	}
	//http://creativejs.com/resources/requestanimationframe/
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    var analyser=ctx.createAnalyser();//create analyser
    analyser.fftsize=64;//fft is fast fourier transform
    var frequencyData=new Uint8Array(analyser.frequencyBinCount);//frequencyBinCount is exactly half of fftsize
    var dancingbars=$('#dancingbars');
    var barSpacingPercent=100/analyser.frequencyBinCount;
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
    	$("<div/>").css("left",i*barSpacingPercent+"%").appendTo(dancingbars);

    }
    var bars=$("#dancingbars > div");
    bars.each(function(index,bar){
    	bar.style.right=index*0.8+'%';
    });
    //here goes magic
    function update()
    {
    	analyser.getByteFrequencyData(frequencyData);
    	bars.each(function(index,bar){
    		bar.style.height=frequencyData[index+3]/2+'px';
    	});
    };
    // Hook up the audio routing...
    // player -> analyser -> speakers
	// (Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4)
    $("#player").bind('canpplay', function() {
        console.log("Ready to play");
        var source = ctx.createMediaElementSource(this);
        source.connect(analyser);
        analyser.connect(ctx.destination);
    });
    //document.getElementById('player').play();
        //alert("yes!");
    setInterval(update,1000/16);
};
document.getElementById('player').play();
ltd();
$('#player').trigger("canpplay");