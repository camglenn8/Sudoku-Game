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

        // Check each cell within the empty board. 
        // If the cell is empty(0) ...
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