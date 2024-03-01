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
    <link rel="stylesheet" href="../style/level.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Level</title>
</head>
<body>
    <div id="timer">00:00</div>
    <div class="grid-container">
        <div class="grille"></div>
    </div>
    <div class="status"></div>
    <?php
    if(isset($_GET["nb"])){
        try{
            require_once 'connect_bdd.php';
            $req = $conn->prepare("SELECT * FROM campaign WHERE id=:nb_level");
            $req->execute(
                array(
                    ':nb_level' => $_GET["nb"]
                )
            );
            $result = $req->fetch(PDO::FETCH_ASSOC);
    ?>
    <script>
        var tab_grille = <?php echo $result["array"] ?>;
        var nb_col = <?php echo $result["nb_col"] ?>;
        var nb_ligne = <?php echo $result["nb_ligne"] ?>;
    </script>
    <?php
        }
        catch(Exception $e) //en cas d'erreur
        {
            die("Erreur : " . $e->getMessage());
        }
    }
    ?>
    <div id="dialog">
        <p>You finished the level</p>
        <button id="next" onclick="submit_time();">Go back to level list</button>
    </div>
    <form id="time_form" action="save_time.php" method="post">
        <input type="hidden" name="Score_time" id="score_time">
        <input type="hidden" name="id_level" value="<?php echo $_GET['nb'] ?>">
    </form>
</body>
<script src="../scripts/timer.js"></script>
<script src="../scripts/level_play.js"></script>
</html>