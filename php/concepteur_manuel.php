<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();

    if(isset($_GET["id_level"])){
        $id_level = $_GET["id_level"];
        $redirect = "test_mode.php?modify=$id_level";
    }
    else if(isset($_GET["modify"])){
        $id_level = $_GET["modify"];
        $redirect = "test_mode.php?modify=$id_level";
    }
    else{
        $redirect = "test_mode.php";
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/concepteur_manuel.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Create Level</title>
</head>
<body>
    <p id="exit">
        Press <input type="button" id="boutonesc" onclick="window.location.href='start.php';" value="esc"/>
        <br>
        to go back
    </p>
    <div class="tools">
        <h2>Create level</h2>
        <br>
        <form id="grille_creation" action="<?php echo $redirect ?>" method="post">
            <label for="nb_lignes">Rows number</label>
            <input type="number" id="nb_lignes" name="nb_lignes" min="2" max="10">
            <br><br>
            <label for="nb_colonnes">Columns number:</label>
            <input type="number" id="nb_colonnes" name="nb_colonnes" min="2" max="15">
            <input type="hidden" name="array" id="array">
            <br><br>
            <input type="button" name="Creer" id="Creer" value="Create grid">
            <input type="submit" id="gototest" value="Test level" name="Test" onclick="traitement()">
            <input type="button" value="Reset" name="Reset" onclick='window.location.href = "concepteur_manuel.php"'>
        </form>
        <br><br>
        <div class="outils">
            <p>Colors:</p>
            <label for="Pink">Pink</label>
            <input type="radio" name="pink" id="pink">
            <label for="Red">Red</label>
            <input type="radio" name="red" id="red">
            <label for="Blue">Blue</label>
            <input type="radio" name="blue" id="blue">
            <label for="Purple">Purple</label>
            <input type="radio" name="purple" id="purple">
            <label for="Orange">Orange</label>
            <input type="radio" name="orange" id="orange">
        </div>
    </div>
    <div class="grid-container">
        <div class="grille"></div>
    </div>
</body>
<script>
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            location.href='list_levels.php';
        }
    });
</script>
<?php
if(isset($_GET["id_level"])){
    try{
        require_once 'connect_bdd.php';
        $req = $conn->prepare("SELECT * FROM niveaux WHERE id = :id_level");
        $req->execute(
            array(
                ':id_level' => $_GET["id_level"]
            )
        );
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if($result["id_user"] != $_SESSION["player"]["id"]){
            header("Location: ratio.html");
        }
?>
<script>
    var tab_grille = <?php echo $result["array_grid"] ?>;
    var nb_col = <?php echo $result["nb_col"] ?>;
    var nb_ligne = <?php echo $result["nb_ligne"] ?>;
    document.getElementById("nb_lignes").value = nb_ligne;
    document.getElementById("nb_colonnes").value = nb_col;
</script>
<script src="../scripts/concepteur_manuel.js"></script>
<script>
    var tab = true; //permet d'indiquer si on a deja des couleurs dans la grille
    create_grid(tab); //on cree la grille
</script>
<?php
    }
    catch(Exception $e) //en cas d'erreur
    {
        die("Erreur : " . $e->getMessage());
    }
}
else if(isset($_GET["modify"])){
?>
<script>
    var tab_grille = <?php echo file_get_contents("../fichiers_txt/test.txt"); ?>;
    var nb_col = tab_grille[0].length;
    var nb_ligne = tab_grille.length;
    document.getElementById("nb_lignes").value = nb_ligne;
    document.getElementById("nb_colonnes").value = nb_col;
</script>
<script src="../scripts/concepteur_manuel.js"></script>
<script>
    var tab = true; //permet d'indiquer si on a deja des couleurs dans la grille
    create_grid(tab); //on cree la grille
</script>
<?php
}
else{
?>
<script>
    var tab_grille = 0;
    var nb_col = 0;
    var nb_ligne = 0;
</script>
<script src="../scripts/concepteur_manuel.js"></script>
<script src="../scripts/take_values.js"></script>
<?php
}
?>
</html>