//////création des fonctions
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
        console.log(is_lemon);
        console.log(is_orange);
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
        setTimeout(function() {
            next_dialog(currentDialog+1);
        }, 700);
    }
});