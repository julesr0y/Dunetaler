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
    <link rel="stylesheet" href="../style/list_levels.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Levels</title>
</head>
<body>
    <p id="exit">
        Press <input type="button" id="boutonesc" onclick="window.location.href='start.php';" value="esc"/>
        <br>
        to go back
    </p>
    <h2>List levels</h2>
    <div class="levels">
    <?php  
        try{
            require_once 'connect_bdd.php'; //connexion à la bdd
            $id_user = $_SESSION["player"]["id"]; //récupération de l'id de l'utilisateur
            $req = $conn->prepare("SELECT * FROM niveaux WHERE id_user = :id_user"); //requête préparée pour récupérer les niveaux de l'utilisateur
            $req->execute(
                array(
                    ':id_user' => $id_user
                )
            );
            $result = $req->fetchAll();
            foreach($result as $id_level){
                $echo_level_id = $id_level["id"];
                $echo_nb_col = $id_level["nb_col"];
                $echo_nb_ligne = $id_level["nb_ligne"];
                echo "<a class='liste_levels' href='concepteur_manuel.php?id_level=$echo_level_id'>Level $echo_nb_col x $echo_nb_ligne</a><br>";
            }
        }
        catch(Exception $e) //en cas d'erreur
        {
            die("Erreur : " . $e->getMessage());
        }
    ?>
    </div>
<br>
<a href="concepteur_manuel.php" style="color: red;">Create new level</a>
<br>
<a href="generateur.php" style="color: pink">Generate new level</a>
</body>
<script>
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            location.href='start.php';
        }
    });
</script>
</html>
