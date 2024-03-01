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
    <link rel="stylesheet" href="../style/test_mode.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Test your level</title>
</head>
<body>
    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            file_put_contents("../fichiers_txt/test.txt", $_POST["array"]);

            $output = shell_exec("..\C_files\main.exe solve ../fichiers_txt/test.txt 2>&1");
            if($output == "SAD"){
                echo '<div id="find_element">You can\'t finish this level</div>';
            }
            $output_on_screen = "";
            echo '<div id="find_element">';
            for($i = 0; $i < strlen($output); $i++){
                if($output[$i] == "0"){
                    $output_on_screen = $output_on_screen . 'Right, ';
                }
                else if($output[$i] == "1"){
                    $output_on_screen = $output_on_screen . 'Top, ';
                }
                else if($output[$i] == "2"){
                    $output_on_screen = $output_on_screen . 'Left, ';
                }
                else if($output[$i] == "3"){
                    $output_on_screen = $output_on_screen . 'Down, ';
                }
            }
            echo substr($output_on_screen, 0, strlen($output_on_screen) - 2);
            echo '</div>';

            $tab_grille = $_POST["array"];
            $nb_ligne = $_POST["nb_lignes"];
            $nb_col = $_POST["nb_colonnes"];
            echo "<script>";
            echo "const nb_ligne = $nb_ligne;";
            echo "const nb_col = $nb_col;";
            echo "const tab_grille = $tab_grille;";
            echo "</script>";
        }
    ?>
    <div class="text">
        <h2>Test your level</h2>
        <p>Resolve, save, publish</p>
        <br>
        <?php
        if(isset($_GET["modify"]) && $_GET["modify"] != "new"){
            $id_level = $_GET["modify"];
            $update = "save_level.php?update=$id_level";
            echo "<a href='concepteur_manuel.php?modify=$id_level' style='color: red;'>Go back to map maker</a>";
        }
        else{
            echo '<a href="concepteur_manuel.php?modify=new" style="color: red;">Go back to map maker</a>';
            $update = "save_level.php";
        }
        ?>
        <audio id="audio" autoplay loop >
            <source src="../musics/laby.mp3" type="audio/mp3">
        </audio>
    </div>
    <div class="grid-container">
        <div class="grille"></div>
    </div>
    <div class="status"></div>
    <div id="dialog">
        <p>You finished the level</p>
        <a href="list_levels.php">Go back to level list</a>
        <form id="time_form" action=<?php echo $update ?> method="post">
            <input type="hidden" name="array_grid" id="array_level" value="<?php echo $tab_grille ?>">
            <input type="hidden" name="nb_col" id="nb_col" value="<?php echo $nb_col ?>">
            <input type="hidden" name="nb_ligne" id="nb_ligne" value="<?php echo $nb_ligne ?>">
            <input type="submit" value="Save" name="Save">
        </form>
    </div>
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
</script>
<script src="../scripts/level_play.js"></script>
</html>