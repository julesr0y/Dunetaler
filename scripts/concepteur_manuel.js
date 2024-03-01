const grid = document.querySelector('.grille'); //on récupère la grille
const img_joueur = document.querySelector('.joueur'); //on récupère l'image du joueur

//on définit les constantes pour les couleurs
const green_cell = "rgb(156, 255, 121)";
const pink_cell = "rgb(255, 192, 192)";
const red_cell = "rgb(255, 64, 64)";
const blue_cell = "rgb(64, 64, 255)";
const purple_cell = "rgb(192, 0, 192)";
const orange_cell = "rgb(255, 193, 74)";

function create_grid(tab){ //fonction pour créer la grille, tab permet de savoir si on a des couleurs dans la grille ou non

    vider_grille(); //on vide l'ancienne grille, pour éviter d'écraser une nouvelle grille sur celle-ci

    for (var i = 0; i < nb_col * nb_ligne; i++) { //pour chaque case de la grille
        var divElement = document.createElement("div"); //on crée un élément div
        divElement.classList.add("case"); //on lui ajoute la classe case
        if(i === 0 || i === (nb_col * nb_ligne - 1)){
            divElement.style.backgroundColor = green_cell;
        }
        grid.appendChild(divElement); //on ajoute l'élément div à la grille
    }

    // Construction CSS pour le style de la grille
    grid.style.gridTemplateColumns = `repeat(${nb_col}, 1fr)`; //chaque case mesure 50px de largeur
    grid.style.gridTemplateRows = `repeat(${nb_ligne}, 1fr)`; //chaque case mesure 50px de hauteur
    grid.style.height = `${nb_ligne * 50}px`; //la grille mesure nb_ligne * 50px de hauteur
    grid.style.width = `${nb_col * 50}px`; //la grille mesure nb_col * 50px de largeur

    // Sélectionne toutes les cases de la grille
    if(tab === true){ //si on a des couleurs dans la grille
        var cases = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
        // Parcours les cases et définit le style en fonction des valeurs du tableau
        let cmpt = 0; //compteur pour parcourir le tableau
        for (var i = 0; i < nb_ligne; i++) { //pour chaque ligne
            for(var j = 0; j < nb_col; j++){ //pour chaque colonne
                if(i === 0 && j === 0){
                    cases[cmpt].style.backgroundColor = green_cell; //définition de la couleur de fond
                }
                else if(i === nb_ligne-1 && j === nb_col-1){
                    cases[cmpt].style.backgroundColor = green_cell; //définition de la couleur de fond
                }
                else if(tab_grille[i][j] == 1){ //si la case est rose
                    cases[cmpt].style.backgroundColor = pink_cell; //définition de la couleur de fond
                }
                else if(tab_grille[i][j] == 2){ //si la case est rouge
                    cases[cmpt].style.backgroundColor = red_cell; //définition de la couleur de fond
                }
                else if(tab_grille[i][j] == 4){ //si la case est bleue
                    cases[cmpt].style.backgroundColor = blue_cell; //définition de la couleur de fond
                }
                else if(tab_grille[i][j] == 5){ //si la case est violette
                    cases[cmpt].style.backgroundColor = purple_cell; //définition de la couleur de fond
                }
                else if(tab_grille[i][j] == 6){ //si la case est orange
                    cases[cmpt].style.backgroundColor = orange_cell; //définition de la couleur de fond
                }
                cmpt++; //on incrémente le compteur
            }
        }
    }

    // Récupération des outils après la création de la grille
    const add_pink = document.querySelector("#pink"); //on récupère la case rose
    const add_red = document.querySelector("#red"); //on récupère la case rouge
    const add_blue = document.querySelector("#blue"); //on récupère la case bleue
    const add_purple = document.querySelector("#purple"); //on récupère la case violette
    const add_orange = document.querySelector("#orange"); //on récupère la case orange
    var case_grille = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille

    // Ajouter un gestionnaire d'événements à chaque élément
    case_grille.forEach(function(element) { //pour chaque case de la grille
        element.addEventListener("click", function() { //on ajoute un évènement au clic
            if(this.style.backgroundColor != green_cell){
                if (add_pink.checked) { //si la case rose est cochée
                    this.style.backgroundColor = pink_cell; //on change la couleur de la case en rose
                } else if (add_red.checked) { //si la case rouge est cochée
                    this.style.backgroundColor = red_cell; //on change la couleur de la case en rouge
                } else if (add_blue.checked) { //si la case bleue est cochée
                    this.style.backgroundColor = blue_cell; //on change la couleur de la case en bleu
                } else if (add_purple.checked) { //si la case violette est cochée
                    this.style.backgroundColor = purple_cell; //on change la couleur de la case en violet
                } else if (add_orange.checked) { //si la case orange est cochée
                    this.style.backgroundColor = orange_cell; //on change la couleur de la case en orange
                }
            }
        });
    });
}

