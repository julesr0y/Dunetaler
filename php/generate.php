<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nb_col = $_POST["width"];
        $nb_ligne = $_POST["height"];
        $complexity = $_POST["complexity"];
        $nb_col = (int)$nb_col;
        $nb_ligne = (int)$nb_ligne;
        $complexity = (int)$complexity;
        $output = proc_close(proc_open("..\\C_files\\main.exe generate $nb_ligne $nb_col $complexity ../fichiers_txt/test.txt 2>&1", array(), $foo));
        header("Location: level_generated.php?nb_col=$nb_col&nb_ligne=$nb_ligne");
    }
?>