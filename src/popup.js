document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'play',
      url: chrome.runtime.getURL('assets/boom.mp4')
    }, () => {
      setTimeout(() => {window.close()})
    })
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
