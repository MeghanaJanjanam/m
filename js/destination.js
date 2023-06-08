function openSingleDestination() {
    setTimeout(function() {
        document.getElementById("destination-type").style.display="none";
        document.getElementById("MyMapLOC").style.opacity=1;
        document.getElementById("MyMapLOC").style["pointer-events"]="auto";
        document.getElementById("pimg").style.opacity=1;
        document.getElementById("buttons").style.opacity=1;
        document.getElementById("button2").style.display="block";
        document.getElementById("search-form").style.display="block";
        document.getElementById("legends").style.display="flex";
    },800);
}

function removeDestination() {
    document.getElementById("destination-box").value="";
}