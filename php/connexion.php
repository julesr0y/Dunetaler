<?php
    session_start(); //démarrage de session
    require_once 'fonctions.php';
    cookies_exist();
    is_connected_inscription_connexion();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/connexion.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Sign In</title>
</head>
<body>
        <p id="exit">
            Press <button onclick="history.back()" id="boutonesc">esc</button>
            <br>
            to go back
        </p>
        <div class="container">
            <p class="welcome">Welcome back to Dunetaler !</p>
                <form method="post" class="form" action="script_connexion.php">
                    <label for="email" id="idemail">Email : <input type="email" name="email" id="email" required class="email"></label>
                    <br>
                    <label for="mdp" id="idmdp">Password : <input type="password" name="mdp" id="mdp" required class="mdp"></label>
                    <br>
                    <input type="submit" name="Connexion" value="Let's Play !" class="connexion">
                    <br>
                    <?php 
                    if(isset($_GET['incorrectid_error'])){
                        echo "<section style='color: red' class='error'>Email or password is incorrect</section>";
                    }
                    ?>
                </form>
        </div>
        <div class="container2">
            <p class="noob">Don't have an account ? <a href="inscription.php" class="signup">Sign Up</a></p>
        </div>
</body>
<script>
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            history.back();
        }
    });
</script>
</html>