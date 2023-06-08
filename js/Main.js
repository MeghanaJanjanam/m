if (navigator.geolocation) {  
    navigator.geolocation.getCurrentPosition(success); 
} else {  
    alert("There is Some Problem on your current browser to get Geo Location!");  
}  
var map;
function pan()
{
    document.getElementById("MapRoute").style.display="block";
    document.getElementById("MyMapLOC").style.display="none";
    navigator.geolocation.getCurrentPosition(success);
    // window.location.href=window.location.href;
}

function success(position) {  
    document.getElementById("MapRoute").style.display="none";
    document.getElementById("MyMapLOC").style.display="block";
    var lat = position.coords.latitude;  
    var long = position.coords.longitude;  
    // var city = position.coords.locality;  
    var LatLng = new google.maps.LatLng(lat, long);  
    var mapOptions = {  
        center: LatLng,  
        zoom: 11,  
        mapTypeId: google.maps.MapTypeId.ROADMAP  
    };  

    var map = new google.maps.Map(document.getElementById("MyMapLOC"), mapOptions);  
    var marker = new google.maps.Marker({  
        position: LatLng,  
        animation: google.maps.Animation.BOUNCE,
        title: "Latitude: " + lat + " Longitude: " + long  
    });  

    marker.setMap(map);  
    var circle = new google.maps.Circle({
        fillColor: '#ffffff',
        fillOpacity: .2,
        strokeWeight: 2,
        strokeColor: '#006600',
        draggable: false,
        editable: false,
        // map: map,
        center: LatLng,
        radius: 30000,
        clickable:false
    });
    circle.setMap(map);
    var getInfoWindow = new google.maps.InfoWindow({ content: "<b>Your Current Location</b><br/> Latitude:" +  
                            lat + "<br /> Longitude:" + long + ""  
    });  
    getInfoWindow.open(map, marker);  
    setTimeout(function(){getInfoWindow.close();},'2000');
    var t = document.getElementById("destination-box").value;
    if(t=="")
    {
        var path = new google.maps.MVCArray();
        var mark = new Array();
        mark.push(marker);
        path.push(LatLng);
        map.addListener("click",(e) => {
            placeMarkerAndPanTo1(e.latLng,map,mark,path);
        });
    }
}  
 
function distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
var mark=new Array();
var path = new google.maps.MVCArray();  
function initMap(){
    setTimeout(function() {
        navigator.geolocation.getCurrentPosition(called);
    },800);
}
function openMultipleDestination() {
    setTimeout(function() {
        navigator.geolocation.getCurrentPosition(called);
    },800);
}
function called(position)
{
    document.getElementById("destination-type").style.display="none";
    document.getElementById("MyMapLOC").style.opacity=1;
    document.getElementById("legends").style.display="flex";
    document.getElementById("pimg").style.opacity=1;
    document.getElementById("destination-box").style.display="none";
    document.getElementById("button2").style.display="block";
    document.getElementById("MyMapLOC").style["pointer-events"]="auto";
    var mark=new Array();
    var path = new google.maps.MVCArray(); 
    // document.getElementById("MapRoute").style.display = 'none';
    document.getElementById("MyMapLOC").style.display = "block";     
    var lat = position.coords.latitude;  
    var long = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, long);
    path.push(latlng);
    // alert(latlng);
    var map = new google.maps.Map(document.getElementById("MyMapLOC"),{
        zoom: 10,
        center: latlng,
    });
    var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.BOUNCE
    });
    var circles=[]; /* added */
    var circle = new google.maps.Circle({
        fillColor: '#ffffff',
        fillOpacity: .2,
        strokeWeight: 2,
        strokeColor: '#006600',
        draggable: false,
        editable: false,
        // map: map,
        center: latlng,
        radius: 30000,
        clickable:false
    });
    circle.setMap(map);
    circles.push(circle); /* added */
    // alert(latlng);
    marker.setMap(map);
    mark.push(marker);
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map,mark,path,circles);
    });
}

