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
  startBubbleMenuLoop();
  setGameOverlay('gameOverlay', mainMenuOverlayHTML());
}

/**
 * Displays the in-game navigation overlay including mobile controls.
 * Also initializes the sound toggle button and clears the bubble menu animation loop.
 */
function showInGameNav() {
  clearBubbleMenuLoop();
  let html = inGameNavOverlayHTML();
  html += mobileKeyOverlayHTML();
  setGameOverlay('gameOverlay', html);
  initSoundButton();
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
    soundManager.playSound('./assets/audio/interface/gameLevelComplete.wav')
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
 * Displays the legal notice (Datenschutzerklärung) overlay after clearing the current content.
 */
function showLegalNotice() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', legalNoticeOverlayHTML());
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