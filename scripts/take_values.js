document.getElementById("Creer").addEventListener("click", function() {
    nb_ligne = document.getElementById("nb_lignes").value; //on récupère le nombre de lignes
    nb_col = document.getElementById("nb_colonnes").value; //on récupère le nombre de colonnes
    tab = false; //permet d'indiquer qu'on a pas de couleurs dans la grille
    create_grid(tab); //on crée la grille
});