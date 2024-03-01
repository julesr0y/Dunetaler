<?php
session_start();

//redirige vers connexion.php si l'utilisateur n'est pas connecté (session non existante)
if(!isset($_SESSION["player"])){
    header("Location: connexion.php");
    exit;
}

//supprime la session
session_unset();
session_destroy();
require_once 'delete_cookies.php';
header("Location: connexion.php");
?>