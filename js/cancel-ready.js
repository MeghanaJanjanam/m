function cancelMap() {
    setTimeout(function() {
        window.location.href=window.location.href;
    },800);
}

var popup=document.getElementById("greaterthan-pop-up");
var popup2=document.getElementById("lessthan-pop-up");

function show() {
    popup.style.display="block";
}
function hide() {
    popup.style.display="none";
}

function show2() {
    popup2.style.display="block";
}
function hide2() {
    popup2.style.display="none";
}

function proceedMap() {
    setTimeout(function() {
        var dis=parseFloat(document.getElementById("arial").innerHTML);
        if(dis>30) {
            setTimeout(function() {
                popup.style.display="block";
                for(var i=500;i<=10000;i+=1000) {
                    setTimeout('hide()',i+500);
                    setTimeout('show()',i);
                }
                popup.style.display="none";
                setTimeout(function() {
                    // window.location.href=window.location.href;
                    popup.style.display="none";
                    navigator.geolocation.getCurrentPosition(success);
                }, 11000);
            },0);
        }
        if(dis<=30) {
            document.getElementById("search-form").style.display="none";
            document.getElementById("distance").innerHTML=dis.toFixed(2)+" KM";
            document.getElementById("time").innerHTML=parseInt((dis*60)/100)+1+" MIN";
            document.getElementById("buttons").style.display="none";
            document.getElementById("distance-and-time").style.display="block";
            setTimeout(function() {
                document.getElementById("slide-to-takeoff").style.display="block";
            }, 2500);
        }
    },800);
}

function proceedMap2() {
    setTimeout(function() {
        document.getElementById("MyMapLOC").style.pointerEvents="none";
        document.getElementById("MapRoute").style.pointerEvents="none";
        var dis=parseFloat(document.getElementById("arial").innerHTML);
        document.getElementById("distance").innerHTML=dis.toFixed(2)+" KM";
        document.getElementById("time").innerHTML=parseInt((dis/100)*60)+" MIN";
        document.getElementById("buttons").style.display="none";
        document.getElementById("distance-and-time").style.display="block";
        setTimeout(function() {
            document.getElementById("slide-to-takeoff").style.display="block";
        }, 2500);
    },800);
}