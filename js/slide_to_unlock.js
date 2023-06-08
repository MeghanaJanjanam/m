$(function() {
	$("#slider").draggable({
		axis: 'x',
		containment: 'parent',
		drag: function(event, ui) {
			if (ui.position.left > 290) {
				$("#text").fadeOut();
				setTimeout(function() {
					$(".home-screen").fadeOut();
					$(".home-screen").css("display","none");
					$(".slide-2").css("display","block");
					$(".slide-2").fadeIn();
					$(".area").css("display","none");
					$("body").css("background-color","white");
					$("body").css("background-image","none");
					// $("#text").fadeIn();
			  	}, 1000);
				setTimeout(function() {
					$("#slide-to-unlock").fadeOut();
					$("#destination-type").fadeIn();
					$("#destination-type").css("display","flex");
					$("#MyMapLOC").css("opacity","0.5");
					$("#pimg").css("opacity","0.7");
				}, 0);
			} else {
			    // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
				// $("#slider-heading").css("opacity", 100 - (ui.position.left / 5));
			}
		},
		stop: function(event, ui) {
			if (ui.position.left < 295) {
				$(this).animate({
					left: 0
				})
			}
		}
	});
	
	$("#slider")[0].addEventListener('touchmove', function(event) {
	    event.preventDefault();
	    var el = event.target;
	    var touch = event.touches[0];
	    curX = touch.pageX - this.offsetLeft - 20;
	    if(curX <= 0) return;
	    if(curX > 298){
	    	$("#text").fadeOut();
			setTimeout(function() {
				$(".home-screen").css("display","none");
				$(".home-screen").fadeOut();
				$(".slide-2").css("display","block");
				$(".slide-2").fadeIn();
				$(".area").css("display","none");
				$("body").css("background-color","white");
				$("body").css("background-image","none");
				// $("#text").fadeIn();
			}, 1000);
			setTimeout(function() {
				$("#slide-to-unlock").fadeOut();
				$("#destination-type").fadeIn();
				$("#destination-type").css("display","flex");
				$("#MyMapLOC").css("opacity","0.7");
				$("#pimg").css("opacity","0.7");
			}, 0);
	    } 
		el.style.webkitTransform = 'translateX(' + curX + 'px)';
	}, false);
	
	$('#arrow-img')[0].addEventListener('touchend', function(event) {	
	    this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
	    this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
	    this.style.webkitTransform = 'translateX(0px)';
	}, false);
});
