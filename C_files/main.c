#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include "main.h"

// BEIGE : walkable tile
// RED : wall
// YELLOW : wall
// BLUE : wall when next to YELLOW
// PURPLE : slide

int maze_width;
int maze_height;

int** generateMaze(LevelPartList* level_parts_list, int complexity, char* output_file)
{
	int i, j;
	int maze_level_width = maze_width/8;
	int maze_level_height = maze_height/8;
	LevelPart*** maze_level = (LevelPart***)malloc(maze_level_width * sizeof(LevelPart**));
	for (i = 0; i < maze_level_width; i++)
		maze_level[i] = (LevelPart**)malloc(maze_level_height * sizeof(LevelPart*));

	// We initialize the maze_level to NULL
	for (i = 0; i < maze_level_width; i++)
		for (j = 0; j < maze_level_height; j++)
			maze_level[i][j] = NULL;



	LevelPart* current_level_part = selectFittingTile(level_parts_list, WEST, 0, complexity, MAZE_BEGINNING); // We select a starting tile among those having their upper left corner open
	if (current_level_part == NULL){
		printf("Error : no tile fitting the beginning\n");
		return NULL;
	}
	maze_level[0][0] = current_level_part;
	i = j = 0;
	bool is_stuck;

	while (i != maze_level_width - 1 || j != maze_level_height - 1)
	{
		int possible_directions[4] = {0, 0, 0, 0};

		do
		{
			is_stuck = true;
			for (int k = 0; k < 4; k++) possible_directions[k] = 0;

			// We determine the possible directions
			if (i != 0 && maze_level[i-1][j] == NULL)
			{
				possible_directions[WEST] = 1;
				is_stuck = false;
			}
			if (i != maze_level_width - 1 && maze_level[i+1][j] == NULL)
			{
				possible_directions[EAST] = 1;
				is_stuck = false;
			}
			if (j != 0 && maze_level[i][j-1] == NULL)
			{
				possible_directions[NORTH] = 1;
				is_stuck = false;
			}
			if (j != maze_level_height - 1 && maze_level[i][j+1] == NULL)
			{
				possible_directions[SOUTH] = 1;
				is_stuck = false;
			}
			if (is_stuck) // If we are stuck we change to a random tile then check again
			{
				do
				{
					i = rand() % maze_level_width;
					j = rand() % maze_level_height;
				} while (maze_level[i][j] == NULL);
			}
		} while (is_stuck);

		// We select a random direction among the possible ones
		int random_direction = rand() % 4;
		while (possible_directions[random_direction] == 0)
			random_direction = rand() % 4;

		bool is_next_tile_ending = false;
		if ((i == maze_level_width-2 && j == maze_level_height - 1 && random_direction == EAST) ||  (j == maze_level_height-2 && i == maze_level_width - 1 && random_direction == SOUTH))
			is_next_tile_ending = true;

		// We select a random tile among those fitting the opening of the current tile in the selected direction
		int opening_position = maze_level[i][j]->opening_positions[random_direction];
		LevelPart* next_level_part = selectFittingTile(level_parts_list, (random_direction+2)%4, opening_position, complexity, is_next_tile_ending+1);
		if (next_level_part == NULL){
			printf("Error : no tile fitting opening %d of %d side of tile %d\n", opening_position, random_direction, maze_level[i][j]->ID);
			return NULL; // If there is no tile fitting the opening, we stop the generation
		}

		// We place the selected tile in the maze_level
		switch (random_direction)
		{
		case NORTH:
			maze_level[i][j - 1] = next_level_part;
			j--;
			break;
		case SOUTH:
			maze_level[i][j + 1] = next_level_part;
			j++;
			break;
		case EAST:
			maze_level[i + 1][j] = next_level_part;
			i++;
			break;
		case WEST:
			maze_level[i - 1][j] = next_level_part;
			i--;
			break;
		}
	}

	// Then we put random tiles in the remaining holes, while checking that the tiles have at least one connection
	for (i = 0; i < maze_level_width; i++)
		for (j = 0; j < maze_level_height; j++)
			if (maze_level[i][j] == NULL)
			{
				/// !!! CHANGE THIS PART LATER ONCE I MAKE A FUNCTION TO DETECT POSSIBLE OPENING POSITIONS
				int open_direction, open_position;
				if (i != 0)
				{
					open_direction = WEST; 
					if (maze_level[i-1][j] != NULL)open_position = maze_level[i-1][j]->opening_positions[EAST];
					else open_position = (rand()%6)+1;
				}
				else
				{
					open_direction = EAST;
					if (maze_level[i+1][j] != NULL) open_position = maze_level[i+1][j]->opening_positions[WEST];
					else open_position = (rand()%6)+1;
				}
				LevelPart* random_level_part = selectFittingTile(level_parts_list, open_direction, open_position, complexity, MAZE_MIDDLE);
				maze_level[i][j] = random_level_part;
			}

	// Then we expand the level id to true levels
	int** maze = (int**)malloc(maze_width * sizeof(int*));
	for (i = 0; i < maze_width; i++)
		maze[i] = (int*)malloc(maze_height * sizeof(int));

	for (i = 0; i < maze_width; i++)
		for (j = 0; j < maze_height; j++)
		{
			maze[i][j] = maze_level[i / 8][j / 8]->level_part[j%8][i%8];
		}



	// Save the maze to output_file
	FILE* file = fopen(output_file, "w");
	if (file == NULL)
	{
		printf("Error while opening file %s\n", output_file);
		return NULL;
	}

	// Write the maze to the file
	fprintf(file, "[");
	for (i = 0; i < maze_height; i++)
	{
		fprintf(file, "[");
		for (j = 0; j < maze_width; j++)
		{
			fprintf(file, "%d", maze[j][i]);
			if (j != maze_width - 1)
				fprintf(file, ",");
		}
		fprintf(file, "]");
		if (i != maze_height - 1)
			fprintf(file, ",");
	}
	fprintf(file, "]");
	fclose(file);

	return maze; // TO DELETE
}

