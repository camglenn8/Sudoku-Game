// Imports
import { DIFFICULTY } from "./constants.js";
import { Sudoku } from "./game.js";
import * as UI from "./ui.js"; 
import * as EVENTS from "./events.js"; 

// Get the selected difficulty.
const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty"); 
console.log(difficulty); 

// Instantiate a new Sudoku object. 
let sudoku = new Sudoku(); 

// Generate a board. 
let board = sudoku.GenerateBoard(difficulty); 

// Initialize the events.
EVENTS.init(sudoku, board);  

// Display the board. 
UI.displayBoard(board);  