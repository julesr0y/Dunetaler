## Cette documentation est destinée à usage interne : le client n'en aura normalement pas l'usage et ne devrait jamais avoir à la consulter. Elle contient les standards partagés entre le code C et PHP pour garantir une uniformité du code (et faciliter le transfert des données entre les différents programmes)
---
# Case du niveau
Chaque case du niveau est représentée par son ID, il faut penser à inclure un _enum_ dans le code afin de pouvoir désigner les cases par leur couleur (même si elles sont traitées par leur ID en interne)
Voici un tableau référençant les cases, leur couleur et leur effet (sujet à modification ultérieure) :

| ID | Couleur | Effet |
|----|---------|-------|
| 1 | Rose | Aucun effet, peut être traversée sans problème |
| 2 | Rouge | Bloque le déplacement, agit comme un mur |
| 3 | Jaune | Même effet que Rouge, bloque le déplacement |
| 4 | Bleu | Si adjacent à **Jaune**, ou l'odeur du Joueur est *orange*, bloque le déplacement. Sinon, peut être traversée |
| 5 | Violet | Case glissante, envoie le joueur sur la case suivante dans le sens de son déplacement (et l'empêche de bouger ou changer de direction pendant ce temps). **Violet** change l'odeur en _citron_ |
| 6 | Orange | Change l'odeur du joueur en _orange_ |

---
# Format des niveaux (lorsque transférés sous forme textuelle)
Les niveaux sont représentés par une liste bidimensionnelle (aussi appelée liste de liste), ou chaque élément atomique correspond à l'ID de la couleur de la case.
Un exemple de niveau simple peut être le suivant :
```c
[[1, 1, 1], [0, 0, 0], [1, 1, 1]]
```
Ou, formaté de façon plus lisible humainement :
```c
[
	[1, 1, 1],
	[0, 0, 0],
	[1, 1, 1]
]
```
Correspond à ce labyrinthe-ci

![Puzzle donné par Papyrus dans Snowdin](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDbweV17KLaZsqve9ufOqfEj2OgfrtgnP_Hu9b0RE7kXCGkV00)

(A noter : une virgule simple '_,_' sert de séparateur entre deux cases d'une même ligne, un crochet fermant suivi d'une virgule '_],_' sert de séparateur entre deux lignes)

# Fonctionnement du solveur
Le solveur est appelé de cette manière :
```bash
`./main.exe solve <level_file>
```
et retourne une chaîne de caractères pouvant ressembler à ça:
`3331000033`
Cette chaîne correspond à un chemin de déplacement, où chaque chiffre correspond à une direction :
| Chiffre | Direction |
|---------|-----------|
| 0 | Droite |
| 1 | Haut |
| 2 | Gauche |
| 3 | Bas |
Par exemple, la chaîne `003233` Signifie qu'il faut aller à droite 2 fois, en bas, à gauche, puis en bas 2 fois
A noter : cette chaîne correspond aux touches pressées. Dans le cas des cases violettes par exemple, il peut n'y avoir qu'une seule touche de pressée qui déplace le joueur de plusieurs cases. Il faut prendre ça en compte dans l'affichage.

# Format des fichiers level-part.
Les fichiers level-part sont les fichiers contenant les niveaux de 8\*8 utlilisés pour générer aléatoirement des niveaux plus grands
Le fichier *level-part_index.txt* contient pour chaque level-part son ID suivi de la position de chacune de ses ouvertures dans le sens direct
Format :
```
ID[Complexité][Ouverture Est, Ouverture Nord, Ouverture Ouest, Ouverture Est]
```
Exemple :
```
2[1][5,3,6,2]
``` 
Ce level-part est d'ID 2, de complexité 1, son ouverture Est est en (7, 5), son ouverture Nord est en (3, 0), etc...

# Format général du code
Il est important de faire un **retour à la ligne** avant chaque ouverture de crochet :
plutôt que d'écrire le code de cette façon
```c
if condition {
	...
}
```
Il est beaucoup plus lisible de l'écrire de cette manière
```c
if condition
{
	...
}
```
Cela se remarque notamment lorsque plusieurs blocs sont imbriqués. De nombreuses personnes en cours de programmation l'écrivent avec le format 1, mais le 2 est plus clair et officiel (tous les projets importants s'en servent, et c'est recommandé par l'inventeur du C)