LevelPart* selectFittingTile(LevelPartList* level_parts_list, int direction, int opening_position, int complexity, int maze_position) // This function selects a random tile to fit the given opening
{
	int i, tries_number, random_index;
	int* fitting_tiles = (int*)malloc(0);
	int fitting_tiles_length = 0;
	for (i = 0; i < level_parts_list->length; i++)
	{
		tries_number = 0;
		if (level_parts_list->list[i]->opening_positions[direction] == opening_position && ((maze_position != MAZE_END) != (level_parts_list->list[i]->opening_positions[EAST] == 7))&& ((maze_position != MAZE_BEGINNING) != (level_parts_list->list[i]->opening_positions[WEST] == 0))) // We want beginning and ending posiitons only in those cases
		{
			fitting_tiles_length++;
			fitting_tiles = (int*)realloc(fitting_tiles, fitting_tiles_length * sizeof(int));
			fitting_tiles[fitting_tiles_length - 1] = i;
		}
	}
	if (fitting_tiles_length == 0) return NULL;
	do
	{
		random_index = rand() % fitting_tiles_length;
	} while (level_parts_list->list[fitting_tiles[random_index]]->complexity != complexity && tries_number++ < SELECT_MAX_TRIES);
	int fitting_tile_index = fitting_tiles[random_index];
	free(fitting_tiles);

	return level_parts_list->list[fitting_tile_index];
}

int **loadMaze(char *input_file)
{
	FILE* file = fopen(input_file, "r");
	if (file == NULL)
	{
		printf("Error while opening file %s\n", input_file);
		return NULL;
	}

	// Count the number of rows and columns
	maze_height =  -1;
	maze_width = 0;
	char ch;
	while ((ch = fgetc(file)) != EOF)
	{
		if (ch == '[')
			maze_height++;
		else if (ch == ',' && maze_height == 1)
			maze_width++;
	}
	// Rewind the file to the beginning
	rewind(file);

	int i, j;
	int **maze = (int**)malloc(maze_width * sizeof(int*));
	for (i = 0; i < maze_width; i++)
		maze[i] = (int*)malloc(maze_height * sizeof(int));

	// Read the maze from the file
	char line[2048];  // Assuming maximum line length of 2048 characters
	i = 0, j = 0;
	if (fgets(line, sizeof(line), file) != NULL)
	{
		char* token = strtok(line, "[,]");
		while (token != NULL)
		{
			if (line[0] == '#') continue; // We skip lines beginning by '#' as they are comments
			maze[i][j] = atoi(token);
			i++;
			if (i == maze_width)
			{
				j++;
				i = 0;
			}
			token = strtok(NULL, "[,]");
		}
	}
	fclose(file);
	return maze;
}

