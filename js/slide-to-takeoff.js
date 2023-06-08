$(function() {

	$("#slider2").draggable({
		axis: 'x',
		containment: 'parent',
		drag: function(event, ui) {
			if (ui.position.left > 290) {
				$("#text3").fadeOut();
				$("#slide-to-takeoff").fadeOut();
            	$("#distance-and-time").fadeOut();
				setTimeout(function() {
					$("#lessthan-pop-up").css("display","block");
                    for(var i=500;i<=10000;i+=1000) {
						setTimeout('hide2()',i+500);
						setTimeout('show2()',i);
					}
                    $("#lessthan-pop-up").css("display","none");
                    setTimeout(function() {
                        location.href=location.href;
                    }, 10000);
			  	}, 1500);
			} else {
			    // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
				// $("#slider-heading2").css("opacity", 100 - (ui.position.left / 5))
				// $("#slider2").css("left","0");
			}
		},
		stop: function(event, ui) {
			if (ui.position.left < 290) {
				$(this).animate({
					left: 0
				})
			}
		}
	},false);
	
	// The following credit: http://www.evanblack.com/blog/touch-slide-to-unlock/
	
	$('#slider2')[0].addEventListener('touchmove', function(event) {
	    event.preventDefault();
	    var el = event.target;
	    var touch = event.touches[0];
	    curX = touch.pageX - this.offsetLeft - 20;
	    if(curX <= 0) return;
	    if(curX > 293){
	    	$("#text3").fadeOut();
			$("#slide-to-takeoff").fadeOut();
            $("#distance-and-time").fadeOut();
			setTimeout(function() {
				$("#lessthan-pop-up").css("display","block");
				for(var i=500;i<=10000;i+=1000) {
					setTimeout('hide2()',i+500);
					setTimeout('show2()',i);
				}
				$("#lessthan-pop-up").css("display","none");
				setTimeout(function() {
					location.href=location.href;
				}, 10000);
			  }, 1500);
	    }
	   	el.style.webkitTransform = 'translateX(' + curX + 'px)'; 
	}, false);
	
	$('#slider2')[0].addEventListener('touchend', function(event) {	
	    this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
	    this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
	    this.style.webkitTransform = 'translateX(0px)';
	}, false);
});
