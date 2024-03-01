//références
const grid = document.querySelector('.grille'); //on récupère la grille
const case_grille = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
let coord_x = 0; //coordonnées x du point
let coord_y = 0; //coordonnées y du pont
var is_orange = false; //par défaut, le joueur n'a pas l'attribut de l'orange
var is_lemon = true; //par défaut, le joueur a l'attribut citron

//on définit les constantes pour les couleurs
const green_cell = "rgb(156, 255, 121)";
const pink_cell = "rgb(255, 192, 192)";
const red_cell = "rgb(255, 64, 64)";
const blue_cell = "rgb(64, 64, 255)";
const purple_cell = "rgb(192, 0, 192)";
const orange_cell = "rgb(255, 193, 74)";

//on reconstruit la grille avec les couleurs
for (var i = 0; i < nb_col * nb_ligne; i++) { //on crée la grille en fonction du nombre de lignes et de colonnes
    var divElement = document.createElement("div"); //on crée une div
    divElement.classList.add("case"); //on lui ajoute la classe case
    grid.appendChild(divElement); //on ajoute la div à la grille
}

grid.style.gridTemplateColumns = `repeat(${nb_col}, 1fr)`; //création des colonnes de la grille avec grid de css, en fonction du nombre de colonnes
grid.style.gridTemplateRows = `repeat(${nb_ligne}, 1fr)`; //création des lignes de la grille avec grid de css, en fonction du nombre de lignes
if(nb_col === 26 || nb_col === 24){
    grid.style.height = `${nb_ligne * 45}px`; //chaque case mesure 50px de hauteur
    grid.style.width = `${nb_col * 45}px`; //chaque case mesure 50px de largeur
}
if(nb_ligne === 24){
    grid.style.height = `${nb_ligne * 20}px`; //chaque case mesure 50px de hauteur
    grid.style.width = `${nb_col * 20}px`; //chaque case mesure 50px de largeur
}
else if(nb_col === 30){
    grid.style.height = `${nb_ligne * 35}px`; //chaque case mesure 50px de hauteur
    grid.style.width = `${nb_col * 35}px`; //chaque case mesure 50px de largeur
}
else{
    grid.style.height = `${nb_ligne * 50}px`; //chaque case mesure 50px de hauteur
    grid.style.width = `${nb_col * 50}px`; //chaque case mesure 50px de largeur
}

// Sélectionne toutes les cases de la grille
var cases = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
// Parcours les cases et définit le style en fonction des valeurs du tableau
let cmpt = 0; //compteur pour parcourir le tableau
for (var i = 0; i < nb_ligne; i++) { //pour chaque ligne
    for(var j = 0; j < nb_col; j++){ //pour chaque colonne
        if((i === 0 && j === 0) || (i === nb_ligne-1 && j === nb_col-1)){
            cases[cmpt].style.backgroundColor = green_cell; //définition de la couleur de fond
        }
        else if(tab_grille[i][j] == 1){
            cases[cmpt].style.backgroundColor = pink_cell; //définition de la couleur de fond
        }
        else if(tab_grille[i][j] == 2){
            cases[cmpt].style.backgroundColor = red_cell; //définition de la couleur de fond
        }
        else if(tab_grille[i][j] == 4){
            cases[cmpt].style.backgroundColor = blue_cell; //définition de la couleur de fond
        }
        else if(tab_grille[i][j] == 5){
            cases[cmpt].style.backgroundColor = purple_cell; //définition de la couleur de fond
        }
        else if(tab_grille[i][j] == 6){
            cases[cmpt].style.backgroundColor = orange_cell; //définition de la couleur de fond
        }
        cmpt++; //on incrémente le compteur
    }
}

const time_form = document.querySelector("#time_form");
const score_time = document.querySelector("#score_time"); //on récupère le temps dans le formulaire
function submit_time(){
    score_time.value = timerElement.innerHTML; //on envoie le temps dans le formulaire
    time_form.submit(); //on soumet le formulaire
}

//on insère le joueur dans la position [0, 0]
var divElement = document.createElement("div"); //on crée une div
divElement.classList.add("point"); //on lui ajoute la classe point
grid.firstChild.appendChild(divElement); //on ajoute la div point à la première div enfant de la grille

//on insère le joueur
var dot = document.querySelector('.point'); //on récupère la div point
var divElement = document.createElement("img");
divElement.classList.add("joueur"); //on lui ajoute la classe joueur
dot.appendChild(divElement); //on ajoute

//on insère l'image du joueur
var image = document.querySelector(".joueur"); //on récupère la div joueur
image.setAttribute('src', '../img/frisk_front.png'); //on ajoute l'image du joueur
image.setAttribute('alt', 'Player'); //on ajoute l'attribut alt

///////partie déplacement du personnage
let x = 50; //position left x de base du point (50%)
let y = 50; //position top y de base du point (50%)

//////création des fonctions
function finished_level(){
    const currentDialogElement = document.getElementById("dialog");
    currentDialogElement.style.display = "block";
}