Graph* twoDArrayToGraph(int** array)
{
	int i, j;
	GraphNode*** node_2D_array = (GraphNode***)malloc(maze_width * sizeof(GraphNode**));
	for (i = 0; i < maze_width; i++)
		node_2D_array[i] = (GraphNode**)malloc(maze_height * sizeof(GraphNode*));
	GraphNode** node_list = (GraphNode**)malloc(maze_width * maze_height * sizeof(GraphNode*));

	// Create a node for each element of the array
	for (i = 0; i < maze_width; i++)
		for (j = 0; j < maze_height; j++)
		{
			node_2D_array[i][j] = createGraphNode(array[i][j], i, j);
			node_list[i * maze_height + j] = node_2D_array[i][j];
		}

	// Determine each node's neighbors
	for (i = 0; i < maze_width; i++)
	{
	 for (j = 0; j < maze_height; j++)
	 {
		  // If the node is not on the right border
		  if (i != maze_width - 1)
		  {
				addNeighbor(node_2D_array, i, j, EAST, LEMON);
				addNeighbor(node_2D_array, i, j, EAST, ORANGE);
		  }
		  if (j != 0)
		  {
				addNeighbor(node_2D_array, i, j, NORTH, LEMON);
				addNeighbor(node_2D_array, i, j, NORTH, ORANGE);
		  }
		  if (i != 0)
		  {
				addNeighbor(node_2D_array, i, j, WEST, LEMON);
				addNeighbor(node_2D_array, i, j, WEST, ORANGE);
		  }
		  if (j != maze_height - 1)
		  {
				addNeighbor(node_2D_array, i, j, SOUTH, LEMON);
				addNeighbor(node_2D_array, i, j, SOUTH, ORANGE);
		  }
		}
	}

	// Create the graph
	Graph* graph = (Graph*)malloc(sizeof(Graph));
	graph->width = maze_width;
	graph->height = maze_height;

	graph->root_node = node_2D_array[0][0]; // ONLY FOR TESTING, TO DELETE
	graph->node_list = node_list;
	return graph;

}
 
void addNeighborToNode(GraphNode* node, GraphNode* neighbor, int scent, int scent_change, int cardinal_direction) { // Adds a node into another one's neighbors
	if (scent == BOTH_SCENT || scent == LEMON)
	{
		node->neighbors_lemon = (NodeConnection**)realloc(node->neighbors_lemon, (node->neighbor_count_lemon + 1) * sizeof(NodeConnection*));
		node->neighbors_lemon[node->neighbor_count_lemon] = (NodeConnection*)malloc(sizeof(NodeConnection));
		node->neighbors_lemon[node->neighbor_count_lemon]->node = neighbor;
		node->neighbors_lemon[node->neighbor_count_lemon]->scent_change = scent_change;
		node->neighbors_lemon[node->neighbor_count_lemon]->cardinal_direction = cardinal_direction;
		node->neighbor_count_lemon++;
	}
	if (scent == BOTH_SCENT || scent == ORANGE)
	{
		node->neighbors_orange = (NodeConnection**)realloc(node->neighbors_orange, (node->neighbor_count_orange + 1) * sizeof(NodeConnection*));
		node->neighbors_orange[node->neighbor_count_orange] = (NodeConnection*)malloc(sizeof(NodeConnection));
		node->neighbors_orange[node->neighbor_count_orange]->node = neighbor;
		node->neighbors_orange[node->neighbor_count_orange]->scent_change = scent_change;
		node->neighbors_orange[node->neighbor_count_orange]->cardinal_direction = cardinal_direction;
		node->neighbor_count_orange++;
	}
}

