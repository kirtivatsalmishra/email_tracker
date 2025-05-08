// Function to add tracking pixel to email
function addTrackingPixel(emailBody) {
  const trackingPixel = document.createElement('img');
  trackingPixel.style.display = 'none';
  trackingPixel.src = 'http://localhost:3000/track.png';
  emailBody.appendChild(trackingPixel);
}

// Function to check if tracking is enabled
function isTrackingEnabled() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['trackingEnabled'], function(result) {
      resolve(result.trackingEnabled !== false);
    });
  });
}

// Main function to initialize tracking
async function initializeTracking() {
  if (!await isTrackingEnabled()) return;

  // Check if we're on Gmail
  if (window.location.hostname.includes('gmail.com')) {
    // Observe DOM changes to detect new emails
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Look for email compose areas
              const composeAreas = node.querySelectorAll('.Am.Al.editable');
              composeAreas.forEach((area) => {
                if (!area.dataset.tracked) {
                  area.dataset.tracked = 'true';
                  addTrackingPixel(area);
                  chrome.runtime.sendMessage({ type: 'emailTracked' });
                }
              });
            }
          });
        }
      });
    });

    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize tracking when the page loads
initializeTracking(); 