function verif_case_suivante(pos_x, pos_y){ //vérifie si le personnage peut se déplacer sur la case souhaitée
    if(tab_grille[pos_y][pos_x] != 2 && tab_grille[pos_y][pos_x] != 3 && tab_grille[pos_y][pos_x] != 5 && tab_grille[pos_y][pos_x] != null){ //on compare les coordonnées du jour avec le tableau de couleurs de la grille
        return true; //on return vrai
    }
}

function verif_case_violette(pos_x, pos_y){
    //move: 10 = right, 20 = left, 30 = down, 40 = up
    if(tab_grille[pos_y][pos_x] === 5){ //si l'id de la case est égal à 5 (violet)
        return true; //on return true
    }
}

function deplacement_case_violette(pos_x, pos_y, move){
    //move: 10 = right, 20 = left, 30 = down, 40 = up
    if(move === 10){ //si le joueur se déplace à droite
        let cmpt = 0; //on initialise le compteur de cases violettes
        while(tab_grille[pos_y][pos_x] === 5){ //tant que la case est violette
            cmpt += 1; //on incrémente le compteur
            pos_x += 1; //on incrémente la position x du joueur
        }
        if(verif_case_suivante(pos_x, pos_y)){ //si la case suivante aux violettes est utilisable
            return cmpt+1; //on return le compteur + 1
        }
        else{
            return false; //sinon on return false
        }
    }
    else if(move === 20){ //si le joueur se déplace à gauche
        let cmpt = 0; //on initialise le compteur de cases violettes
        while(tab_grille[pos_y][pos_x] === 5){ //tant que la case est violette
            cmpt += 1; //on incrémente le compteur
            pos_x -= 1; //on décrémente la position x du joueur
        }
        if(verif_case_suivante(pos_x, pos_y)){ //si la case suivante aux violettes est utilisable
            return cmpt+1; //on return le compteur + 1
        }
        else{
            return false; //sinon on return false
        }
    }
    if(move === 30){ //si le joueur se déplace en bas
        let cmpt = 0; //on initialise le compteur de cases violettes
        while(tab_grille[pos_y][pos_x] === 5){ //tant que la case est violette
            cmpt += 1; //on incrémente le compteur
            pos_y += 1; //on incrémente la position y du joueur
        }
        if(verif_case_suivante(pos_x, pos_y)){ //si la case suivante aux violettes est utilisable
            return cmpt+1; //on return le compteur + 1
        }
        else{
            return false; //sinon on return false
        }
    }
    if(move === 40){ //si le joueur se déplace en haut
        let cmpt = 0; //on initialise le compteur de cases violettes
        while(tab_grille[pos_y][pos_x] === 5){ //tant que la case est violette
            cmpt += 1; //on incrémente le compteur
            pos_y -= 1; //on décrémente la position y du joueur
        }
        if(verif_case_suivante(pos_x, pos_y)){ //si la case suivante aux violettes est utilisable
            return cmpt+1; //on return le compteur + 1
        }
        else{
            return false; //sinon on return false
        }
    }
}

function verif_case_bleue(pos_x, pos_y){
    if(tab_grille[pos_y][pos_x] === 4){ //si l'id de la case est égal à 4 (bleu)
        return true; //on return true
    }
}

function verif_bleu_jaune(is_orange, is_lemon){
    if(is_orange === true && is_lemon === false){
        return false;
    }
    return true;
}

function verif_case_orange(pos_x, pos_y){
    if(tab_grille[pos_y][pos_x] === 6){
        return true;
    }
    else{
        return false;
    }
}

var cooldown = false; //cooldown désactivé (pour réduire vitesse)

