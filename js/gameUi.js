/**
 * Sets the given HTML content to the specified overlay container.
 * @param {string} container - The ID of the overlay container element.
 * @param {string} content - The HTML content to set inside the container.
 */
function setGameOverlay(container, content) {
  const gameOverlay = document.getElementById(container);
  if (gameOverlay) {
    gameOverlay.innerHTML = content;
  }
}

/**
 * Displays the main menu overlay.
 */
function showGameMenu() {
  setGameOverlay('gameOverlay', mainMenuOverlayHTML());
}

/**
 * Displays the in-game navigation overlay including mobile controls.
 */
function showInGameNav() {
  let html = inGameNavOverlayHTML();
  html += mobileKeyOverlayHTML();
  setGameOverlay('gameOverlay', html);
}

/**
 * Displays the endscreen overlay based on the game status.
 * @param {string} [status='complete'] - Either 'complete' or 'gameOver'.
 */
function showEndscreen(status = 'complete') {
  if (status === 'gameOver') {
    setGameOverlay('gameOverlay', gameOverOverlayHTML());
  } else {
    setGameOverlay('gameOverlay', levelCompleteOverlayHTML());
    soundManager.playSound('../assets/audio/interface/gameLevelComplete.wav')
  }
}

/**
 * Displays the control help overlay after clearing the current content.
 */
function showControlHelp() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', controlHelpOverlayHTML());
}

/**
 * Displays the info/story overlay after clearing the current content.
 */
function showInfo() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', infoOverlayHTML());
}

/**
 * Fades out the menu overlay, then clears it and shows the in-game nav.
 */
function fadeOutMenuOverlay() {
  const menuOverlay = document.getElementById('overlayContainer');
  if (menuOverlay) {
    menuOverlay.classList.add('overlay-fade-out');
    clearOverlay = setTimeout(() => {
      clearOverlayContent();
      clearOverlay = null;
      showInGameNav();
    }, 500);
  }
}

/**
 * Clears all content from the game overlay.
 */
function clearOverlayContent() {
  setGameOverlay('gameOverlay', '');
}

/**
 * Determines whether mobile controls should be shown based on device capabilities.
 * @returns {boolean} True if mobile controls should be displayed.
 */
function shouldShowMobileControls() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isLandscape = window.innerWidth > window.innerHeight;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  return isTouch && isLandscape && !hasHover && isCoarse;
}

/**
 * Updates the visibility of the mobile controls based on current screen state.
 */
function updateMobileControls() {
  const mobile = document.getElementById('mobileControls');
  if (mobile) {
    mobile.style.display = shouldShowMobileControls() ? 'block' : 'none';
  }
}

// Event listeners to update mobile controls when the screen changes
window.addEventListener('resize', updateMobileControls);
window.addEventListener('orientationchange', updateMobileControls);
window.addEventListener('load', updateMobileControls);
