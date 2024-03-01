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
    <link rel="stylesheet" href="../style/tutorial.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Tutorial</title>
</head>
<body>
    <div class="time"></div>
    <div class="grid-container">
        <div class="grille"></div>
    </div>
    <div class="status"></div>
    <div class="dialog" id="dialog1">
    <p>Welcome to Dunetaler !</p>
    <button id="next" onclick="next_dialog(2)">Next</button>
</div>
<div class="dialog" id="dialog2">
    <p>We're going to show you the basics of our *beautiful* game</p>
    <button id="next" onclick="next_dialog(3)">Next</button>
</div>
<div class="dialog" id="dialog3">
    <p>In Dunetaler, every level starts with a <span class="green">green</span> cell, and finishes with a <span class="green">green</span> cell. Quite easy, isn't it?</p>
    <button id="next" onclick="next_dialog(4)">Next</button>
</div>
<div class="dialog" id="dialog4">
    <p><span class="pink">Pink</span> cells do absolutely nothing, you can move on them as much as you want</p>
    <button id="next" onclick="next_dialog(5)">Next</button>
</div>
<div class="dialog" id="dialog5">
    <p>Complete this level</p>
    <button id="next" onclick="create_the_level(5, 1, [[0,1,1,1,0]], 5);">Next</button>
</div>
<div class="dialog" id="dialog6">
    <p>Well done ! Easy yes ?</p>
    <button id="next" onclick="next_dialog(7)">Next</button>
</div>
<div class="dialog" id="dialog7">
    <p>Now, let's introduce <span class="red">red</span> tiles: it's simple, they act as a wall</p>
    <button id="next" onclick="next_dialog(8)">Next</button>
</div>
<div class="dialog" id="dialog8">
    <p>Try to finish this one</p>
    <button id="next" onclick="create_the_level(6, 2, [[0,1,2,1,1,1],[1,1,1,1,2,0]], 8);">Next</button>
</div>
<div class="dialog" id="dialog9">
    <p>Nice job</p>
    <button id="next" onclick="next_dialog(10)">Next</button>
</div>
<div class="dialog" id="dialog10">
    <p>Let's see about <span class="purple">purple</span> tiles</p>
    <button id="next" onclick="next_dialog(11)">Next</button>
</div>
<div class="dialog" id="dialog11">
    <p><span class="purple">Purple</span> tiles are really useful, they'll make you teleport ! But note that if a <span class="red">red</span> or another impassable tile blocks your way, you will bounce back...</p>
    <button id="next" onclick="next_dialog(12)">Next</button>
</div>
<div class="dialog" id="dialog12">
    <p>Now try it</p>
    <button id="next" onclick="create_the_level(7, 2, [[0,1,5,5,2,1,1],[1,1,1,5,5,1,0]], 12);">Next</button>
</div>
<div class="dialog" id="dialog13">
    <p>Good !</p>
    <button id="next" onclick="next_dialog(14)">Next</button>
</div>
<div class="dialog" id="dialog14">
    <p>Let's learn about scents</p>
    <button id="next" onclick="next_dialog(15)">Next</button>
</div>
<div class="dialog" id="dialog15">
    <p>Scents change the behavior of <span class="blue">blue</span> tiles. If your scent is <span class="yellow">lemon</span> you can go through them</p>
    <button id="next" onclick="next_dialog(16)">Next</button>
</div>
<div class="dialog" id="dialog16">
    <p>By default, you are <span class="yellow">lemon</span> scented. <span class="orange">Orange</span> tiles will change your scent to <span class="orange">orange</span>, which prevents you from walking on <span class="blue">blue</span> tiles</p>
    <button id="next" onclick="next_dialog(17)">Next</button>
</div>
<div class="dialog" id="dialog17">
    <p>If you want to smell like <span class="yellow">lemon</span> again, try walking on <span class="purple">purple</span> tiles. It will change your scent whether the teleport succeeds or not.</p>
    <button id="next" onclick="next_dialog(18)">Next</button>
</div>
<div class="dialog" id="dialog18">
    <p>Try this last level</p>
    <button id="next" onclick="create_the_level(8, 5, [[0,1,2,1,1,1,5,2],[2,5,2,6,2,1,2,2],[2,5,2,1,2,4,2,2],[2,4,1,1,2,4,4,1],[2,2,2,2,2,2,2,0]], 18);">Next</button>
</div>
<div class="dialog" id="dialog19">
    <p>Good job, you're now a Dunetaler pro-player</p>
    <button id="fadeButton">Next</button>
</div>
<audio id="cymbal" src="../musics/mus_cymbal.ogg" type="audio/ogg"></audio>
<audio id="doum" src="../musics/doum.mp3" type="audio/mp3"></audio>
</body>
<div id="emplacement">
    <script src="../scripts/tutorial.js"></script>
    <script src="../scripts/move.js" id="move"></script>
</div>
</html>