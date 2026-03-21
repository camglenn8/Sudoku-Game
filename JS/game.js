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
            // Find an empty cell's position.
            let cell = this.LocateEmptyCell();

            // Check to see if the cells's position is valid. 
            if (cell.row === null && cell.col === null)
            {
                console.log("No more empty cells on board."); 
                break; 
            } 

            // Fill the empty cell with a value. 
            this.#board[cell.row][cell.col] = 1;    // This is needed to prevent an infinite loop. 
                                                    // Dont remove until you have a function that adds #'s.
        };

        // - Figure out which number should go in that cell. 
            // 1. First check to see if the number from 1-9 is in the current row.
                // - If it is, check the next number and repeat until the number is not in the current row.
            // 2. Then, check to see if the number is in the current column.
                // - If it is, go back to step 1. 
            // 3. After, check to see if the number is within the 3x3 box. 
                // - If it is, go back to step 1. 
            // 4. Place the number in that cell.  

        
        return this.#board;  
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

            [0,2,3,4,5,6,7,8,9],
            [1,2,0,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,0,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,0,7,8,9],
            [1,2,3,4,5,6,7,8,9],
        ];

        return board; 
    };
}