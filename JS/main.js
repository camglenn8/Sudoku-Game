// Imports
import { Sudoku } from "./game.js";
import * as UI from "./ui.js"; 

// Instantiate a new Game object. 
let sudoku = new Sudoku(); 

// Generate a board. 
let board = sudoku.GenerateBoard("easy"); 

// Display the board. 
UI.DisplayBoard(board);  

console.log(board); 