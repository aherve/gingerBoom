document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'play',
      url: chrome.runtime.getURL('assets/boom.mp4')
    }, () => {})
  })
})

function getCurrentTabUrl(cb) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    cb(tabs[0]);
  });
}

// close the popup, as we don't need it
setTimeout(() => {window.close()}, 0)
