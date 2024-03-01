<?php
    session_start();//démarrage de session
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();

    try
    {
        require_once "connect_bdd.php";//connexion base de donnée

        $id_user = $_SESSION["player"]["id"];//on récupère la variable de session de l'id du joueur

        $req = $conn->prepare("SELECT * FROM players WHERE id=:id_user");//on récupère les données de la base en fonction de l'id
        $req->execute(array(
            ':id_user' => $id_user
        ));

        $result = $req->fetch();//on récupère le résultat

        // on récupère le tableau du résultat
        $username = $result['username'];
        $email = $result['email'];
        $mdp = $result['mdp'];
    }
    catch(Exception $e) //en cas d'erreur
    {
        die("Erreur : " . $e->getMessage());
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/modifier_cmpt.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Modify Profile</title>
</head>
<body>
        <p id="exit">
            Press <button onclick="history.back()" id="boutonesc">esc</button>
            <br>
            to go back
        </p>
    <div class="container">
        <p> Edit account informations </p>
        <form method="post" action="update_account.php" class="form">
            <span>Username : </span><input type="text" name="username" id="username" value="<?php echo $username ?>">
            <br>
            <span>Mail : <input type="email" name="email" id="email" value="<?php echo $email ?>"></span>
            <br>
            <label for="mdp_change">I want to change my password</label>
            <input type="checkbox" name="mdp_change" id="mdp_change">
            <br>
            <span>New Password : <input type="mdp" name="mdp" id="mdp" placeholder="Password" disabled></span>
            <br>
            <input type="submit" value="Modify" name="Modifier" id="bouton">
            <?php
            if(isset($_GET['username_error'])){
                echo "<section style='color: red'>Username already in use, please try another</section>";
            }
            if(isset($_GET['email_error'])){
                echo "<section style='color: red'>Email already in use, please try another</section>";
            }
            ?>
        </form>
    </div>
</body>
<script src="../scripts/activate_password_change.js"></script>
<script>
  document.addEventListener('keydown', function(event) {
      if(event.keyCode == 27) {
          history.back();
      }
  });
</script>
</html>