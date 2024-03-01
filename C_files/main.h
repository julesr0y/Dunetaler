#include <stdlib.h>
#include <stdbool.h>

#define DEBUG 0
int debug = 0; // !!! ONLY FOR GDB TO DELETE AFTERWARDS !!!
#define SELECT_MAX_TRIES 4 // Number of tries before giving up on finding a fitting tile
#define MAX_PATH_SIZE 2500 // Maximum size of the solver's path, a bit more than a full 48*48 maze tile number

/** @struct GraphNode
 * @brief Structure used to hold a specific node
 * @var GraphNode::color
 * Member 'color' contains the color of the node
 * @var GraphNode::x
 * Member 'x' contains the x coordinate of the node
 * @var GraphNode::y
 * Member 'y' contains the y coordinate of the node
 * @var GraphNode::visited_orange
 * Member 'visited_orange' is true if the node has been visited by the player with the orange scent
 * @var GraphNode::visited_lemon
 * Member 'visited_lemon' is true if the node has been visited by the player with the lemon scent
 * @var GraphNode::neighbor_count_lemon
 * Member 'neighbor_count_lemon' contains the number of neighbors that the node has for the lemon scent
 * @var GraphNode::neighbor_count_orange
 * Member 'neighbor_count_orange' contains the number of neighbors that the node has for the orange scent
 * @var GraphNode::neighbors_lemon
 * Member 'neighbors_lemon' contains the adresses of all the neighbors of the node for the lemon scent
 * @var GraphNode::neighbors_orange
 * Member 'neighbors_orange' contains the adresses of all the neighbors of the node for the orange scent
 */
typedef struct GraphNode 
{
	int color;
	int x;
	int y;
	bool visited_orange;
	bool visited_lemon;
	int neighbor_count_lemon;
	int neighbor_count_orange;
	struct NodeConnection** neighbors_lemon;
	struct NodeConnection** neighbors_orange;
} GraphNode;

/** @struct NodeConnection
 *  @brief Structure used to hold the connection between two nodes
 *  @var NodeConnection::node
 *  Member 'node' contains the adress of the node to which the connection is made
 *  @var NodeConnection::scent_change
 *  Member 'scent_change' contains the scent change that will be applied to the player when he uses that connection
 *  @var NodeConnection::cardinal_direction
 * Member 'cardinal_direction' contains the direction that the player should go to so as to use that connection
 */
typedef struct NodeConnection
{
	GraphNode* node;
	int scent_change;
	int cardinal_direction; // The direction you should go to in the maze to reach said neighbor
} NodeConnection;

/** @struct Graph
 *  @brief Structure used to hold the nodes of a Graph
 *  @var Graph::width
 *  Member 'width' contains the width of the range between the maximum x value of a graph's node and the minimum
 *  @var Graph::height
 *  Member 'height' contains the width of the range between the maximum y value of a graph's node and the minimum
 *  @var Graph::root_node
 *  Member 'root_node' contains the first node of the graph
 *  @var Graph::node_list
 *  Member 'node_list' contains all the adresses of all the nodes of the graph
 */
typedef struct Graph 
{
	int width;
	int height;
	GraphNode* root_node;
	GraphNode** node_list;
} Graph;

typedef struct LevelPart
{
	int ID;
	int complexity;
	int opening_positions[4];
	int** level_part;
} LevelPart;

typedef struct LevelPartList
{
	int length;
	LevelPart** list;
} LevelPartList;


/** \fn GraphNode* createGraphNode(int color, int x, int y)
 *  \brief Creates a node corresponding to a tile
 *  \param color The color of the tile
 *  \param x The x coordinates of the tile
 *  \param y The y coordinates of the tile
 *  \return Adress of the new node
*/
GraphNode* createGraphNode(int color, int x, int y);

/** \fn Graph* twoDArrayToGraph(int** array)
 *  \brief Converts an array to a graph
 *  \param array The 2D array that must be converted
 *  \returns Adress of the graph
*/
Graph* twoDArrayToGraph(int** array);

/** \fn int **generateMaze(int width, int height, int complexity, char *output_file)
 *  \brief Generates a full maze and stores it in a file
 *  \param width The width of the maze
 *  \param height The height of the maze
 *  \param complexity How hard on average should the maze be (will change the selected maze parts)
 *  \param output_file The path of the file to whom the maze will be written to
 *  \return Adress of the maze
*/
int** generateMaze(LevelPartList* level_parts_list, int complexity, char* output_file);

/** \fn int **loadMaze(char *input_file)
 *  \brief Loads a maze from a file to use in the program
 *  \param input_file The path of the file from which the maze will be loaded
 *  \returns Adress of the maze
*/

LevelPart* selectFittingTile(LevelPartList* level_parts_list, int direction, int opening_position, int complexity, int maze_position);

int **loadMaze(char *input_file);

/** \fn void addNeighborToNode(GraphNode* node, GraphNode* neighbor, int scent, int scent_change, int cardinal_direction)
 *  \brief Adds one of a node's neighbors, along with all the required data
 *  \param node The adress of the node whose neighbor should be added
 *  \param neighbor The adress of the neighbor to be added
 *  \param scent The scent of the connection (It is only usable if the player's scent is equal to this value)
 *  \param scent_change The new scent of the player after crossing that connection (non zero for ORANGE and PURPLE tiles)
 *  \param cardinal_direction The direction that the player should go to so as to use that connection
*/
void addNeighborToNode(GraphNode* node, GraphNode* neighbor, int scent, int scent_change, int cardinal_direction);

/** \fn bool addNeighbor(GraphNode*** node_2D_array, int i, int j, int direction, int scent)
 *  \brief Selects the neighbor of a node in the specified direction and add it to the node's neighbors
 *  \param node_2D_array The adress of the 2D array from which select the node
 *  \param i The x coordinates of the node within node_2D_array
 *  \param j The y coordinates of the node within node_2D_array
 *  \param direction The direction of the neighbor relative to the node
 *  \param scent The scent of the connection (It is only usable if the player's scent is equal to this value)
 *  \returns True if the neighbor was successfully added, False if not
*/
bool addNeighbor(GraphNode*** node_2D_array, int i, int j, int direction, int scent);

/** \fn int detectColor(GraphNode*** node_2D_array, int i, int j, int direction)
 *  \brief Returns wthe color of a tile next to another tile in an array
 *  \param node_2D_array The adress of the 2D array from which select the node
 *  \param i The x coordinates of the node within node_2D_array
 *  \param j The y coordinates of the node within node_2D_array
 *  \param direction The direction of the neighbor relative to the node
 *  \return ID of the color
*/
int detectColor(GraphNode*** node_2D_array, int i, int j, int direction);

char *findShortestPath(Graph *graph, GraphNode *current_node, GraphNode *end_node, int scent);

int findShortestString(char **string_array, int array_length);

void findShortestPathFormatter(Graph *graph, GraphNode *current_node, GraphNode *end_node, int scent, char *formatted_path_container);

enum tile_color {NO_COLOR, BEIGE, RED, YELLOW, BLUE, PURPLE, COLOR_ORANGE};
enum direction {EAST, NORTH, WEST, SOUTH};
enum maze_position {MAZE_BEGINNING, MAZE_MIDDLE, MAZE_END};

enum scent {NO_SCENT, LEMON, ORANGE, BOTH_SCENT};
#define NO_CHANGE 0 // Equivalent of NO_SCENT for scent changes
