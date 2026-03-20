// File Name    : game.js
// Description  : This file is used to start the game and handle any game logic.


export class Game 
{
    // Private Data members. 
    #board = [];   

    constructor() 
    {
        // Initialize the board with a clear board. 
        this.#board = this.CreateBoard(); 
    }
    
    // Getters/Accesors.
    get getBoard()
    {
        return this.#board; 
    }

    // Methods.


    // Name         :
    // Description  :
    // Parameters   :
    // Return Values:
    SolveBoard()
    {
        let num = [1,2,3,4,5,6,7,8,9]; // May want to make this random for future unique cases!!!!!!!!!!
        let result = true; 

        for (let i = 0; i < 9; i++)
        {
            // Check to see if the num is valid within the row. If is NOT -> this is an indication that it can be added. 
            for (let j = 1; j < 10; j++)
            {
                 result = this.IsRowValid(i, j);  
                 if (result === true)
                 {
                    console.log(`${j} is not currently in row ${i}`); 
                 }
                 else
                 {
                    console.log(`${j} is currently in row ${i}!!`);
                 }
            }

            // Check to see if the num is valud within the column.
            result = this.IsColValid(); 
            // Check to see if the num is valid wihtin the box (3x3). 
        }
    };


    // Name         : 
    // Description  : 
    // Parameters   : 
    // Return Values: 
    IsColValid()
    {
        
        return; 
    }



    // Name         : 
    // Description  : 
    // Parameters   : 
    // Return Values: 
    IsRowValid(row, num)
    {
        // Check to see if the num is valid within the row.         
        if (this.#board[row].includes(num))
        {
            return false; 
        }

        return true; 
    };

    
    // Name         : CreateBoard()
    // Description  : This is used to create an empty sudoku board
    // Parameters   : void.
    // Return Values: board[[]]; 
    CreateBoard()
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