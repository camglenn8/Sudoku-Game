// File Name    : game.js
// Description  : This file is used to start the game and handle any game logic.


export class Soduko 
{
    // Private Data members. 
    #board = [];   

    constructor() 
    {
        // Initialize the board with a clear board. 
        this.#board = this.#CreateEmptyBoard(); 
    }
    
    // Getters/Accesors.
    get getBoard()
    {
        return this.#board; 
    }

    // Methods.


    // Name         : InitializeBoard
    // Description  : This is used to take an empty board and fill it with valid values. 
    // Parameters   : void.
    // Return Values: void. 
    GenerateBoard()
    {
        // Create an empty board. 
        this.#board = this.#CreateEmptyBoard();  

        // Iterate through the board and locate all the empty cells. 
        while (true)
        {
            // Find an empty cell's position & check to see if the position is valid.
            let cell = this.LocateEmptyCell();
            if (cell.row === null && cell.col === null)
            {
                console.log("No more empty cells on board."); 
                break; 
            } 
            
            // - Figure out which number should go in that cell. 
            for (let i = 0; i < 9; i++)
            {
                // List of possible numbers to be added to the board. 
                let values = [1,2,3,4,5,6,7,8,9];

                // 1. First check to see if the number from 1-9 is in the current row.
                    // - If it is, check the next number and repeat until the number is not in the current row.
                let result = this.IsValidInRow(cell.row, values[i]);  
                if (result === false) 
                {
                    // Indicates that the current value is already in 
                    continue; 
                };
                
                
                // 2. Then, check to see if the number is in the current column.
                    // - If it is, go back to step 1. 
                result = this.IsValidInCol(cell.col, values[i]); 
                if (result === false)
                {
                    // Indicates that the current value is already within the column and cannot be placed.  
                    continue;
                }
                
                // 3. After, check to see if the number is within the 3x3 box. 
                    // - If it is, go back to step 1. 
                
                
                // 4. Place the number in that cell.
                // Fill the empty cell with a value. 
                this.#board[cell.row][cell.col] = value[i];    // This is needed to prevent an infinite loop.  
            }
        }; 
        return this.#board;  
    };





    // Name         : IsValidInCol
    // Description  : This method is used to determine whether or not a specfic number is in the same column.
    // Parameters   : cell{col}     :   This is the current cells position on the baord.
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
    // Parameters   : cell{col}    :   This is the current cells position on the baord.
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
                    cell.row = currentRow; 
                    cell.col = currentCol; 
                    return cell;  
                }
             }
        }
 
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
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],
            // [0,0,0,0,0,0,0,0,0],

            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,0,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
            [1,0,3,4,5,6,7,8,9],
        ];

        return board; 
    };
}