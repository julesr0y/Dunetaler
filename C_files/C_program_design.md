

## Level generator:
Writes the generated level in the file given as argument. Also writes a collision map for each smell : this collision map is used to determine whether the player can pass and what effects are applied to them when they have the given smell
The function that writes those collision maps is separated from the one that generates levels, because it is also used when loading levels (the collision maps aren't stored).

## Level solver :
Uses a variant of breadth first search. The tiles are marked as "visited" only for the current smell, therefore they need to be explored both when smelling lemon and orange. the slippery tiles are never marked as visited because their effect depends on the starting direction