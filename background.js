// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    trackingEnabled: true,
    emailCount: 0,
    openCount: 0
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'emailOpened') {
    chrome.storage.local.get(['openCount'], function(result) {
      const newCount = (result.openCount || 0) + 1;
      chrome.storage.local.set({ openCount: newCount });
    });
  } else if (request.type === 'emailTracked') {
    chrome.storage.local.get(['emailCount'], function(result) {
      const newCount = (result.emailCount || 0) + 1;
      chrome.storage.local.set({ emailCount: newCount });
    });
  }
}); 