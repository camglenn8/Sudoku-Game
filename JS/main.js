// Imports
import { DIFFICULTY } from "./constants.js";
import { Sudoku } from "./game.js";
import * as UI from "./ui.js"; 

// Instantiate a new Game object. 
let sudoku = new Sudoku(); 

// Generate a board. 
let board = sudoku.GenerateBoard(DIFFICULTY.MEDIUM); 

// Display the board. 
UI.DisplayBoard(board);  

console.log(board); 