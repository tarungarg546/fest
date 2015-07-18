(function(){
	//alert("here");
	$('.fa').each(function(){
		var $this=$(this);
		var	link=$this.data('send-to');
		//console.log(link);
		$this.on('click',function(){
			//alert('herre');
			//console.log('link');
			window.open(link,'_blank');
		});
	});
})();