function vider_grille(){ //fonction pour vider la grille
    //on enleve les cases déjà existantes dans grille
    while (grid.firstChild) //tant que grille à des enfants "case"
    {
        grid.removeChild(grid.firstChild); //on supprime la première case de la grille
    }
}

///pour la redirection
function traitement(){
    ///////récupérer tableau, et créer tableau a plusieurs dimensions
    const case_grille = document.querySelectorAll(".case"); //on récupère toutes les cases de la grille
    const backgroundColors = []; //array qui contiendra toutes les couleurs d'arrière plan des cases de la grille
    case_grille.forEach(couleur_case => { //pour chaque case de la grille
    const computedStyle = window.getComputedStyle(couleur_case); //on récupère le style de la case
    const backgroundColor = computedStyle.backgroundColor; //on récupère le background-color de la case
    var id_color; //on crée une variable qui contiendra l'id de la couleur
    if(backgroundColor == green_cell){ //si la couleur est verte
        id_color = 1; //on lui attribue l'id 1
    }
    else if(backgroundColor == pink_cell){ //si la couleur est rose
        id_color = 1; //on lui attribue l'id 1
    }
    else if(backgroundColor == red_cell){ //si la couleur est rouge
        id_color = 2; //on lui attribue l'id 2
    }
    else if(backgroundColor == blue_cell){ //si la couleur est bleue
        id_color = 4; //on lui attribue l'id 4
    }
    else if(backgroundColor == purple_cell){ //si la couleur est violette
        id_color = 5; //on lui attribue l'id 5
    }
    else if(backgroundColor == orange_cell){ //si la couleur est orange
        id_color = 6; //on lui attribue l'id 6
    }
    backgroundColors.push(id_color); //on ajoute l'id de la case au tableau
    });
    console.log(backgroundColors); //affichage du tableau dans la console (pour vérifications)

    //construction tableau avec coordonnées et couleurs
    let curs = 0; //curseur du tableau backgroundColors
    let tab_grille = new Array(nb_ligne); //on crée un tableau de nb_lignes éléments
    for (i = 0; i < nb_ligne; i++) { //pour l'ensemble des lignes
        tab_grille[i] = new Array(nb_col); //pour chaque élément, on crée un tableau de nb_lignes éléments
        for (j = 0; j < nb_col; j++) { //pour l'ensemble des colonnes
            tab_grille[i][j] = backgroundColors[curs]; //on ajoute le style de la case en cours dans tab_grille
            curs++; //on incrémente le curseur
        }
    }
    const array_form = document.querySelector("#array"); //on récupère le formulaire
    array_form.value = JSON.stringify(tab_grille); //on envoie le tableau dans le formulaire
    document.querySelector("#grille_creation").submit(); //on envoie le formulaire
}

// Sélectionner tous les radios à cocher
var radios = document.querySelectorAll("input[type='radio']"); //on récupère tous les input de type radio
// Ajouter un gestionnaire d'événements à chaque case à cocher
radios.forEach(function(radio) { //pour chaque input de type radio
    radio.addEventListener("click", function() { //on ajoute un évènement au clic
        radios.forEach(function(rd) { //pour chaque input de type radio
            if (rd !== radio) { //si l'input de type radio n'est pas celui sur lequel on a cliqué
                rd.checked = false; //on décoche
            }
        });
    });
});