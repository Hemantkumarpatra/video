const playButton = document.getElementById("playButton");  // Play button element
const audio = document.getElementById("audio");  // Audio element for the song
const pictures = document.querySelectorAll('.Picture');  // All images

let previousTouch = undefined;

// Function to start slideshow when song is played
function startSlideshow() {
  // Make all pictures fullscreen (temporarily for slideshow)
  pictures.forEach(picture => {
    picture.classList.add("fullscreen");
  });

  // After 2 seconds (slideshow duration), revert the pictures to original size
  setTimeout(() => {
    pictures.forEach(picture => {
      picture.classList.remove("fullscreen");
    });

    // Start the disappearing effect after 2 seconds
    disappearPictures();
  }, 1000);  // 2 seconds
}

// Function to make pictures disappear one by one from the last to the first
function disappearPictures() {
  for (let i = pictures.length - 1; i >= 0; i--) {
    setTimeout(() => {
      pictures[i].classList.add("hidden"); // Add hidden class to fade out
    }, (pictures.length - 1 - i) * 3000); // Each picture disappears after an additional second
  }
}

// Event listener for play button
playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();  // Play the audio
    playButton.textContent = "Happy Birthday";  // Change button text
    startSlideshow();  // Start the slideshow when song starts
  } else {
    audio.pause();  // Pause the audio
    playButton.textContent = "Happy Birthday";  // Change button text
  }
});

// Function to update the position of images during dragging
function updateElementPosition(element, event) {
  let movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }

  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

// Function to start dragging
function startDrag(element, event) {
  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction });
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

// Stop dragging function
function stopDrag(functions) {
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

// Initialize each picture's position with random offsets
pictures.forEach(picture => {
  const range = 100;
  const randomX = Math.random() * range - range / 2;
  const randomY = Math.random() * range - range / 2;
  const randomRotate = Math.random() * 30 - 15;

  picture.style.top = `${window.innerHeight / 2 + randomY}px`;
  picture.style.left = `${window.innerWidth / 2 + randomX}px`;
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  const startFunction = (event) => startDrag(picture, event);
  picture.addEventListener("mousedown", startFunction);
  picture.addEventListener("touchstart", startFunction);
});
// Define specific positions for each picture
const specificPositions = [
  { top: '150px', left: '1200px' },   // Position for the first image
  { top: '400px', left: '1200px' },  // Position for the second image
  { top: '400px', left: '1400px' },  // Position for the third image
  { top: '600px', left: '350px' },  // Position for the fourth image
  { top: '390px', left: '280px' },  // Position for the fifth image
  { top: '150px', left: '180px' }   // Position for the sixth image
];

// Apply the specific positions to each picture
pictures.forEach((picture, index) => {
  if (specificPositions[index]) {
    picture.style.position = 'absolute'; // Ensure the position is absolute
    picture.style.top = specificPositions[index].top;
    picture.style.left = specificPositions[index].left;
  }
});