//références
var is_orange = false; //par défaut, le joueur n'a pas l'attribut de l'orange
var is_lemon = true; //par défaut, le joueur a l'attribut citron
const grid = document.querySelector('.grille'); //on récupère la grille
const case_grille = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
var img_joueur = document.querySelector('.joueur'); //selection de l'image du joueur
var dot = document.querySelector('.point'); //on récupère la div point
var tab_grille; //contiendra le tableau du niveau
var nb_col;
var nb_ligne;
var dial_number = 0;
///////partie déplacement du personnage
let x = 50; //position left x de base du point (50%)
let y = 50; //position top y de base du point (50%)
var coord_x = 0; //coordonnées x du point
var coord_y = 0; //coordonnées y du pont

//on définit les constantes pour les couleurs
const white_cell = "rgb(156, 255, 121)";
const pink_cell = "rgb(255, 192, 192)";
const red_cell = "rgb(255, 64, 64)";
const blue_cell = "rgb(64, 64, 255)";
const purple_cell = "rgb(192, 0, 192)";
const orange_cell = "rgb(255, 193, 74)";


function reload_const(){
    img_joueur = document.querySelector('.joueur'); //selection de l'image du joueur
    dot = document.querySelector('.point');
    coord_x = 0;
    coord_y = 0;
    x = 50;
    y = 50;
}

function create_the_level(nb_col_f, nb_ligne_f, tab_grille_f){
    hideCurrentDialog();
    //on reconstruit la grille avec les couleurs
    for (var i = 0; i < nb_col_f * nb_ligne_f; i++) { //on crée la grille en fonction du nombre de lignes et de colonnes
        var divElement = document.createElement("div"); //on crée une div
        divElement.classList.add("case"); //on lui ajoute la classe case
        grid.appendChild(divElement); //on ajoute la div à la grille
    }

    grid.style.gridTemplateColumns = `repeat(${nb_col_f}, 1fr)`; //création des colonnes de la grille avec grid de css, en fonction du nombre de colonnes
    grid.style.gridTemplateRows = `repeat(${nb_ligne_f}, 1fr)`; //création des lignes de la grille avec grid de css, en fonction du nombre de lignes
    grid.style.height = `${nb_ligne_f * 50}px`; //chaque case mesure 50px de hauteur
    grid.style.width = `${nb_col_f * 50}px`; //chaque case mesure 50px de largeur

    // Sélectionne toutes les cases de la grille
    var cases = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
    // Parcours les cases et définit le style en fonction des valeurs du tableau
    let cmpt = 0; //compteur pour parcourir le tableau
    for (var i = 0; i < nb_ligne_f; i++) { //pour chaque ligne
        for(var j = 0; j < nb_col_f; j++){ //pour chaque colonne
            if(tab_grille_f[i][j] == 0){
                cases[cmpt].style.backgroundColor = white_cell; //définition de la couleur de fond
            }
            if(tab_grille_f[i][j] == 1){
                cases[cmpt].style.backgroundColor = pink_cell; //définition de la couleur de fond
            }
            else if(tab_grille_f[i][j] == 2){
                cases[cmpt].style.backgroundColor = red_cell; //définition de la couleur de fond
            }
            else if(tab_grille_f[i][j] == 4){
                cases[cmpt].style.backgroundColor = blue_cell; //définition de la couleur de fond
            }
            else if(tab_grille_f[i][j] == 5){
                cases[cmpt].style.backgroundColor = purple_cell; //définition de la couleur de fond
            }
            else if(tab_grille_f[i][j] == 6){
                cases[cmpt].style.backgroundColor = orange_cell; //définition de la couleur de fond
            }
            cmpt++; //on incrémente le compteur
        }
    }
    tab_grille = tab_grille_f;
    console.log(tab_grille);
    nb_col = nb_col_f;
    nb_ligne = nb_ligne_f;

    //on insère le joueur dans la position [0, 0]
    var divElement = document.createElement("div"); //on crée une div
    divElement.classList.add("point"); //on lui ajoute la classe point
    grid.firstElementChild.appendChild(divElement); //on ajoute la div point à la première div enfant de la grille

    var dot = document.querySelector('.point'); //on récupère la div point

    //on insère le joueur
    var divElement = document.createElement("img");
    divElement.classList.add("joueur"); //on lui ajoute la classe joueur
    dot.appendChild(divElement); //on ajoute

    var image = document.querySelector(".joueur"); //on récupère la div joueur

    //on insère l'image du joueur
    image.setAttribute('src', '../img/frisk_front.png'); //on ajoute l'image du joueur
    image.setAttribute('alt', 'Player'); //on ajoute l'attribut alt

    //on reload les constantes
    reload_const();
}

function clear_screen(){
    while (grid.firstChild) //tant que grille à des enfants "case"
    {
        grid.removeChild(grid.firstChild); //on supprime la première case de la grille
    }
}

let currentDialog = 1;
showCurrentDialog();

function showCurrentDialog() {
    clear_screen();
    const dialogs = document.getElementsByClassName("dialog");
    for (let i = 0; i < dialogs.length; i++) {
        dialogs[i].style.display = "none";
    }

    const currentDialogElement = document.getElementById("dialog" + currentDialog);
    if (currentDialogElement) {
        currentDialogElement.style.display = "block";
    }
}

function hideCurrentDialog() {
    const dialogs = document.getElementsByClassName("dialog");
    for (let i = 0; i < dialogs.length; i++) {
        dialogs[i].style.display = "none";
    }

    const currentDialogElement = document.getElementById("dialog" + currentDialog);
    if (currentDialogElement) {
        currentDialogElement.style.display = "none";
    }
}

function next_dialog(next) {
    currentDialog = next;
    showCurrentDialog();
}

// Récupération du bouton par son ID
var fadeButton = document.getElementById("fadeButton");

// Écoute de l'événement de clic sur le bouton
fadeButton.addEventListener("click", function() {
    // Ajout de la classe pour déclencher l'animation de fondu
    document.body.classList.add("fade-out");
    var audio1 = document.getElementById("cymbal");
    audio1.play();
    setTimeout(function() {
        document.body.innerHTML = '';
    }, 4800);
    // Attente de 8 secondes puis suppression du contenu de la page
    var audio2 = document.getElementById("doum");
    setTimeout(function() {
        audio2.play();
        document.body.setAttribute('style', 'display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-size: 60px;');
        document.body.innerHTML = "Dunetaler"; 
        setTimeout(function() {
            audio2.play();
            document.body.innerHTML = "La Descente Studio";
            setTimeout(function() {
                document.location.href="campaign.php";
            }, 4000); // Durée avant redirection en millisecondes
        }, 4000); // Durée de l'animation en millisecondes
    }, 5000); // Durée de l'animation en millisecondes
});