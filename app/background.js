var TrackerSSL_CurrentTabCollection = new TrackerSSL_TabCollection();

chrome.webRequest.onBeforeRequest.addListener(
  TrackerSSL_RequestController,
  {
    urls: ['http://*/*', 'https://*/*']
  }
);

chrome.runtime.onMessage.addListener(tabMessageController);
chrome.tabs.onActivated.addListener(tabMessageController);