bool addNeighbor(GraphNode*** node_2D_array, int i, int j, int direction, int scent) { // Adds the neighbor of the [i][j] tile in the specified direction
	int new_row, new_col;
	int scent_change = NO_CHANGE;
	int distance = 1 + (direction/4); // Only used for purple tiles, Allow the function to be called recursively by adding 4 to the direction for each purple tile in a row
	direction = direction % 4;

	 // Determine the new coordinates based on the direction
	switch (direction) 
	{
		case EAST:
			new_row = j;
			new_col = i + distance; // Almost always i+1 unless called recursively for purple tiles
			break;
		case NORTH:
			new_row = j - distance;
			new_col = i;
			break;
		case WEST:
			new_row = j;
			new_col = i - distance;
			break;
		case SOUTH:
			new_row = j + distance;
			new_col = i;
			break;
		default:
			return false;  // Invalid direction, do nothing
	}
	if (new_row < 0 || new_row >= maze_height) return false;
	if (new_col < 0 || new_col >= maze_width) return false;
 
	GraphNode* current = node_2D_array[i][j];
	GraphNode* neighbor = node_2D_array[new_col][new_row];

	if (neighbor->color == RED || neighbor->color == YELLOW) return false;
	if (neighbor->color == BLUE) // If the neighbor is blue, we check for every adjacent tile if one of them is yellow. If it is the case, then we skip this link because the tile is blocking
	{
		for (int scan_direction = EAST; scan_direction <= SOUTH; scan_direction++)
		{
			if (detectColor(node_2D_array, new_col, new_row, scan_direction) == YELLOW) return false;
		}
		if (scent == ORANGE) return false; // If the scent is orange the blue tile cannot be walked on, so we don't link it
	}
	if (neighbor->color == COLOR_ORANGE) scent_change = ORANGE;
	if (neighbor->color == PURPLE) // If the neighbor is purple, we try to link the node to the one further up in that direction. If it fails because of a wall, then we link the node to itself (since the player will bounce)
	{
		scent_change = LEMON;
		if (!addNeighbor(node_2D_array, i, j, ((distance)*4)+direction, scent)) // Try to link the node to the one further up in that direction
		{
			addNeighborToNode(current, current, scent, scent_change, direction);
		}
		return true;
	}
	if (distance > 1) scent_change = LEMON; // If the tiles aren't adjacent it means there is a purple tile between them
	addNeighborToNode(current, neighbor, scent, scent_change, direction);
	return true;
}

int detectColor(GraphNode*** node_2D_array, int i, int j, int direction)
{
	int new_row, new_col;
	switch (direction)
	{
		case EAST:
			new_row = j;
			new_col = i + 1;
			break;
		case NORTH:
			new_row = j - 1;
			new_col = i;
			break;
		case WEST:
			new_row = j;
			new_col = i - 1;
			break;
		case SOUTH:
			new_row = j + 1;
			new_col = i;
			break;
		default:
			return -1;  // Invalid direction, do nothing
	}
	if (new_row < 0 || new_row >= maze_width) return NO_COLOR;
	if (new_col < 0 || new_col >= maze_height) return NO_COLOR;
	return node_2D_array[new_col][new_row]->color;
}

GraphNode* createGraphNode(int color, int x, int y)
{
	GraphNode* new_node = (GraphNode*)malloc(sizeof(GraphNode));
	if (new_node == NULL) return NULL;

	new_node->x = x;
	new_node->y = y;
	new_node->color = color;
	new_node->neighbors_lemon = (NodeConnection**)malloc(4*sizeof(NodeConnection*));
	new_node->neighbors_orange = (NodeConnection**)malloc(4*sizeof(NodeConnection*));
	if (new_node->neighbors_lemon == NULL || new_node->neighbors_orange == NULL) return NULL;

	new_node->neighbor_count_lemon = 0;
	new_node->neighbor_count_orange = 0;
	new_node->visited_orange = false;
	new_node->visited_lemon = false;
	return new_node;
}

void displayGraph(Graph* graph) // Function only used for debugging purposes
{
	 if (graph == NULL) {
		  printf("Invalid graph\n");
		  return;
	 }

	 printf("Lemon Graph (width: %d, height: %d)\n", graph->width, graph->height);

	 for (int i = 0; i < graph->height; i++) {
		  for (int j = 0; j < graph->width; j++) {
				GraphNode* node = graph->node_list[i * graph->width + j];
				printf("Node (%d, %d): Color: %d, Visited: %d, Neighbor Count: %d\n",
					 node->x, node->y, node->color, node->visited_lemon, node->neighbor_count_lemon);
				
				printf("\t\tNeighbors: ");
				for (int k = 0; k < node->neighbor_count_lemon; k++) {
					 GraphNode* neighbor = node->neighbors_lemon[k]->node;
					 printf("(%d, %d, %d) ", neighbor->x, neighbor->y, node->neighbors_lemon[k]->scent_change);
				}
				printf("\n");
		  }
	 }
	 printf("\n\nOrange graph\n\n");
	 for (int i = 0; i < graph->height; i++) {
		  for (int j = 0; j < graph->width; j++) {
				GraphNode* node = graph->node_list[i * graph->width + j];
				printf("Node (%d, %d): Color: %d, Visited: %d, Neighbor Count: %d\n",
					 node->x, node->y, node->color, node->visited_orange, node->neighbor_count_orange);
				
				printf("\t\tNeighbors: ");
				for (int k = 0; k < node->neighbor_count_orange; k++) {
					 GraphNode* neighbor = node->neighbors_orange[k]->node;
					 printf("(%d, %d, %d) ", neighbor->x, neighbor->y, node->neighbors_orange[k]->scent_change);
				}
				printf("\n");
		  }
	 }
	 printf("\n");

	 printf("Graph (width: %d, height: %d)\n", graph->width, graph->height);

	 for (int i = 0; i < graph->width; i++) {
		  for (int j = 0; j < graph->height; j++) {
				GraphNode* node = graph->node_list[j * graph->width + i];
				printf("%d", node->color);

				if (j < graph->width - 1) {
					 printf(",");
				}
		  }
		  printf("\n");
	 }
}

