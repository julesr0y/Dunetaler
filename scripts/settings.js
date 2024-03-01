window.onload = function () {
  var resolution = screen.width + "x" + screen.height;
  document.getElementById("resolution").innerHTML = resolution;
};

function checkWindowMode() {
  var isFullscreen = window.innerWidth === screen.width && window.innerHeight === screen.height;
  var isMaximized = window.innerWidth === window.screen.availWidth && window.innerHeight === window.screen.availHeight;
  var isMinimized = document.visibilityState === "hidden";

  var modeMessage = document.getElementById("window-mode");

  if (isFullscreen) {
      modeMessage.innerHTML = "FullScreen";
  } else if (isMaximized) {
      modeMessage.innerHTML = "MaxScreen";
  } else if (isMinimized) {
      modeMessage.innerHTML = "MinScreen";
  } else {
      modeMessage.innerHTML = "Windowed";
  }
}

window.addEventListener("resize", checkWindowMode);
window.addEventListener("load", checkWindowMode);
document.addEventListener("visibilitychange", checkWindowMode);

function setVolume() {
  var volume = document.getElementById("volume").value;
  var volumeFill = document.getElementById("volume-fill");
  volumeFill.style.width = volume + "%";
}

function setMusicVolume() {
  var volume = document.getElementById("music_volume").value;
  var player = document.getElementById("player");
  player.volume = volume / 100; // Convertir la valeur de 0-100 en plage de volume 0.0-1.0
  
  // Enregistrer le volume dans un cookie avec une durée d'un an
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // Durée d'un an en millisecondes
  var expires = "expires=" + date.toUTCString();
  document.cookie = "musicVolume=" + volume + "; " + expires;
}

// Fonction pour récupérer la valeur du cookie "musicVolume"
function getMusicVolume() {
  var name = "musicVolume" + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

var musicVolume = getMusicVolume();
if (musicVolume) {
  document.getElementById("music_volume").value = musicVolume;
  setMusicVolume();
}

var friskImage = document.getElementById('frisk_front');

var positionX = -52;
var positionY = 10;

function updatePosition() {
friskImage.style.left = positionX + 'px';
friskImage.style.top = positionY + 'px';
}


function handleKeyPress(event) {
var key = event.keyCode;

// Touche flèche vers le bas
if (key === 40) {
  positionY += 10;
  friskImage.src = '../img/frisk_front.webp';
}

// Touche flèche vers le haut
if (key === 38) {
  positionY -= 10;
  friskImage.src = '../img/frisk_up.webp';
}

// Touche flèche vers la gauche
if (key === 37) {
  positionX -= 10;
  friskImage.src = '../img/frisk_left.webp';
}

// Touche flèche vers la droite
if (key === 39) {
  positionX += 10;
  friskImage.src = '../img/frisk_right.webp';
}

updatePosition();
}

document.addEventListener('keydown', handleKeyPress);