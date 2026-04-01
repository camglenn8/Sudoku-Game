// Imports
import { DIFFICULTY } from "./constants.js";
import { Sudoku } from "./game.js";
import * as UI from "./ui.js"; 
import * as EVENTS from "./events.js"; 

// Instantiate a new Game object. 
let sudoku = new Sudoku(); 

// Generate a board. 
let board = sudoku.GenerateBoard(DIFFICULTY.EASY); 

// Initialize the events (pass events the board). 
EVENTS.init(sudoku, board);  

// Display the board. 
UI.displayBoard(board);  