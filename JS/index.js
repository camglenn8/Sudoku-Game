// File Name    : index,js
// Purpose      : The purpose of this file is to handle all events triggered by index.html. 

// Selectors
let singlePlayer = document.getElementById("single-player");
let multiplayer = document.getElementById("multiplayer");





// Event Delegation for singleplayer button.
// Element Name : single-player
// Event Type   : Click 
// Description  : This event gets invoked anytime a user clicks on the single player button. 
singlePlayer.addEventListener("click", () => {
    // Display the difficutly screen. 
    window.location.href = "difficulty.html"; 
});





// Event Delegation for multiplayer button.
// Element Name : multiplayer
// Event Type   : Click 
// Description  : This event gets invoked anytime a user clicks on the multiplayer button. 
multiplayer.addEventListener("click", () => {
    // Route the player to the multiplayer lobby. 
    alert("Feature Currently Unavailable.");
});