<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/start.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Main</title>
</head>
<body>
    <div class="container">
        <div class="time">Dunetaler</div>
        <div class="rules"><a href="rules.html" style="color: orange;">Rules</a></div>
        <div class="map"><a href="list_levels.php">Map maker</a></div>
        <div class="continue"><a href="campaign.php">Campaign</a></div>
        <div class="disconnect"><a href="deconnect.php">Disconnect</a></div>
        <div class="account"><a href="profil.php">Account</a></div>
        <div class="settings"><a href="setting.html" style="color: pink;">Settings</a></div>
        <div class="score"><a href="classement.php">Score</a></div>
        <div class="nom"><?php echo $_SESSION["player"]["username"] ?></div>
        <div class="player"><img src="../img/frisk_front.webp" alt="Player" class="player_img"></div>
    </div>
    <audio id="audio" autoplay loop >
        <source src="../musics/start.ogg" type="audio/ogg">
    </audio>
</body>
<script>
    function getCookie(name) {
        var cookieArr = document.cookie.split(";");

        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");

            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        return null;
    }

    // Récupérer la valeur du volume à partir du cookie
    var volume = getCookie("musicVolume");

    // Appliquer la valeur du volume à l'élément audio
    var audioElement = document.getElementById("audio");
    audioElement.volume = volume / 100;

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            history.back();
        }
    });
</script>
</html>