const perfume_status = document.querySelector('.status'); //statut du parfum du joueur
perfume_status.innerHTML = "Lemon";
const img_joueur = document.querySelector('.joueur'); //selection de l'image du joueur
//réglages de la taille du joueur
if(nb_col === 30){
    img_joueur.style.height = "25px";
}
if(nb_ligne === 24){
    img_joueur.style.height = "15px";
}
else if(nb_col === 26){
    img_joueur.style.height = "35px";
}
else{
    img_joueur.style.height = "40px";
}
document.addEventListener('keydown', (e) => {
    if(cooldown){
        return; //si le cooldown est actif, on stoppe l'action avec un return
    }
    if (e.key === 'ArrowRight') {
        img_joueur.setAttribute('src', '../img/frisk_right.png'); //on change l'image du joueur dans la bonne direction
        if(verif_case_bleue(coord_x+1, coord_y)){
            if(verif_bleu_jaune(is_orange, is_lemon)){
                x += 100; //on ajoute 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_x++; //on incrémente la coordonnée x du joueur
            }
        }
        else if(verif_case_violette(coord_x+1, coord_y)){ //si la case suivante est violette
            is_orange = false;
            is_lemon = true;
            perfume_status.innerHTML = "Lemon";
            if(deplacement_case_violette(coord_x+1, coord_y, 10) != false){ //si le déplacement est possible
                let nb_deplacement = deplacement_case_violette(coord_x+1, coord_y, 10);
                x += nb_deplacement * 100; //on ajoute nb_deplacement * 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_x += nb_deplacement; //on incrémente la coordonnée x du joueur
            }
        }
        else if(coord_x < (nb_col)-1 && verif_case_suivante(coord_x+1, coord_y)){
            x += 100; //on ajoute 100(%) au css
            dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
            coord_x++; //on incrémente la coordonnée x du joueur
        }
    } else if (e.key === 'ArrowLeft') {
        img_joueur.setAttribute('src', '../img/frisk_left.png'); //on change l'image du joueur dans la bonne direction
        if(verif_case_bleue(coord_x-1, coord_y)){
            if(verif_bleu_jaune(is_orange, is_lemon)){
                x -= 100; //on ajoute 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_x--; //on décrémente la coordonnée x du joueur
            }
        }
        else if(verif_case_violette(coord_x-1, coord_y)){
            is_orange = false;
            is_lemon = true;
            perfume_status.innerHTML = "Lemon";
            if(deplacement_case_violette(coord_x-1, coord_y, 20) != false){ //si le déplacement est possible
                let nb_deplacement = deplacement_case_violette(coord_x-1, coord_y, 20);
                x -= nb_deplacement * 100; //on ajoute nb_deplacement * 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_x -= nb_deplacement; //on incrémente la coordonnée x du joueur
            }
        }
        else if(coord_x > 0 && verif_case_suivante(coord_x-1, coord_y)){
            x -= 100; //on retire 100(%) au css
            dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
            coord_x--; //on décrémente la coordonnée x du joueur
        }
    } else if (e.key === 'ArrowDown') {
        img_joueur.setAttribute('src', '../img/frisk_front.png'); //on change l'image du joueur dans la bonne direction
        if(verif_case_bleue(coord_x, coord_y+1)){
            if(verif_bleu_jaune(is_orange, is_lemon)){
                y += 100; //on ajoute 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_y++; //on incrémente la coordonnée y du joueur
            }
        }
        else if(verif_case_violette(coord_x, coord_y+1)){
            is_orange = false;
            is_lemon = true;
            perfume_status.innerHTML = "Lemon";
            if(deplacement_case_violette(coord_x, coord_y+1, 30) != false){ //si le déplacement est possible
                let nb_deplacement = deplacement_case_violette(coord_x, coord_y+1, 30);
                y += nb_deplacement * 100; //on ajoute nb_deplacement * 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_y += nb_deplacement; //on incrémente la coordonnée y du joueur
            }
        }
        else if(coord_y < (nb_ligne)-1 && verif_case_suivante(coord_x, coord_y+1)){
            y += 100; //on ajoute 100(%) au css
            dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
            coord_y++; //on incrémente la coordonnée y du joueur
        }
    } else if (e.key === 'ArrowUp') {
        img_joueur.setAttribute('src', '../img/frisk_up.png'); //on change l'image du joueur dans la bonne direction
        if(verif_case_bleue(coord_x, coord_y-1)){
            if(verif_bleu_jaune(is_orange, is_lemon)){
                y -= 100; //on ajoute 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_y--; //on décrémente la coordonnée y du joueur
            }
        }
        else if(verif_case_violette(coord_x, coord_y-1)){
            is_orange = false;
            is_lemon = true;
            perfume_status.innerHTML = "Lemon";
            if(deplacement_case_violette(coord_x, coord_y-1, 30) != false){ //si le déplacement est possible
                let nb_deplacement = deplacement_case_violette(coord_x, coord_y-1, 40);
                y -= nb_deplacement * 100; //on ajoute nb_deplacement * 100(%) au css
                dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
                coord_y -= nb_deplacement; //on décrémente la coordonnée y du joueur
            }
        }
        else if(coord_y > 0 && verif_case_suivante(coord_x, coord_y-1)){
            y -= 100; //on retire 100(%) au css
            dot.setAttribute('style', `left: ${x}%; top: ${y}%;`); //on met à jour le style de la page (déplacement)
            coord_y--; //on décrémente la coordonnée y du joueur
        }
    }
    if(verif_case_orange(coord_x, coord_y)){
        is_orange = true;
        is_lemon = false;
        perfume_status.innerHTML = "Orange";
    }
    // Définir le cooldown
    cooldown = true;
    setTimeout(function() {
        cooldown = false;
    }, 100); // 0,1 seconde en millisecondes
    if(coord_x === nb_col-1 && coord_y === nb_ligne-1) //si on a atteint la fin du niveau
    {
        if(typeof stopTimer === 'function'){
            stopTimer();
        }
        setTimeout(function() {
            finished_level();
        }, 100);
    }
});

if(typeof startTimer === 'function'){
    startTimer();
}

///pour l'enregistrement du niveau en bdd
const array_grid_input = document.querySelector('.array_grid_input');
const nb_col_input = document.querySelector('.nb_col_input');
const nb_ligne_input = document.querySelector('.nb_ligne_input');
//on rempli les input hidden
array_grid_input.value = JSON.stringify(tab_grille);
nb_col_input.value = nb_col;
nb_ligne_input.value = nb_ligne;