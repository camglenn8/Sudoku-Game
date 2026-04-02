// File Name    : ui.js
// Purpose      : The purpose of this file is to update the user interface with any changes in the game. 

import { EMPTY_CELL } from "./constants.js";


// Name            : DisplayBoard
// Description     : This function is used to display all data regarding the current Sudoku board. 
// Parameters      : board[][]  :   This is the 2D array containing the current sudoku board.  
// Return  Value   : Void. 
export function displayBoard(board)
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

            // Also add the orginal "fixed" state so that users can't touch these values. 
            cell.dataset.isOriginal = true;  

            // Add the value to cell at the same position on the board.
            if (board[r][c] === EMPTY_CELL)
            {
                 cell.textContent = ""; 
            }
            else
            {
                cell.textContent = board[r][c]; 
            }
            
            // Append the cell to the table row. 
            tableRow.appendChild(cell);
        };

        // Append the table row to the table.
        table.appendChild(tableRow);     
    };
    
    return; 
}





// Name            : highilightValues
// Description     : This function is used to highlight all the same values on board based on the selected value.  
// Parameters      : int value  :   This is the value the user clicked and should highlight all like values on the board.
// Return  Value   : Void. 
export function highlightValues(value, board)
{
    // Select the board element to be able to update.
    let table = document.getElementById("sudokuBoard"); 

    // Loop through the board to find like values. 
    for (let r = 0; r < 9; r++)
    {
        for (let c = 0; c < 9; c++)
        {
            // Query the table to find the current cells positon using the dataset info. 
            let cell = table.querySelector(`td[data-row="${r}"][data-col="${c}"]`);

            // Reset all highlighted values. 
            cell.classList.remove("highlightCell"); 

            // Compare values. 
            if (board[r][c] === value && board[r][c] !== EMPTY_CELL)
            {   
                // Highlight this cell.
                cell.classList.add("highlightCell");  
            }
        }
    }
    return; 
}





// Name            : updateBoard
// Description     : This function is used to update the cell with the selected value (if valid).  
// Parameters      : int num    :   This is the number value to be used to update the cell on the board.
//                   cell{}     :   This is a cell object used to determine where to place the num value. 
// Return  Value   : Void. 
export function updateBoard(num, cell)
{
    // Select the board.
    let currentCell = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`); 

    // Check to see if you should be removing OR adding a value. 
    if (num !== EMPTY_CELL)
    {
        // Update the value at this cell positoin with the number. 
        currentCell.textContent = num; 

        // Add a dataset value that identifies that this value is not orignal to the beggining puzzle. 
        currentCell.dataset.isOriginal = false; 
    }
    else
    {
        // Remove the currnet value at this cell position. 
        currentCell.textContent = ""; 

        // Revert the isOriginal dataset back to true. 
        currentCell.dataset.isOriginal = true; 
    }
    
    return; 
}




// Name            : focusCell
// Description     : This function is used to focus on the selected cell by the user.  
// Parameters      : cell{}     :   This is a cell object that holds all cell data (row, col, value, isOriginalCell).  
// Return  Value   : Void. 
export function focusCell(cell)
{
    // Remove the previous cells focus (if possible).
    let prevCell =document.querySelector("td[class='cell focus']"); 
    if (prevCell !== null)
    {
        prevCell.classList.toggle("focus"); 
    }

    // Select the currently selected cells element. 
    let selectedCell = document.querySelector(`td[data-row="${cell.row}"][data-col="${cell.col}"]`); 
    if (selectedCell !== null)
    {
        // Add the focus class to this cell. 
        selectedCell.classList.add("focus"); 
    };

    return;
}