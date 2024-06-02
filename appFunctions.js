const tutorialButton = document.getElementById("tutorial-button");
const videoOverlay = document.getElementById("video-overlay");


// Function to show video overlay
function showVideo() {
    tutorialButton.style.display = "none";
    videoOverlay.style.display = "flex";
}

// Function to close video overlay
function closeVideo() {
    tutorialButton.style.display = "block";
    videoOverlay.style.display = "none";
}

// Show the video overlay on the first visit
document.addEventListener("DOMContentLoaded", function() {
    const alreadyVisited = localStorage.getItem("visited");
    if (!alreadyVisited) {
        showVideo();
        localStorage.setItem("visited", true);
    }
});

// Get input fields and the "Add Link" button
const newLinkInput = document.getElementById("new-link");
const newNameInput = document.getElementById("new-name");
const newCategoryInput = document.getElementById("new-category");
const addButton = document.getElementById("add-button");

// Add input event listeners to check when all fields are filled
newLinkInput.addEventListener("input", checkFields);
newNameInput.addEventListener("input", checkFields);
newCategoryInput.addEventListener("input", checkFields);

// Function to check if all fields are filled and apply glow effect to the "Add Link" button
function checkFields() {
    if (newLinkInput.value.trim() !== "" && newNameInput.value.trim() !== "" && newCategoryInput.value.trim() !== "") {
        addButton.classList.add("glow");
    } else {
        addButton.classList.remove("glow");
    }
}

addButton.addEventListener("click", function() {
    addButton.classList.remove("glow");
});