function placeMarkerAndPanTo(place, map,mark,path,circles) {
    var dist=0;
    var flag=1;
    var marker = new google.maps.Marker({
        position: place,
        animation: google.maps.Animation.DROP
    });
    // alert(place);
    // alert(path[0].lat());

    path.push(place);

    for (var i=0;i<path.length-1;i++)
    {
        var x1=path.getArray()[i].lat();
        var y1=path.getArray()[i].lng();
        var x2=path.getArray()[i+1].lat();
        var y2=path.getArray()[i+1].lng();
        var d=distance(x1,y1,x2,y2);
        if (d>30)
        {
            document.getElementById("arial").innerHTML="";
            popup.style.display="block";
            for(var i=500;i<=10000;i+=1000) {
                setTimeout('hide()',i);
                setTimeout('show()',i+500);
            }
            popup.style.display="none";
            setTimeout(function() {
                // window.location.href=window.location.href;
                popup.style.display="none";
                navigator.geolocation.getCurrentPosition(called);
            }, 11000);
            var flag=0;
            break;
        }
        dist+=d;
    }

    if(flag==1) {
        marker.setMap(map);
        mark.push(marker);
        document.getElementById("button5").style.display="block";
        document.getElementById("button4").style.display="block";
        var poly = new google.maps.Polyline({
            path:path,
            strokeColor: '#4986E7',
        });
        poly.setMap(map);
        // alert(path.length);
        // poly.setPath(path);
        var arial=document.getElementById("arial");
        arial.innerHTML=dist;
        map.panTo(place);
        var circle = new google.maps.Circle({
            fillColor: '#ffffff',
            fillOpacity: .2,
            strokeWeight: 2,
            strokeColor: '#006600',
            draggable: false,
            editable: false,
            // map: map,
            center: place,
            radius: 30000,
            clickable:false
        });
        for(var i=0;i<circles.length;i++) {
            circles[i].setMap(null);
        }
        circles.push(circle);
        circle.setMap(map);
    }
}

function placeMarkerAndPanTo1(place, map,mark,path) {
    var dist=0;
    var marker = new google.maps.Marker({
        position: place,
        animation: google.maps.Animation.DROP
    });
    if(path.length<2){
        path.push(place);
        map.panTo(place); /* added */
        marker.setMap(map);
        mark.push(marker);
        var poly = new google.maps.Polyline({
            path:path,
            strokeColor: '#4986E7',
        });
        poly.setMap(map);
        var i=0;
        var x1=path.getArray()[i].lat();
        var y1=path.getArray()[i].lng();
        var x2=path.getArray()[i+1].lat();
        var y2=path.getArray()[i+1].lng();
        dist+=distance(x1,y1,x2,y2);
        var arial=document.getElementById("arial");
        arial.innerHTML=dist;
        var lat1=(x1+x2)/2;
        var long1=(y1+y2)/2;
        var latlng=new google.maps.LatLng(lat1,long1);
        map.panTo(latlng);
        if(dist>50)
        {
            map.setZoom(9);
        }
        else 
        {
            map.setZoom(11);
        }
        document.getElementById("button1").style.display="block";
        document.getElementById("button3").style.display="block";
        var circle = new google.maps.Circle({
            fillColor: '#ffffff',
            fillOpacity: .2,
            strokeWeight: 2,
            strokeColor: '#006600',
            draggable: false,
            editable: false,
            // map: map,
            center: LatLng,
            radius: 30000,
            clickable:false
        });
        circle.setMap(map);
    }
}

function deleteMap() {
    setTimeout(function() {
        var t=document.getElementById("destination-box").value;
        if(t=="")
        {
            navigator.geolocation.getCurrentPosition(success);
        }
        else 
        {
            SearchRoute();
        }
    },800);
}

