// File Name    : difficulty.js
// Purpose      : The purpose of this file is to start the game of sudoku, based on the difficulty selected by the user. 

// Imports
import { DIFFICULTY } from "./constants.js";

// Selectors
let difficulty = document.getElementById("modeSelection");

// Difficulty Event Deleagtion
difficulty.addEventListener("click", (e) => {
    let difficulty = (e.target.dataset.difficulty); 

    // Start the game using the selected difficulty. 
    if (difficulty != undefined)
    {
        window.location.href = `../HTML/game.html?difficulty=${difficulty}`; 
    };
});
