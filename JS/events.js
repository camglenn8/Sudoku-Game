// File Name    : events.js
// Purpose      : This file is used to handle all user events within the game.

// Imports
import { EMPTY_CELL } from "./constants.js";
import * as UI from "./ui.js";  

// Variables
let board; 
let selectedCell = {row:undefined, col:undefined, value:undefined, isOriginal:false};  
let game;  


// Name         : initEvents
// Description  : This function is used to inintalize all global variables within the events.js file.
// Parameters   : board :   This is the game board. 
// Return Value : Void. 
export function init(sudokuGame, gameBoard)
{
    // Copy the inital board data over for later use. 
    board = gameBoard; 
    game = sudokuGame; 
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
    selectedCell.isOriginal = e.target.dataset.isOriginal === "true"; // Returns a boolean instead of a string. 
    
    // Highlight the cell. 
    UI.focusCell(selectedCell); 
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

    // Add the selected number to the board (if the highlighted cell is empty)
    if (selectedCell.value === EMPTY_CELL)
    {
        // Add the number to the board[] & update the board. 
        board[selectedCell.row][selectedCell.col] = number; 
        UI.updateBoard(number, selectedCell); 

        // Update the selectedCell variable with new value & change the cells isOriginal to false.
        selectedCell.value = number; 
        selectedCell.isOriginal = false; 

        // Check to see if the game is over. 
        if (game.IsBoardFull() === true)
        {
            // Check to see if its a winning board. 
            if (game.IsBoardValid() === true)
            {
                // This is a winning board.
                console.log("YOU WON!!");
                alert("YOU WON!"); 
            } 
            else
            {
                // This board is invald.
                console.log("Try Again."); 
                alert("Try Again."); 
            }
        };
    };
}); 




// Event Delegation for the number section.
// Element Name : eraseBtn
// Event Type   : Click 
// Description  : This event gets invoked anytime a user clicks the eraser button. 
let eraseBtn = document.getElementById("eraseBtn"); 
eraseBtn.addEventListener("click", () => { 
    // Check to see if there's a valid orignal value to erase from the sudoku board.
    if (selectedCell.isOriginal == false)
    {
        // Remove this value from the board[]. 
        board[selectedCell.row][selectedCell.col] = EMPTY_CELL; 

        // Update the cells value to be empty. 
        selectedCell.value = EMPTY_CELL;
        
        // Update the board UI.
        UI.updateBoard(EMPTY_CELL, selectedCell); 
    }
}); 