char *findShortestPath(Graph *graph, GraphNode *current_node, GraphNode *end_node, int scent)
{
	if (debug)
	{
		printf("findShortestPath: current_node (start): (%d, %d)\n", current_node->x, current_node->y);
	}

	if (graph == NULL || current_node == NULL || end_node == NULL)return NULL; // If there is a problem we simply exit
	if (current_node == end_node) return ""; // If we are at the end node, we return an empty string to indicate that

	int neighbor_count; // We declare the number of neighbors
	int new_scent;
	NodeConnection **neighbors; // We declare the neighbors

	if (scent == ORANGE) 
	{
		current_node->visited_orange = true; // We mark the current node as visited
		neighbor_count = current_node->neighbor_count_orange; // We get the number of neighbors
		neighbors = current_node->neighbors_orange; // We get the neighbors
	}
	else if (scent == LEMON)
	{
		current_node->visited_lemon = true; // We mark the current node as visited
		neighbor_count = current_node->neighbor_count_lemon; // We get the number of neighbors
		neighbors = current_node->neighbors_lemon; // We get the neighbors
	}
	char **path = (char**)malloc(neighbor_count * sizeof(char*)); // We declare the path list whose shortest member will be returned
	if (path == NULL) return NULL; // If there is a problem we exit
	char direction_text[4];// = "\0"; // We declare the direction text


	for (int i = 0; i < neighbor_count; i++) // For each of the current node's neighbors
	{ 
		path[i] = (char*)malloc(MAX_PATH_SIZE * sizeof(char)); // We allocate memory for the path
		if (path[i] == NULL)return NULL; // If there is a problem we exit
		direction_text[0] = '\0'; // Reset direction_text before concatenation
		for (int j = 0; j < MAX_PATH_SIZE; j++) path[i][j] = 'R'; // So that a path which got skipped by the continue statement doesn't get chosen by findShortestString
		NodeConnection *neighbor = neighbors[i]; // We declare neighbor, the neighbor that is being checked

		if (neighbor->scent_change != NO_CHANGE) new_scent = neighbor->scent_change; // We change the scent if needed (we go to an orange or purple tile)
		else new_scent = scent;
		if (neighbor->node->visited_orange && new_scent == ORANGE) continue; // If already visited with the current_scent, we ignore this node
		if (neighbor->node->visited_lemon && new_scent == LEMON) continue;
		path[i][0] = '\0'; // If the path didn't get skipped, we initialize it normally

		sprintf(path[i] + strlen(path[i]), "%s", findShortestPath(graph, neighbor->node, end_node, new_scent)); // We call the function recursively to ensure that every node will be checked
		sprintf(direction_text, "%d", neighbor->cardinal_direction); // We get the direction of the neighbor (and we transpose it because else it doesn't work ?)
		strcat(path[i], direction_text); // We concatenate the direction with the path
		if (debug)
		{
			printf("findShortestPath: current_node (end): (%d, %d)\n", current_node->x, current_node->y);
			printf("\tfindShortestPath: neighbor: (%d, %d)\n", neighbor->node->x, neighbor->node->y);
			if (path[i][0] != 'R') printf("\tfindShortestPath: path[%d]: %s\n", i, path[i]);
			else printf("\tfindShortestPath: path[%d]: %s\n", i, "R 200 times");
		}
	}
	if (path == NULL)return NULL; // If we have not found a path, we return NULL
	char *returned_path; // We declare the returned path
	if (neighbor_count == 0)
	{
		returned_path = (char*)malloc(5 * sizeof(char)); // We allocate memory for the path if it doesn't exist already
		if (returned_path == NULL) return NULL; // If there is a problem with allocation we exit
		for (int i = 0; i < 4; i++) returned_path[i] = 'R';
	}
	else returned_path = path[findShortestString(path, neighbor_count)]; // We get the shortest path
	if (scent == LEMON) current_node->visited_lemon = false;
	if (scent == ORANGE) current_node->visited_orange = false;
	// We clean memory
	for (int i = 0; i < neighbor_count; i++) if (path[i] != returned_path) free(path[i]);
	return returned_path; // We return the shortest path
}

