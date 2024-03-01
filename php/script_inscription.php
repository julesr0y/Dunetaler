<?php
    if(isset($_POST["Inscription"]))
    {
        try
        {
            require_once 'connect_bdd.php'; //connexion à la bdd
            require_once 'fonctions.php'; //importation des fonctions

            //on sécurise les données
            $username = valider_donnees($_POST["username"]);
            $email = valider_donnees($_POST["email"]);
            $mdp = password_hash(valider_donnees($_POST["mdp"]), PASSWORD_DEFAULT);
            $mdp_verif = valider_donnees($_POST["mdp"]);
            $mdp_confirm = valider_donnees($_POST["confirm_password"]);

            // Vérifier si le nom d'utilisateur existe déjà dans la base de données
            $query = "SELECT * FROM players WHERE username = :username";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            // Vérifier si l'adresse mail existe déjà dans la base de données
            $query = "SELECT * FROM players WHERE email = :email";
            $stmt2 = $conn->prepare($query);
            $stmt2->bindParam(':email', $email);
            $stmt2->execute();

            if ($stmt->rowCount() > 0) 
            {
                // Le nom d'utilisateur existe déjà
                $error_message = "alreadyused";
                header("Location: inscription.php?username_error=" . urlencode($error_message));
                exit();
            } 
            else if ($stmt2->rowCount() > 0)
            {
                // L'adresse mail existe déjà
                $error_message = "alreadyused";
                header("Location: inscription.php?email_error=" . urlencode($error_message));
                exit();
            }
            else if ($mdp_verif != $mdp_confirm)
            {
                // Les mdp ne correspondent pas
                $error_message = "dontcorrespond";
                header("Location: inscription.php?password_error=" . urlencode($error_message));
                exit();
            }
            else 
            {
                // Le nom d'utilisateur est disponible, effectuer l'inscription
                //procédure insertion dans bdd
                $req = $conn->prepare("INSERT INTO players(username, email, mdp) VALUES(:username, :email, :mdp)"); //preparation de la requete
                $req->execute(array( //execution de la requete
                    ':username' => $username,
                    ':email' => $email,
                    ':mdp' => $mdp
                ));
            

                //procédure de création de la session
                $id_user = $conn->lastInsertId(); //on recupere l'id de l'utilisateur
                $_SESSION["player"] = array( //on crée la session avec un array
                    "id" => $id_user,
                    "username" => $username,
                    "email" => $email
                );

                require_once 'set_cookies.php';

                header("Location: start.php"); //on redirige
            }
        }
        catch(Exception $e) //en cas d'erreur
        {
			die("Erreur : " . $e->getMessage());
        }
    }
?>