// File Name    : events.js
// Purpose      : This file is used to handle all user events within the game.

// Imports
import * as UI from "./ui.js";  

// Global Variables
let board; 


// Name         : initEvents
// Description  : This function is used to inintalize all global variables within the events.js file.
// Parameters   : board :   This is the game board. 
// Return Value : Void. 
export function init(gameBoard)
{
    // Copy the inital board data over for later use. 
    board = gameBoard; 
    return;  
}


// Event Delegation for the Sudoku board.
// Element Name : sudokuBoard
// Event Type   : Click 
// Description  : This event gets invoked anytime a user clicks on the sudoku board and is used to figure out which
//                cell got clicked (if any). 
let sudokuBoard = document.getElementById("sudokuBoard");
sudokuBoard.addEventListener("click", (e) => {
    // Figure out which cell got clicked and its position on the board. 
    let cell = {row:undefined, col:undefined, value:undefined};
    cell.row = e.target.dataset.row;
    cell.col = e.target.dataset.col; 
    cell.value = Number(e.target.innerText); 

    // Check to see if the cell has a value. 
    if (cell.value === "")
    {
        console.log(`Empty Cell (Row:${cell.row} Col:${cell.col})`); 
        return; 
    }

    // Highlight all cells that contain the same value as the clicked cell. 
    UI.highlightValues(cell.value, board);

    // Add the highlighted number value into the cell (if a number has already been pressed). 
}); 