void findShortestPathFormatter(Graph *graph, GraphNode *current_node, GraphNode *end_node, int scent, char *formatted_path_container)
{
	char *path;
	path = findShortestPath(graph, current_node, end_node, scent); // We get the shortest path
	if (path == NULL) // If the function ended prematurely we return "ERROR"
	{
		formatted_path_container[0] = 'E';formatted_path_container[1] = 'R';formatted_path_container[2] = 'R';formatted_path_container[3] = 'O';formatted_path_container[4] = 'R';formatted_path_container[5] = '\0';
	}
	if (path[0] == 'R') // If we didn't find any correct path
	{
		formatted_path_container[0] = 'S';
		formatted_path_container[1] = 'A';
		formatted_path_container[2] = 'D';
		formatted_path_container[3] = '\0';
		return; // We simply return the string "SAD"
	}
	for (int i = 0; i < strlen(path); i++) // We invert the position of each character from path to formatted_path
	{
		formatted_path_container[i] = path[strlen(path) - 1 - i];
	}
	formatted_path_container[strlen(path)] = '\0'; // We add the end of string character
	return;
}

int findShortestString(char **string_array, int array_length)
{
	int shortest_string = 0;
	for (int i = 0; i < array_length; i++)
	{
		if (strlen(string_array[i]) < strlen(string_array[shortest_string])) shortest_string = i;
	}
	return shortest_string;
}

LevelPartList* extractDataFromFile(const char* level_index, const char* level_list) {
	LevelPartList* level_parts_list = (LevelPartList*)malloc(sizeof(LevelPartList));
	level_parts_list->list = (LevelPart**)malloc(1*sizeof(LevelPart*));
	level_parts_list->length = 0;
	int current_line = 0;

   FILE* file_index = fopen(level_index, "r");
   if (file_index == NULL) 
   {
      printf("Failed to open the file.\n");
      return NULL;
   }

   char line[512];
   while (fgets(line, sizeof(line), file_index))
   {
		if (line[0] == '#') continue; // We skip lines beginning by '#' as they are comments
   		level_parts_list->list = (LevelPart**)realloc(level_parts_list->list, (current_line+1)*sizeof(LevelPart*));
    	level_parts_list->list[current_line] = (LevelPart*)malloc(sizeof(LevelPart));
    	level_parts_list->list[current_line]->level_part = (int**)malloc(8*sizeof(int*));
    	for (int i = 0; i <= 7; i++) level_parts_list->list[current_line]->level_part[i] = (int*)malloc(8*sizeof(int));



        // Extracting ID
        char* idStart = strchr(line, '[') + 1;
        char* idEnd = strchr(idStart, ']');
        *idEnd = '\0';
        int id = atoi(idStart);

        // Extracting Complexity
        char* complexityStart = strchr(idEnd + 1, '[') + 1;
        char* complexityEnd = strchr(complexityStart, ']');
        *complexityEnd = '\0';
        int complexity = atoi(complexityStart);

        // Extracting Openings
        char* openingsStart = strchr(complexityEnd + 1, '[') + 1;
        char* openingsEnd = strchr(openingsStart, ']');
        *openingsEnd = '\0';

      level_parts_list->list[current_line]->ID = id;
      level_parts_list->list[current_line]->complexity = complexity;
      for (int i = 0; i < 4; i++)
      	level_parts_list->list[current_line]->opening_positions[i] = openingsStart[2*i] - '0'; // Convert character to int (we use 2*i to skip over commas)
      current_line++;
      level_parts_list->length++;
   }

   fclose(file_index);


   file_index = fopen(level_list, "r");
   if (file_index == NULL) 
   {
      printf("Failed to open the file.\n");
      return NULL;
   }
   while (fgets(line, sizeof(line), file_index))
   {
      // Extracting ID
   		if (line[0] == '#') continue; // We skip lines beginning by '#' as they are comments
      char* idStart = strchr(line, '[') + 1;
      char* idEnd = strchr(idStart, ']');
      *idEnd = '\0';
      int id = atoi(idStart);

      int i, j;
      i = j = 0;
      char* token = strtok(idEnd+1, "[,]");
		while (token != NULL && token[0] != '\n')
		{
			level_parts_list->list[id]->level_part[i][j] = atoi(token);
			j++;
			if (j == 8)
			{
				i++;
				j = 0;
			}
			token = strtok(NULL, "[,]");
		}
   }

   return level_parts_list;
}

