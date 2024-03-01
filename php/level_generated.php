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
    <link rel="stylesheet" href="../style/level_generated.css">
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
        $tab_grille = file_get_contents('../fichiers_txt/test.txt');
        $nb_ligne = $_GET["nb_ligne"];
        $nb_col = $_GET["nb_col"];
        echo "<script>";
        echo "const nb_ligne = $nb_ligne;";
        echo "const nb_col = $nb_col;";
        echo "const tab_grille = $tab_grille;";
        echo "</script>";
    ?>
    <div id="dialog">
        <p>You finished the level</p>
        <a href="list_levels.php">Go back to level list</a>
        <form id="time_form" action="save_level_generated.php" method="post">
            <input type="hidden" name="array_grid" id="array_level" value="<?php echo $tab_grille ?>">
            <input type="hidden" name="nb_col" id="nb_col" value="<?php echo $nb_col ?>">
            <input type="hidden" name="nb_ligne" id="nb_ligne" value="<?php echo $nb_ligne ?>">
            <input type="submit" value="Save" name="Save">
        </form>
    </div>
</body>
<script src="../scripts/level_play.js"></script>
</html>