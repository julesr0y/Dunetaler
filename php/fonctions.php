<?php
    function valider_donnees($donnee)
    /*
        valider_donnees permet de verifier si les données récupérées ne sont pas un danger
        pour ce faire elle fait appel à différentes fonctions natives de php pour la validation
        des données
    */
    {
        $donnee = trim($donnee);
        $donnee = stripslashes($donnee);
        $donnee = htmlspecialchars($donnee);
        return $donnee;
    }

    function cookies_exist(){
        if((isset($_COOKIE["id"]) && isset($_COOKIE["username"]) && isset($_COOKIE["email"])) && !isset($_SESSION["player"])){
            $_SESSION["player"] = array(
                "id" => $_COOKIE["id"],
                "username" => $_COOKIE["username"],
                "email" => $_COOKIE["email"]
            );
        }
    }

    function is_connected(){
        if(!isset($_SESSION["player"])){
            header("Location: connexion.php");
        }
    }

    function is_connected_inscription_connexion(){
        if(isset($_SESSION["player"])){
            header("Location: start.php");
        }
    }
?>