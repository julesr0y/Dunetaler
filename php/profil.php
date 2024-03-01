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
    <link rel="stylesheet" href="../style/profil.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Profile</title>
</head>
<body>
    <p id="exit">
        Press <button onclick="history.back()" id="boutonesc">esc</button>
        <br>
        to go back
    </p>
    <form class="form">
        <p>Dunetaler</p>
        <div>Your account : <a href="modifier_cmpt.php">Edit your informations</a></div>
        <br>
        <div>Username : <span class="retour"><?php echo $_SESSION["player"]["username"];?></span></div>
        <br>
        <div>Email : <span class="retour"><?php echo $_SESSION["player"]["email"];?></span></div>
        <br>
    </form>
    <a id="deconnect" href="deconnect.php">Disconnect</a>
</body>
<script>
  document.addEventListener('keydown', function(event) {
      if(event.keyCode == 27) {
          history.back();
      }
  });
</script>
</html>