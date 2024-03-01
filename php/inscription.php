<?php
    session_start();//démarrage de session
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
    <link rel="stylesheet" href="../style/inscription.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Sign Up</title>
</head>
<body>
        <p id="exit">
            Press <button onclick="history.back()" id="boutonesc">esc</button>
            <br>
            to go back
        </p>
    <div class="container">
        <P id="new">New to Dunetaler ? let's begin ! </P>
        <form method="post" action="script_inscription.php" class="form">
            <label id="iduser">Username : <input type="text" name="username" class="username" required></label>
            <?php
            if(isset($_GET['username_error'])){
                echo "<section style='color: red'>Username already in use, please try another</section>";
            }
            ?>
            <label id="idmail">Email : <input type="email" name="email" class="email"></label>
            <?php
            if(isset($_GET['email_error'])){
                echo "<section style='color: red'>Email already in use, please try another</section>";
            }
            ?>
            <label id="idmdp">Password : <input type="password" name="mdp" class="mdp"></label>
            <label id="idmdp2">Password confirmation : <input type="password" name="confirm_password" class="mdp2" required></label>
            <?php
            if(isset($_GET['password_error'])){
                echo "<section style='color: red'>Password confirmation should be the same as password</section>";
            }
            ?>
            <input type="submit" name="Inscription" value="Sign up !" class="connexion">
        </form>
    </div>
    <div class="container2">
    <p class="pasnoob">Already registered ? <a href="connexion.php" class="signin">Sign In</a></p>
    </p>
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