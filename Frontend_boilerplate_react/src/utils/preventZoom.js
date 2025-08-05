/**
 * Prevent zooming and double-tap gestures on mobile devices
 * This provides a more native app-like experience
 */

export const preventZoom = () => {
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Prevent pinch zoom
  document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
  });

  document.addEventListener('gesturechange', (event) => {
    event.preventDefault();
  });

  document.addEventListener('gestureend', (event) => {
    event.preventDefault();
  });

  // Prevent double-tap zoom on specific elements
  const preventDoubleTapZoom = (element) => {
    let lastTouchEnd = 0;
    
    element.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  };

  // Apply to all interactive elements
  const interactiveElements = document.querySelectorAll('button, .btn, .tab-item, a, input, textarea, select');
  interactiveElements.forEach(preventDoubleTapZoom);

  // Prevent text selection on non-input elements
  document.addEventListener('selectstart', (event) => {
    const target = event.target;
    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
      event.preventDefault();
    }
  });

  // Prevent context menu on long press
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
};

export default preventZoom; 