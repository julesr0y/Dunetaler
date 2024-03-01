<?php
    if(isset($_POST["Connexion"])){ //si le formulaire concernée existe
        try{

            require_once 'connect_bdd.php'; //connexion a la bdd
            require_once 'fonctions.php'; //importation des fonctions

            //validation des données
            $email = valider_donnees($_POST["email"]);
            $mdp = valider_donnees($_POST["mdp"]);

            //on récupère les données de la bdd associées à l'adresse mail
            $req = $conn->prepare("SELECT * FROM players WHERE email = :email"); //requete et préparation
            $req->execute(array(
                ':email' => $email
            )); //execution de la requete
            $user = $req->fetch(); //recupération des données

            //on verifie le mail et le mot de passe
            if(!$user || !password_verify($mdp, $user["mdp"])){ //si l'adresse mail n'est pas trouvée et/ou si le mot de passe ne correspond pas
                // Les identifiants sont incorrects
                $error_message = "incorrectid";
                header("Location: connexion.php?incorrectid_error=" . urlencode($error_message));
                exit();
            }

            //on crée la session
            $_SESSION["player"] = array(
                "id" => $user["id"],
                "username" => $user["username"],
                "email" => $user["email"]
            );

            require_once 'set_cookies.php';

            //on redirige
            header("Location: start.php");
        }
        catch(Exception $e){ //en cas d'erreur
            die("Erreur : " . $e->getMessage());
        }
    }
?>