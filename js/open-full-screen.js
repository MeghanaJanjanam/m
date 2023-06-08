let myDocument = document.documentElement;
let btn = document.getElementById("full");

btn.addEventListener("click", ()=>{
    if(btn.value == "FullScreen"){
        if (myDocument.requestFullscreen) {
            myDocument.requestFullscreen();
        } 
        else if (myDocument.msRequestFullscreen) {
            myDocument.msRequestFullscreen();
        } 
        else if (myDocument.mozRequestFullScreen) {
            myDocument.mozRequestFullScreen();
        }
        else if(myDocument.webkitRequestFullscreen) {
            myDocument.webkitRequestFullscreen();
        }
        btn.value = "ExitFullscreen";
        btn.style.backgroundImage="url(images/exit-full-screen.png)";
    }
    else{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if(document.msexitFullscreen) {
            document.msexitFullscreen();
        }
        else if(document.mozexitFullscreen) {
            document.mozexitFullscreen();
        }
        else if(document.webkitexitFullscreen) {
            document.webkitexitFullscreen();
        }
        // btn.innerText = "FullScreen";//
        btn.value = "FullScreen";
        btn.style.backgroundImage="url(images/fullscreen-new.png)";
    }
});