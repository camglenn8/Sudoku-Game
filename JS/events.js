// File Name    : events.js
// Purpose      : This file is used to handle all user events within the game.

// Imports
import { EMPTY_CELL } from "./constants.js";
import * as UI from "./ui.js";  

// Global Variables
let board; 
let selectedCell = {row:undefined, col:undefined, value:undefined};  


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
    selectedCell.row = e.target.dataset.row;
    selectedCell.col = e.target.dataset.col; 
    selectedCell.value = Number(e.target.innerText); 

    // Check to see if the cell has a value. 
    if (selectedCell.value === "")
    {
        console.log(`Empty Cell (Row:${selectedCell.row} Col:${selectedCell.col})`); 
        return; 
    }

    // Highlight all cells that contain the same value as the clicked cell. 
    UI.highlightValues(selectedCell.value, board);

    // Add the highlighted number value into the cell (if a number has already been pressed). 
}); 





// Event Delegation for the number section.
// Element Name : numberSection
// Event Type   : Click 
// Description  : This event gets invoked anytime a user clicks anywhere within the number section below the sudoku board. 
let numberSection = document.getElementById("numberSection"); 
numberSection.addEventListener("click", (e) => {
    // Figure out which number was clicked. Ignore if anything else was clicked within the numberSection. 
    let number = Number(e.target.dataset.number);
    if (Number.isNaN(number))
    {
        return; 
    };

    // Add the selected number to the board (if possible). 
    if (selectedCell.value === EMPTY_CELL)
    {
        // Add the number & update the board. 
        board[selectedCell.row][selectedCell.col] = number; 
        UI.updateBoard(number, selectedCell); 
    };
}); 