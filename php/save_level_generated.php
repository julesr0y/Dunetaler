<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();

    if(isset($_POST["Save"])) 
    {
        try{
            require_once 'connect_bdd.php'; //connexion à la bdd
            $id_user = $_SESSION["player"]["id"]; //récupération de l'id de l'utilisateur
            $array_level = valider_donnees($_POST["array_grid"]); //récupération de la grille
            $nb_col = valider_donnees($_POST["nb_col"]); //récupération du nombre de colonnes
            $nb_ligne = valider_donnees($_POST["nb_ligne"]); //récupération du nombre de lignes
            $req = $conn->prepare("INSERT INTO generated_levels(array_grid, id_user, nb_col, nb_ligne) VALUES(:array_level, :id_user, :nb_col, :nb_ligne)"); //requête préparée pour insérer le niveau dans la bdd
            $req->execute( //exécution de la requête
                array(
                    ':array_level' => $array_level,
                    ':id_user' => $id_user,
                    ':nb_col' => $nb_col,
                    ':nb_ligne' => $nb_ligne
                )
            );
            header("Location: list_levels.php"); //redirection vers la page de la liste des niveaux
        }
        catch(Exception $e) //en cas d'erreur
        {
            die("Erreur : " . $e->getMessage());
        }
    }
?>