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
    <link rel="stylesheet" href="../style/campaign.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Campaign</title>
</head>
<body>
    <p id="exit">
        Press <input type="button" id="boutonesc" onclick="window.location.href='start.php';" value="esc"/>
        <br>
        to go back
    </p>
    <h2>Campaign mode</h2>
    <div class="levels">
        <a href="list_levels_online.php">User made levels</a>
        <br>
        <a href="tutorial.php" style="color: green;">Tutorial</a>
        <br>
        <?php
        try{
            require_once 'connect_bdd.php'; //connexion à la bdd
            $req = $conn->prepare("SELECT * FROM campaign"); //requête préparée pour récupérer les niveaux de l'utilisateur
            $req->execute();
            $result = $req->fetchAll();
            foreach($result as $id_level){
                $echo_level_id = $id_level["id"];
                echo "<a class='liste_levels' href='level.php?nb=$echo_level_id'>Level $echo_level_id</a><br>";
            }
        }
        catch(Exception $e) //en cas d'erreur
        {
            die("Erreur : " . $e->getMessage());
        }
        ?>
    </div>
</body>
<script>
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      window.location.href = "start.php";
    }
  });
</script>
</html>