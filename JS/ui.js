// File Name    : ui.js
// Purpose      : The purpose of this file is to update the user interface with any changes in the game. 

import { EMPTY_CELL } from "./constants.js";


// Name            : DisplayBoard
// Description     : This function is used to display all data regarding the current Sudoku board. 
// Parameters      : board[][]  :   This is the 2D array containing the current sudoku board.  
// Return  Value   : Void. 
export function DisplayBoard(board)
{
    // Select the table element. 
    let table = document.getElementById("sudokuBoard");

    // Dynamically create the cells that go into table.
    for (let r = 0; r < 9; r++)
    {
        // Dynamically create a row for the table.  
        let tableRow = document.createElement("tr"); 

        for (let c = 0; c < 9; c++)
        {
            // Create a cell and append to the current row + add class. 
            let cell = document.createElement("td"); 
            cell.classList.add("cell");

            // Add the cells position to the elements dataset. 
            cell.dataset.row = r; 
            cell.dataset.col = c; 

            // Add the value to cell at the same position on the board.
            if (board[r][c] === EMPTY_CELL)
            {
                cell.innerText = " "; 
            }
            else
            {
                cell.innerText = board[r][c]; 
            }
            
            // Append the cell to the table row. 
            tableRow.appendChild(cell);
        };

        // Append the table row to the table.
        table.appendChild(tableRow);     
    };
    
    return; 
}