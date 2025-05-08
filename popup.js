document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleTracking');
  const statusElement = document.getElementById('status');
  const emailCountElement = document.getElementById('emailCount');
  const openCountElement = document.getElementById('openCount');

  // Load initial state
  chrome.storage.local.get(['trackingEnabled', 'emailCount', 'openCount'], function(result) {
    statusElement.textContent = result.trackingEnabled ? 'Active' : 'Inactive';
    emailCountElement.textContent = result.emailCount || 0;
    openCountElement.textContent = result.openCount || 0;
  });

  // Toggle tracking
  toggleButton.addEventListener('click', function() {
    chrome.storage.local.get(['trackingEnabled'], function(result) {
      const newState = !result.trackingEnabled;
      chrome.storage.local.set({ trackingEnabled: newState });
      statusElement.textContent = newState ? 'Active' : 'Inactive';
    });
  });
}); 