function SearchRoute() {  
    document.getElementById("MapRoute").style.display = 'block';
    document.getElementById("MyMapLOC").style.display = 'none';  

    var markers = new Array();  
    var myLatLng;  

    //Find the current location of the user.  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(function(p) {  
            var myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);  
            var m = {};  
            m.title = "Your Current Location";  
            m.lat = p.coords.latitude;  
            m.lng = p.coords.longitude;  
            markers.push(m);  

            //Find Destination address location.  
            var address = document.getElementById("destination-box").value;  
            var geocoder = new google.maps.Geocoder();  
            geocoder.geocode({ 'address': address }, function(results, status) {  
                if (status == google.maps.GeocoderStatus.OK) {  
                    m = {};  
                    m.title = address;  
                    m.lat = results[0].geometry.location.lat();  
                    m.lng = results[0].geometry.location.lng();  
                    markers.push(m);  
                    var mapOptions = {  
                        center: myLatLng,  
                        zoom: 4,  
                        mapTypeId: google.maps.MapTypeId.ROADMAP  
                    };  
                    var map = new google.maps.Map(document.getElementById("MapRoute"), mapOptions);  
                    var infoWindow = new google.maps.InfoWindow();  
                    var lat_lng = new Array();  
                    var latlngbounds = new google.maps.LatLngBounds();  
                    
                    // for (i = 0; i < 1; i++) {
                    for (i = 0; i < markers.length; i++) {  
                        var data = markers[i];  
                        // alert(data);
                        var myLatlng = new google.maps.LatLng(data.lat, data.lng);  
                        lat_lng.push(myLatlng); 
                        if (i==0)
                        { 
                            var marker = new google.maps.Marker({  
                                position: myLatlng,  
                                map: map,  
                                title: data.title ,
                                animation: google.maps.Animation.BOUNCE 
                            }); 
                            map.setCenter(new google.maps.LatLng(myLatLng));
                            latlngbounds.extend(marker.position);  
                            (function(marker, data) {  
                                google.maps.event.addListener(marker, "click", function(e) {  
                                    infoWindow.setContent(data.title);  
                                    infoWindow.open(map, marker);  
                                });  
                            })(marker, data);
                        }  
                    }  
                    map.setCenter(latlngbounds.getCenter());  
                    map.fitBounds(latlngbounds);  

                    //***********ROUTING****************//  

                    //Initialize the Path Array.  
                    var path = new google.maps.MVCArray(); 
                    var mark = new Array();
                    // var path = new google.maps.MVCArray();  

                    //Getting the Direction Service.  
                    var service = new google.maps.DirectionsService();  

                    // //Set the Path Stroke Color.  
                    // var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });  

                    var xx=0;
                    // map.setCenter();
                    //Loop and Draw Path Route between the Points on MAP.  
                    for (var i = 0; i < lat_lng.length; i++) {  
                        if ((i + 1) < lat_lng.length) {  
                            var src = lat_lng[i];  
                            var des = lat_lng[i + 1];  
                            path.push(src);  
                            // poly.setPath(path);  
                            service.route({  
                                origin: src,  
                                destination: des,  
                                travelMode: google.maps.DirectionsTravelMode.DRIVING  
                            }, function(result, status) {  
                                if (status == google.maps.DirectionsStatus.OK) {  
                                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {  
                                        xx++;
                                        //path.push(result.routes[0].overview_path[i]);  
                                    }
                                    var leng=result.routes[0].overview_path.length;
                                    const origin=result.routes[0].overview_path[0];
                                    const destination=result.routes[0].overview_path[leng-1];
                                    map.setCenter(destination);
                                    map.setZoom(11);
                                    var m1 = new google.maps.Marker({  
                                        position: src,  
                                        // map: map,  
                                        title: src.title  
                                    }); 
                                    mark.push(m1);
                                    map.addListener("click", (e) => {
                                        placeMarkerAndPanTo1(e.latLng, map,mark,path);
                                    });
                                } else {  
                                    alert("Invalid location.");  
                                    window.location.href = window.location.href; 
                                }  
                            });  
                        }  
                    }  
                } else {  
                    alert("Request failed.");   
                    window.location.href = window.location.href; 
                }  
            });  

        });  
    }  
    else {  
        alert('Some Problem in getting Geo Location.');  
        return;  
    }  
} 

