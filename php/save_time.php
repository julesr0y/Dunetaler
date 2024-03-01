<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();

    if(isset($_POST["Score_time"]) && isset($_POST["id_level"])) 
    {
        try{
            require_once 'connect_bdd.php'; //connexion à la bdd
            $id_user = $_SESSION["player"]["id"]; //récupération de l'id de l'utilisateur
            $id_level = $_POST["id_level"];

            $req = $conn->prepare("SELECT * FROM scores WHERE id_niveau = :id_niveau AND id_user = :id_user");
            $req->execute( //exécution de la requête
                array(
                    ':id_niveau' => $_POST["id_level"],
                    ':id_user' => $_SESSION["player"]["id"]
                )
            );
            $result = $req->fetch(PDO::FETCH_ASSOC);

            $previous_score = str_replace(":", "", $result["score"]); //on enleve ":"
            $actual_score = str_replace(":", "", $_POST["Score_time"]); //on enleve ":"
            $previous_score_int = (int)$previous_score; //on convertit en int pour la comparaison
            $actual_score_int = (int)$actual_score; //on convertit en int pour la comparaison
    
            if($result != null){ //si le joueur a déjà un score sur ce niveau
                //on regarde si le score (temps) du joueur est plus faible que son score précédent
                if($actual_score_int < $previous_score_int){
                    $req = $conn->prepare("UPDATE scores SET score=:score, score_int=:score_int WHERE id=:id"); //requête préparée pour update le niveau dans la bdd
                    $req->execute( //exécution de la requête
                        array(
                            ':score' => $_POST["Score_time"],
                            ':score_int' => $actual_score_int,
                            ':id' => $result["id"]
                        )
                    );
                }
            }
            else{ //si le joueur n'avait pas de score sur ce niveau
                $req = $conn->prepare("INSERT INTO scores(score, score_int, joueur, id_niveau, id_user) VALUES(:score, :score_int, :joueur, :id_niveau, :id_user)"); //requête préparée pour update le niveau dans la bdd
                $req->execute( //exécution de la requête
                    array(
                        ':score' => $_POST["Score_time"],
                        ':score_int' => $actual_score_int,
                        ':joueur' => $_SESSION["player"]["username"],
                        ':id_niveau' => $_POST["id_level"],
                        ':id_user' => $_SESSION["player"]["id"]
                    )
                );   
            }         
            header("Location: campaign.php"); //redirection vers la page de la liste des niveaux du mode campagne
        }
        catch(Exception $e) //en cas d'erreur
        {
            die("Erreur : " . $e->getMessage());
        }
    }
?>