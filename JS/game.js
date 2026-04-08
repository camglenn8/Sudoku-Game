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

    // Name         : GenerateBoard
    // Description  : This is used to initalize an empty board and generate a unique combo to fill the board with valid numbers. 
    // Parameters   : void.
    // Return Values: void. 
    GenerateBoard(difficulty = DIFFICULTY.EASY)  
    {  
        while (true)
        {
            // Initialize an empty board.
            this.#board = this.#CreateEmptyBoard(); 
            
            // Creates the combo and solves board. 
            this.SolveBoard(); 

            // Copies the current board before removing the cells so you can see the solved game. 
            this.#solutionBoard = this.#board.map(row => [...row]); 

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

            // // Check to see if the generated puzzle is human solvable. If it's not - generate a new puzzle. 
            if (this.IsHumanSolvable(difficulty) === true)
            {
                // Serve this puzzle.
                return this.#board;  
            };
        };
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
            if (this.#board[row][col] === EMPTY_CELL)
            {
                // Keep looking for another value within the board.  
                continue; 
            };

            // Save the current cells valye BEFORE setting this value empty. 
            let savedCellValue = this.#board[row][col];     // Save the value.
            this.#board[row][col] = EMPTY_CELL;             // Clear the value. 

            // Check the boards uniqueness (does it have more than 1 solution). 
            if (this.SolutionCount() === 1)
            {
                // Indicates that the board only has 1 solution and is still unique. 
                cellCount-- // Decrement the cellCount. 
            }
            else
            {
                // Indicates that the board now has multiple solutions (no longer unique). 
                this.#board[row][col] = savedCellValue; // Restore the saved value. 
            };
        };

        return; 
    };




    SolutionCount(count = 0)
    {
        // Check to see if there is more than 1 solution. 
        if (count > 1)
        {
            // Indicates that there is more than 1 solution. 
            return count; 
        };

        // Find an empty cells position.
        let cell = this.LocateEmptyCell(); 
        if (cell.row === null && cell.col === null)
        {
            // Found a complete solution (no more empty cells left on the board). 
            return count + 1; 
        };

        // Check to see if the value is valid in the boards row, col, and box at the current position. 
        let values = [1,2,3,4,5,6,7,8,9]; 
        for (let i = 0; i < 9; i++)
        {
            if (this.IsValidInRow(cell.row, values[i]) === true &&
                this.IsValidInCol(cell.col, values[i]) === true &&
                this.IsValidInBox(cell, values[i]) === true)
            {
                // Indicates that this value is valid at this cell's position.
                this.#board[cell.row][cell.col] = values[i];    // Add the value to the board. 
                count = this.SolutionCount(count);              // Recurse.
                this.#board[cell.row][cell.col] = EMPTY_CELL;   // Empty the cell's value.  
            };   
        };

        return count; 
    };



    
    // Name         : GetCandidates
    // Description  : This method is used to find potential candidates / valid values for the current cells position. It finds values that currently are 
    //                NOT in the cells  row, col, or box. 
    // Parameters   : int row   :   This is the current cells row. 
    //                int col   :   This is the current cells column.  
    // Return Values: int[]     :   Array of valid candidates numbers. 
    GetCandidates(row, col) 
    {
        // This will store all unique values currently being used in the cell's row and column. 
        let valuesUsed = new Set(); 

        // Collect all column values in this current row.
        for (let i = 0; i < 9; i++)
        {
            // i would be the different columns in this row. 
            valuesUsed.add(this.#board[row][i]); 
        }; 

        // Collect all row values in this current column. 
        for (let r = 0; r < 9; r++)
        {
            // i would be the different rows in this column.
            valuesUsed.add(this.#board[r][col]); 
        };

        // Collect all vlaues already in this cell's 3x3 box. 
        let startingRow = Math.floor(row / 3) * 3;  // Finds the current cells top left row of the box. 
        let startingCol = Math.floor(col / 3) * 3;  // Finds the current cells top left column of the box.

        // Collect all values currently inside this 3x3 box. 
        for (let r = startingRow; r < startingRow + 3; r++)
        {
            for (let c = startingCol; c < startingCol + 3; c++)
            {
               // Add the value to the set. 
               valuesUsed.add(this.#board[r][c]);
            };
        };

        // Figure out which values are NOT currently being used (is a valid candidate). 
        let candidates = [];    // Hold's all valid values for the cells row, col, and box. 

        for (let i = 1; i <= 9; i++)
        {
            // Check to see if this value is already in the usedValues set. 
            if (!valuesUsed.has(i))
            {
                // This value is a potential candidate - Add it to the candidates[].
                candidates.push(i);  
            };
        };

        return candidates; 
    };





    // Name         : SolveNakedSingles
    // Description  : This method is used to scan the board looking for empty cells. Once found, it will look for any valid candidates to be placed
    //                at that cells position. This will add a value if that value is the only one to possibly go in that position. 
    // Parameters   : Void. 
    // Return Values: bool true :   This indicates that values got added to the board. Otherwise, false. 
    SolveNakedSingles()
    {
        // Tracks whether or not we placed any vlaues. 
        let  progress = false; 

        let madeProgress = true;
        while (madeProgress === true)
        {
            // Used to reset the progess for this scan. 
            madeProgress = false;
               
            // Find an empty cell (scan the entire board).
            for (let row = 0; row < 9; row++)
            {
                for (let col = 0; col < 9; col++)
                {
                    // Skip any cells that are already  filled in.
                    if (this.#board[row][col] !== EMPTY_CELL)
                    {
                        continue; 
                    };

                    // Get all the valid candidates.
                    let candidates = this.GetCandidates(row, col); 

                    
                    // If only 1 candidate exists, this is a naked cell. 
                    if (candidates.length === 1)
                    {
                        // Place the only 1 valid candidate (no other value can go here). 
                        this.#board[row][col] = candidates[0]; 
                        madeProgress = true;    // Placed a value -> find another empty cell. 
                        progress = true;        // 
                    };
                };
            };
        };
        // Returns true if we placed AT LEAST 1 value. Otherwise, the board didn't change. 
        return progress;
    };





    SolveHiddenSingles()
    {
        let progress = false; 

        let madeProgress = true;
        while(madeProgress === true)
        {
            // Reset the progress.
            madeProgress = false;

            // --- ROWS ---
            // For each row, check if a number can only go in one cell.
            for(let row = 0; row < 9; row++)
            {
                for(let num = 1; num <= 9; num++)
                {
                    // Track which possible cells in this row can hold the 'num'. 
                    let possibleCols = []; 

                    for (let col = 0; col < 9; col++)
                    {
                        // Skip any filled cells.
                        if (this.#board[row][col] !== EMPTY_CELL)
                        {
                            continue; 
                        };

                        // Check if 'num' is a valid candidate for this cell.
                        let candidates = this.GetCandidates(row, col); 
                        if (candidates.includes(num))
                        {
                            // This cell COULD hold 'num' (so remember it). 
                            possibleCols.push(col); 
                        };
                    };

                    // If only ONE cell in this row can hold 'num' - place it.
                    if (possibleCols.length === 1)
                    {
                        this.#board[row][possibleCols[0]] = num;
                        madeProgress = true; 
                        progress = true; 
                    };
                };
            };

            // --- COLS ---
            // For each col, check if a number can only go in one cell. 
            for (let col = 0; col < 9; col++)
            {
                for (let num = 1; num <= 9; num++)
                {
                    // Track which possible cells in this column hold 'num'. 
                    let possibleRows = []; 

                    for (let row = 0; row < 9; row++)
                    {
                      // Skip any filled in cells.
                      if (this.#board[row][col] !== EMPTY_CELL)
                        {
                            continue;
                        };

                        // Check if 'num' is a valid cnadidate for this cell.
                        let candidates = this.GetCandidates(row, col); 
                        if (candidates.includes(num))
                        {
                            // This cell COULD hold 'num' - remeber it. 
                            possibleRows.push(row); 
                        };  
                    };

                    // If only ONE cell in this column can hold 'num' - place it. 
                    if (possibleRows.length === 1)
                    {
                        this.#board[possibleRows[0]][col] = num;
                        madeProgress = true; 
                        progress = true; 
                    };   
                };
            };


            // --- BOXES ---
            // For each 3x3 box, check if a number can only go in one cell. 
            for (let boxRow = 0; boxRow < 3; boxRow++)
            {
                for (let boxCol = 0; boxCol < 3; boxCol++)
                {
                    for (let num = 1; num <= 9; num++)
                    {
                        // Track which possible cells in this box can hold 'num'. 
                        let possibleCells = []; 

                        // Find the top-left corner of this box. 
                        let startingRow = boxRow * 3; 
                        let startingCol = boxCol * 3; 

                        // Scan all 9 cells within this box. 
                        for (let r = startingRow; r < startingRow + 3; r++)
                        {
                          for(let c = startingCol; c < startingCol + 3; c++)
                          {
                            // Check to see if this cell is empty.
                            if (this.#board[r][c] !== EMPTY_CELL)
                            {
                                // Indicates an empty cell - skip and move onto next cell.
                                continue;
                            };

                            // Check if 'num' is a valid candidates for this cell.
                            let candidates = this.GetCandidates(r, c); 
                            if (candidates.includes(num))
                            {
                                // This COULD hold 'num' - remember it.
                                possibleCells.push({row:r, col:c});  
                            };
                          };
                        };

                        // If only 1 cell in this box can hold 'num' - place it. 
                        if (possibleCells.length === 1)
                        {
                            this.#board[possibleCells[0].row][possibleCells[0].col] = num; 
                            madeProgress = true;
                            progress = true; 
                        };
                    };
                };
            };
        };

        return progress; 
    };




    // Name         : IsHumanSolvable
    // Description  : Tests whether the current puzzle can be solved using only human logical techniques (naked singles,hidden singles, pairs), based on
    //                the difficulty chosen. 
    // Parameters   : String difficulty :   This is the chosen difficulty. 
    // Return Values: bool true : If the puzzle is fully solvable with human logic. Otherwise false.
    IsHumanSolvable(difficulty)
    {
        // Save a copy of the original board.
        let realBoard = this.#board; 
        this.#board = this.#board.map(row => [...row]);

        // Apply all techniques until neither makes any progress - based on difficulty! 
        let progress = true;
        switch (difficulty) 
            {
                case DIFFICULTY.EASY:
                     while (progress === true)
                    {
                         // Apply the Naked Singles technique. 
                        let nakedProgress = this.SolveNakedSingles(); 

                        // If neither technique placed any values - we're stuck.
                        progress = nakedProgress;
                    };
                    break;

                case DIFFICULTY.MEDIUM:
                    while (progress === true)
                    {
                        // Apply the Naked Singles & Hidden singles technique. 
                        let nakedProgress = this.SolveNakedSingles(); 
                        let hiddenProgress = this.SolveHiddenSingles(); 

                        // If neither technique placed any values - we're stuck.
                        progress = nakedProgress || hiddenProgress;
                    };
                    break;
                
                case DIFFICULTY.HARD: 
                     while (progress === true)
                    {
                        // Try the Naked Singles technique. 
                        let nakedProgress = this.SolveNakedSingles(); 
                        let hiddenProgress = this.SolveHiddenSingles(); 

                        // If neither technique placed any values - we're stuck.
                        progress = nakedProgress || hiddenProgress;
                    };
                    break; 
            }; 

        // Check if the board is completely filled in.
        let solved = this.IsBoardFull(); 

        // Restore the real board before returning. 
        this.#board = realBoard; 

        return solved; 
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




    // Name         : IsGaameOver
    // Description  : This method is used to determine if the current game has been completed.
    // Parameters   : Void.
    // Return Values: Void.
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
                    this.#board[r][c] = cell.value; // Restore the cell's value. 
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