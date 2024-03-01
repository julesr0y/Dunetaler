/*const timeline = gsap.timeline({repeat : -1})
timeline.to("#frisk", {y: 0 ,duration: 2, ease: "none" ,rotation: 90})
timeline.to("#frisk", {x:0 ,duration: 5, ease: "none" ,rotation: 180})
timeline.to("#frisk", {y:0,duration: 2, ease: "none" ,rotation: 270})
timeline.to("#frisk", {x:0,duration: 5, ease: "none" ,rotation: 360})
*/

window.addEventListener("load", function() {
    document.getElementById("popup").style.display = "none";
  });
  
  document.getElementById("openPopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("audioPlayer").src = "../musics/accueil.ogg";
    document.getElementById("audioPlayer").play();
    document.getElementById("openPopup").style.display = "none"; 
  });
  
  document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("openPopup").style.display = "block";
  });
  