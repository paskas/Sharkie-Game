function setGameOverlay(container, content) {
  const gameOverlay = document.getElementById(container);
  if (gameOverlay) {
    gameOverlay.innerHTML = content;
  }
}

function showGameMenu() {
  setGameOverlay('gameOverlay', mainMenuOverlayHTML());
}

function showInGameNav() {
  let html = inGameNavOverlayHTML();
  html += mobileKeyOverlayHTML();
  setGameOverlay('gameOverlay', html);
}

function showEndscreen(status = 'complete') {
  if (status === 'gameOver') {
    setGameOverlay('gameOverlay', gameOverOverlayHTML());
  } else {
    setGameOverlay('gameOverlay', levelCompleteOverlayHTML());
    soundManager.playSound('../assets/audio/interface/gameLevelComplete.wav')
  }
}

function showControlHelp() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', controlHelpOverlayHTML());
}

function showInfo() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', infoOverlayHTML());
}

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

function clearOverlayContent() {
  setGameOverlay('gameOverlay', '');
}

function shouldShowMobileControls() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isLandscape = window.innerWidth > window.innerHeight;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  return isTouch && isLandscape && !hasHover && isCoarse;
}

function updateMobileControls() {
  const mobile = document.getElementById('mobileControls');
  if (mobile) {
    mobile.style.display = shouldShowMobileControls() ? 'block' : 'none';
  }
}

window.addEventListener('resize', updateMobileControls);
window.addEventListener('orientationchange', updateMobileControls);
window.addEventListener('load', updateMobileControls);
