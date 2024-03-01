<?php
session_start();

if(isset($_POST["Modifier"]))
{
    try{
        require_once 'connect_bdd.php';
        $id_user = $_SESSION["player"]["id"];//on récupère la variable de session de l'id du joueur
        $username = $_POST["username"];
        $email = $_POST["email"];
        $mdp = $_POST["mdp"];

        //on vérifie que les nouveaux username/email ne soient pas déjà utilisés
        $query = "SELECT * FROM players WHERE username = :username AND NOT id = :id"; //on ne regarde pas l'utilisateur actuel
        $stmt = $conn->prepare($query);
        $stmt->execute(
            array(
                ':id' => $id_user,
                ':username' => $username
            )
        );

        // Vérifier si l'adresse mail existe déjà dans la base de données
        $query = "SELECT * FROM players WHERE email = :email AND NOT id = :id"; //on ne regarde pas l'utilisateur actuel
        $stmt2 = $conn->prepare($query);
        $stmt2->execute(
            array(
                ':id' => $id_user,
                ':email' => $email
            )
        );

        if ($stmt->rowCount() > 0) 
        {
            // Le nom d'utilisateur existe déjà
            $error_message = "alreadyused";
            header("Location: modifier_cmpt.php?username_error=" . urlencode($error_message));
            exit();
        } 
        else if ($stmt2->rowCount() > 0)
        {
            // L'adresse mail existe déjà
            $error_message = "alreadyused";
            header("Location: modifier_cmpt.php?email_error=" . urlencode($error_message));
            exit();
        }
        else //sinon on procède à la modification des données
        {
            if(empty($_POST["mdp"]))
            {
                //on modifie la table players, dans le cas où l'utilisateur ne modifie pas son mot de passe
                $req = $conn->prepare('UPDATE players SET email = :email, username = :username WHERE id = :id_user');

                $req->execute(array(
                    ':id_user' => $id_user,
                    ':username' => $username,
                    ':email' => $email
                ));
                $conn = null;
            }
            else
            {
                //on modifie la table players, dans le cas où l'utilisateur souhaite modifier son mot de passe
                $mdp = password_hash($mdp, PASSWORD_DEFAULT); //on hash le nouveau mot de passe
                $req = $conn->prepare('UPDATE players SET email = :email, username = :username, mdp = :mdp WHERE id = :id_user');

                $req->execute(array(
                    ':id_user' => $id_user,
                    ':username' => $username,
                    ':email' => $email,
                    ':mdp' => $mdp
                ));
                $conn = null;
            }

            //on met à jour les variables de session
            $_SESSION["player"]["username"] = $username;
            $_SESSION["player"]["email"] = $email;

            //on met à jour les cookies
            require_once 'delete_cookies.php'; //on supprime les anciens
            require_once 'set_cookies.php'; //on en crée des nouveaux

            header("Location: profil.php");
        }
    }
    catch(Exception $e) //en cas d'erreur
    {
        die("Erreur : " . $e->getMessage());
    }
}
?>