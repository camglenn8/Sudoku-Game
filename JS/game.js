// File Name    : game.js
// Description  : This file is used to start the game and handle any game logic.

// Imports
import { DIFFICULTY, CELLS_TO_REMOVE, EMPTY_CELL } from "./constants.js"; 

// Class Name   : Sudoku
// Purpose      : The purpose of this class is to model how the game Sudoku works. 
export class Sudoku 
{
    // Private Data members. 
    #board = [];            // with removed cells/playable board
    #solutionBoard = [];    // Fully solved board. 

    constructor() 
    {
        // Initialize the board with a clear board. 
        this.#board = this.#CreateEmptyBoard(); 
    }

    // Methods.

    // Name         : GenerateBoard
    // Description  : This is used to initalize an empty board and generate a unique combo to fill the board with valid numbers. 
    // Parameters   : void.
    // Return Values: void. 
    GenerateBoard(difficulty = DIFFICULTY.EASY)  
    {  
        // Initialize an empty board.
        this.#board = this.#CreateEmptyBoard(); 
        
        // Creates the combo and solves board. 
        this.SolveBoard(); 

        // Copies the current board before removing the cells so you can see the solved game. 
        this.#solutionBoard = this.#board.map(row => [...row]); 
        console.log(this.#solutionBoard); 

        // Remove cells based on the difficulty provided. 
        switch (difficulty) 
        {
            case DIFFICULTY.EASY:
                // Remove 35 cells from the board. 
                this.RemoveCells(CELLS_TO_REMOVE.EASY);
                break;
            
            case DIFFICULTY.MEDIUM:
                // Remove 45 cells from the board.
                this.RemoveCells(CELLS_TO_REMOVE.MEDIUM);
                break;
            
            case DIFFICULTY.HARD:
                // Remove 55 cells from the board. 
                this.RemoveCells(CELLS_TO_REMOVE.HARD);
                break; 
        }; 
        
        return this.#board;  
    };




    // Name         : RemoveCells
    // Description  : This method is removes x amount of cells from the board using the cellCount, depending on the provided difficulty.  
    // Parameters   : int cellCount :   This is the number of cells to remove from the board. 
    // Return Values: Void. 
    RemoveCells(cellCount)
    {
        while (cellCount > 0)
        {
            // Generate a random row & col from 1-9.
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9); 

            // Check to see if the current cell is empty at this position. 
            if (this.#board[row][col] !== EMPTY_CELL)
            {
                // Remove the cell's value. 
                this.#board[row][col] = EMPTY_CELL; 

                // Find the mirrored cell positon using the current cell position.
                let mirroredRow = 8 - row; 
                let mirroredCol = 8 - col; 

                // Check to see if the mirrored cell's value is empty  
                if (this.#board[mirroredRow][mirroredCol] !== EMPTY_CELL)
                {
                    // Indicates that the mirrored cell is NOT empty.
                    this.#board[mirroredRow][mirroredCol] = EMPTY_CELL;  
                    cellCount -= 2;  
                }
                else
                {
                    // Indicates that the mirrored cell is already empty. (decrement the cellCount by 1).
                    cellCount -= 1; 
                }; 
            };
        };

        return; 
    };




    // Name         : SolveBoard
    // Description  : This method is used to fill in all the empty cells on a board with valid values based on game rules. It uses recursion + backtracking
    //                to place valid values in each cell. It also keeps track of all possible solutions.  
    // Parameters   : Void.
    // Return Values: bool true :   Upon completion. Otherwise, false. 
    SolveBoard()
    {
        // Find an empty cell's position & check to see if the position is valid.
        let cell = this.LocateEmptyCell();
        if (cell.row === null && cell.col === null)
        {
            // There are no more empty cells on the board. 
            return true; 
        } 

        // Shuffle the values 1-9 and store in values variable. 
        let values = [1,2,3,4,5,6,7,8,9];
        values = this.ShuffleValues(values);  

        // Figure out which number should go in that cell. 
        for (let i = 0; i < 9; i++)
        {
            // See if the current value is valid in the row, column, & box. 
            if (this.IsValidInRow(cell.row, values[i]) === true && this.IsValidInCol(cell.col, values[i]) === true && this.IsValidInBox(cell, values[i]) === true)
            {
                // Assign the valid value to the current cells row and col.
                this.#board[cell.row][cell.col] = values[i];

                // Check to see if the board is fully solved. 
                let isBoardSolved = this.SolveBoard();
                if (isBoardSolved === true)
                {
                    // Exit the recursion. 
                    return true; 
                }

                // Reset the current cell and try another number. 
                this.#board[cell.row][cell.col] = 0; 
            }; 
        };

        // Wasn't able to place a valid number (backtrack). 
        return false; 
    };





    // Name         : ShuffleValues
    // Description  : This method uses the Fisher-Yates shuffle to take an array of values from 1-9 and shuffle the order. 
    // Parameters   : values[]          :   This is the value array to be shuffled. 
    // Return Values: shuffledValues[]  :   This would be the new shuffled array. 
    ShuffleValues(values)
    {
        // Start at the last index in the array (i = length of array).
        for (let i = values.length - 1; i > 0; i--)
        {
            // Pick a random index from 0 to i
            //  - store in variable j.
            let j = Math.floor(Math.random() * (i + 1));   

            // swap index i and j. 
            let temp = values[i];   // temp becomes 9
            values[i] = values[j];  // values[i] becomes values[j] using a random index generated from Math().
            values[j] = temp;       // values[j] becomes temp (9). 
        }

        return values; 
    };





    // Name         : IsValidInBox
    // Description  : This method is used to see if there's duplicate values within the correct 3x3 box on the board. 
    // Parameters   : cell{row, col}    :   This is the current cells position on the board. 
    //                int value         :   This is the current value that's being compared. 
    // Return Values: bool true         :   If there is no duplicates within the 3x3 box. Otherwise false. 
    IsValidInBox(cell, value)
    {
        // There are 9 3x3 boxes on the board.
        //  - Find a way to use the current cells row & col to jump to the top left cell position within each 3x3 box to start scanning. 
        let startingRow = Math.floor(cell.row / 3) * 3;     // This finds the top left starting row position within the 3x3 box.  
        let startingCol = Math.floor(cell.col / 3) * 3;     // This finds the top left starting column position within the 3x3 box. 

        // Check each row (3 total in a 3x3 box). 
        for (let i = 0; i < 3; i++)
        {
            // Compare the value to the current positions value on the board.
            for (let j = 0; j < 3; j++)
            {
                // Compare the value to the value at this boards position. 
                if (value === this.#board[startingRow + i][startingCol + j])
                {
                    // This indicates that the values is already within the 3x3 box and cannot be placed here. 
                    return false; 
                }
            };
        };

        // Value can be placed within the 3x3 box.  
        return true; 
    };





    // Name         : IsValidInCol
    // Description  : This method is used to determine whether or not a specfic number is in the same column.
    // Parameters   : int col       :   This is the current column that the cell is positioned at on the board. 
    //              : int value     :   This is the value used to check if valid in the column. 
    // Return Values: bool true     :   If it's able to go in the current column. Otherwise false. 
    IsValidInCol(col, value)
    {
        // Check to see if the current value is already in the column.
        //  - Loop through all 9 rows at index column. 
        for (let i = 0; i < 9; i++)
        {
            // Compare the value to the value at board[row(i)][column].
            if (this.#board[i][col] === value)
            {
                // Indicates that the current value is already in this column & can't place this value. 
                return false; 
            }; 
        };
        
        // Indictaes that you can place this value. 
        return true; 
    };





    // Name         : IsValidInRow
    // Description  : This method is used to determine whether or not a specfic number is in the same row.
    // Parameters   : row          :   This is the current row that the cell is positoned at on the board.
    //              : int value    :   This is the value used to check if valid in the row. 
    // Return Values: bool true    :   If it's able to go in the current row. Otherwise false. 
    IsValidInRow(row, value)
    {
        // Check to see if the curent value is already in the current row. 
        if (this.#board[row].includes(value) === true)
        {
            // Indicates that you can't place this value. 
            return false; 
        }
        
        // Indicates that you can place this value. 
        return true;  
    };





    IsGameOver()
    {
        // Check to see if the game is over. 
        if (this.IsBoardFull() === true)
        {
            // Check to see if its a winning board. 
            if (this.IsBoardValid() === true)
            {
                // This is a winning board.
                console.log("YOU WON!!");
                alert("YOU WON!"); 
                return true; 
            } 
            else
            {
                // This board is invald.
              console.log("Try Again."); 
              alert("Try Again.");
                return false; 
            };
        }; 
    };





    // Name         : IsBoardFull
    // Description  : This method is used to determine if the current games cells have all been filled with a number.
    // Parameters   : Void.
    // Return Values: bool true    : If all cells have been filled. Otherwise, false.  
    IsBoardFull()
    {
        // See if there are any empty cells left on the board. 
        let cell = this.LocateEmptyCell();
        if (cell.row === null && cell.col === null)
        {
            // There are no more empty cells on the board & the board is completly filled in.  
            return true; 
        } 

        return false; 
    };





    // Name         : IsBoardValid
    // Description  : This method is used to determine if the completed board is a winning board or not. 
    // Parameters   : Void.
    // Return Values: bool true    : If the games valid. Otherwise, false.  
    IsBoardValid()
    {
        // Compare all values from the current board to the fully solved board. 
        for (let row = 0; row < 9;  row++)
        {
            for (let col = 0; col < 9; col++)
            {
                // Indicates a difference between the board and the soltionBoard, making the board invalid. 
                if (this.#board[row][col] !== this.#solutionBoard[row][col])
                {
                    // Check to see if the players solution is still valid (even though it didn't match the puzzle exactly).
                    if (this.IsAlternativeSolution() == true)
                    {
                        console.log("You found an alternative solution the puzzle!");  
                        return true; 
                    } 

                    return false; 
                };
            };
        };

        // This game is valid.
        console.log("Matched the puzzle perfectly!");  
        return true; 
    };






    // Name         : IsAlternativeSolution
    // Description  : This method is used to determine if the solved puzzle is an alternative solution to the original.
    // Parameters   : Void.
    // Return Values: bool true    : If the games a valid alternative solution. Otherwise, false.  
    IsAlternativeSolution()
    {
        let cell = {row:undefined, col:undefined, value:undefined}; 
        
        for (let r = 0; r < 9; r++)
        {
            // Assign the cells row. 
            cell.row = r; 

            for (let c = 0; c < 9; c++)
            {
                // Assigns the cells column.
                cell.col = c; 

                // Assign the cells value. 
                cell.value = this.#board[r][c]; 

                // Set this cells value on the board to 0 (temporarily). 
                this.#board[r][c] = EMPTY_CELL; 

                // Now check to see if the value is still correct in the row, col, and 3x3 box on the board. 
                if (this.IsValidInRow(cell.row, cell.value) && this.IsValidInCol(cell.col, cell.value) && this.IsValidInBox(cell, cell.value))
                {
                    // This value is valid - continue onto the next value in the board. 
                    this.#board[r][c] = cell.value; // Restore the value. 
                    continue; 
                }
                else
                {
                    // This solution is invalid. 
                    return false; 
                }
            };
        };

        // This solution is valid. 
        return true; 
    }





    // Name         : LocateEmptyCell
    // Description  : This method is used to find an empty cell within the board (if there is one). 
    // Parameters   : void. 
    // Return Values: cell{row:"", col:""}  : This cell object represents the empty cells row and column. 
    LocateEmptyCell()
    {
        let cell = {row:null, col:null};  

        // Start by looping through each row on the board. 
        for (let currentRow = 0; currentRow < 9; currentRow++)
        {
            // Then loop through each column on the board.  
             for (let currentCol = 0; currentCol < 9; currentCol++)
             {
                // Check to see if the current position within the board is empty. 
                //  - If it is, return the position.
                if (this.#board[currentRow][currentCol] === 0)
                {
                    // Return the empty cells position.
                    cell.row = Number(currentRow); 
                    cell.col = Number(currentCol); 
                    return cell;  
                };
             };
        };
 
        return cell; 
    };




    
    // Name         : CreateBoard()
    // Description  : This is used to create an empty sudoku board
    // Parameters   : void.
    // Return Values: board[[]]; 
    #CreateEmptyBoard()
    {
        let board = 
        [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
        ];

        return board; 
    };
}