void fixPath(char *path)
{
    int index = 0;
    while(path[index])
    {     
        if(path[index] == '\\') path[index] = '/';
        index++;
    }
    return;
};

int main(int argc, char **argv)
{
	#if DEBUG == 0
		srand(time(NULL));
	#else
		srand(0);
	#endif

	if (argc < 2)
	{
		printf("Usage: %s <command>\n", argv[0]);
		return EXIT_FAILURE;
	}
	if (strcmp(argv[1], "help") == 0)
	{
		printf("\nUsage: %s <command>\n", argv[0]);
		printf("List of available commands : \n\n");
		printf("help : Display this message\n\n");
		printf("generate : Creates a maze (WIP)\n\trequired arguments : \n\t\t<height> : height of the maze\n\t\t<width> : width of the maze\n\t\t<complexity> : Complexity of the maze\n\t\t<output file> : Output file containing the maze\n\n");
		printf("solve : Solves a maze\n\trequired arguments : \n\t\t<input file> : Input file containing the maze\n\tReturns : List of directions to input to reach ending\n\n");
		printf("(abandoned) collision : Checks if there is a collision between the player and the maze (WIP)\n\trequired arguments : \n\t\t<player_coords> : Coordinates of the player (x,y)\n\t\t<object2> : Second object\n\n");
	}
	else if (strcmp(argv[1], "generate") == 0)
	{
		if (argc != 6)
		{
			printf("Usage: %s generate <height> <width> <complexity> <output file>\n", argv[0]);
			return EXIT_FAILURE;
		}
		maze_height = atoi(argv[2]);
		maze_width = atoi(argv[3]);

		char executable_folder_path[255];
		strcpy(executable_folder_path, argv[0]);
		fixPath(executable_folder_path);
		char* last_slash = strrchr(executable_folder_path, '/');
		if (last_slash != NULL) *(last_slash) = '\0';

		char filename_index[255];
		char filename_levels[255];
		strcpy(filename_index, executable_folder_path);
		strcpy(filename_levels, executable_folder_path);
		strcat(filename_index,"/level-part_index.txt");
		strcat(filename_levels,"/level-parts.txt");

		LevelPartList* level_parts_list = extractDataFromFile(filename_index, filename_levels);
		if (level_parts_list == NULL)
		{
			printf("Failed to load level parts\n");
			return EXIT_FAILURE;
		}
		generateMaze(level_parts_list, atoi(argv[4]), argv[5]);
	}
	else if (strcmp(argv[1], "solve") == 0)
	{
		if (argc != 3)
		{
			printf("Usage: %s solve <input file>\n", argv[0]);
			return EXIT_FAILURE;
		}
		int **maze = loadMaze(argv[2]);
		Graph* graph = twoDArrayToGraph(maze);
		char result_path[4096];
		int final_node_index = graph->width * graph->height - 1;
		findShortestPathFormatter(graph, graph->node_list[0], graph->node_list[final_node_index], LEMON, result_path);
		printf("%s", result_path);
	}
	else if (strcmp(argv[1], "debug") == 0) // TO DELETE !!! function used only for testing specific uses of the program, should not be used in any other case
	{
		/*int** maze = generateMaze(5, 5, 10, "./test.txt");
		maze = loadMaze("./test.txt");
		Graph* graph = twoDArrayToGraph(maze);
		displayGraph(graph);
		char result_path[4096];
		findShortestPathFormatter(graph, graph->node_list[0], graph->node_list[24], LEMON, result_path);
		printf("Path found (from end to start) : %s\n", result_path);*/
	}
	else
	{
		printf("Unknown command: %s\n", argv[2]);
	}
	
	return 0;
}