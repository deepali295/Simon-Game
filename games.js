

// Declare an array for the color buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// Game pattern and user clicked pattern initialization
var gamePattern = [];
var userClickedPattern = [];

// Variable to track whether the game has started
var started = false;

// Level starts at 0
var level = 0;

// Detect keypress to start the game
$(document).keydown(function() {
    if (!started) {
        // Update title to show the current level
        $("#level-title").text("Level " + level); 
        // Start the sequence of the game
        nextSeq(); 
        // Set started to true to prevent starting the game multiple times
        started = true;
    }
});

// Generate the next sequence for the game
function nextSeq() {
    // Reset the user's clicked pattern for each new sequence
    userClickedPattern = [];
    // Increase the level by 1
    level++;
    // Update the title to show the current level
    $("#level-title").text("Level " + level);

    // Generate a random number (0 to 3) to select a random color
    var randomNo = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNo]; 

    // Add the randomly chosen color to the game pattern
    gamePattern.push(randomChosenColour);

    // Animate the button to show the selected color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // Play the sound for the selected color
    playSound(randomChosenColour);
}

// Play sound based on the color name passed
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); // Load the audio file
    audio.play(); // Play the sound
}

// Add animation for the button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add the "pressed" class to the button
    // Remove the "pressed" class after 100ms to complete the animation
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Detect button click and process the click event
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // Get the ID of the clicked button
    // Add the clicked color to the user's pattern
    userClickedPattern.push(userChosenColour);

    // Play the sound and animate the button for the clicked color
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);

    // Check if the clicked answer matches the expected answer
    checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer by comparing the current answer with the game pattern
function checkAnswer(currentLevel) {
    // If the user's last clicked color matches the game pattern at the same position
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // If the user completes the entire sequence, move to the next sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Wait for 1 second before starting the next sequence
            setTimeout(function() {
                userClickedPattern = []; // Reset the user's clicked pattern
                nextSeq(); // Call nextSeq to move to the next level
            }, 1000);
        }
    } else {
        console.log("wrong");
        // Play the "wrong" sound if the user gets the answer wrong
        playSound("wrong");

        // Add the game-over class to the body for visual effect
        $("body").addClass("game-over");
        // Remove the game-over class after 200ms
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the title to "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver function to reset the game
        startOver();
    }
}

// Reset the game: level, game pattern, and game start state
function startOver() {
    level = 0; // Reset the level back to 0
    gamePattern = []; // Clear the game pattern
    started = false; // Set started to false so the game can restart
}

