## This documentation is only to be used as internal reference : the client shouldn't ever have to read it. It contains the differents standards shared by the C, PHP and JS code to guarantee standardization of the code (and facilitate data transfer)
---
# Level tile
Chaque case du niveau est représentée par son ID, il faut penser à inclure un _enum_ dans le code afin de pouvoir désigner les cases par leur couleur (même si elles sont traitées par leur ID en interne)
Voici un tableau référençant les cases, leur couleur et leur effet (sujet à modification ultérieure) :

| ID | Coulor | Effect |
|----|---------|-------|
| 1 | Beige | No effect, can be passed through |
| 2 | Red | Blocks movement, acts as a wall |
| 3 | Yellow | Same effect as **Red** and makes adjacent **Blue** tiles act as walls |
| 4 | Blue | If next to **Yellow**, or the player's scent is *orange*, acts as a wall. Else, can be passed through |
| 5 | Purple | Slippery tile, makes the player slide to the next tile, or bounce if the next tile is a wall. Also changes the player's scent to *Lemon* |
| 6 | Orange | Changes the player's scent to *orange* |
---
# Level format (when stored in text files)
Levels are represented as a 2D array where each element represents the ID of a tile
Here is an example of such a level :
```c
[[1, 1, 1], [0, 0, 0], [1, 1, 1]]
```
Which can be thought as follows :
```c
[
	[1, 1, 1],
	[0, 0, 0],
	[1, 1, 1]
]
```
And corresponds to this maze

![Puzzle given by Papyrus in Snowdin](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDbweV17KLaZsqve9ufOqfEj2OgfrtgnP_Hu9b0RE7kXCGkV00)

(Important : a lone comma '_,_' is used as separator between two tiles of the same line, a closing bracket followed by a comma '_],_' is used as separator between two lines)